#!/usr/bin/env bash
#
# export_odp.sh — export every slide of an ODP presentation as a lossless
# WebP image at an exact pixel size.
#
# Usage:
#   ./export_odp.sh <input.odp> <output_folder> <width> <height>
#
# The presentation is rendered to PDF with headless LibreOffice, every page is
# rasterised to exactly <width>x<height> pixels, and each slide is saved as a
# lossless WebP numbered from 1 in slide order:
#
#   <output_folder>/1.webp
#   <output_folder>/2.webp
#   ...
#
# Those files slot straight into split_images.sh, which turns them into
# 1a.webp / 1b.webp / 2a.webp / ... for the flipbook.
#
# Progress display (same style as split_images.sh): the LibreOffice PDF
# conversion shows a spinner with elapsed time, then rendering runs under a
# live progress bar (percent, elapsed, ETA) on stderr. When output is
# redirected, plain log lines are printed instead.
#
# Requires: LibreOffice (soffice), poppler-utils (pdftoppm), ImageMagick.

set -euo pipefail

usage() {
    echo "Usage: $0 <input.odp> <output_folder> <width> <height>" >&2
}

if [ "$#" -ne 4 ]; then
    usage
    exit 1
fi

input_odp=$1
output_dir=$2
width=$3
height=$4

for value in "$width" "$height"; do
    case $value in
        '' | *[!0-9]*)
            echo "Error: width and height must be positive integers (got '$width' and '$height')." >&2
            exit 1
            ;;
    esac
done

if [ "$width" -le 0 ] || [ "$height" -le 0 ]; then
    echo "Error: width and height must be greater than zero." >&2
    exit 1
fi

if [ ! -f "$input_odp" ]; then
    echo "Error: input file does not exist: $input_odp" >&2
    exit 1
fi

if command -v soffice >/dev/null 2>&1; then
    SOFFICE=soffice
elif command -v libreoffice >/dev/null 2>&1; then
    SOFFICE=libreoffice
else
    echo "Error: LibreOffice is required but was not found (looked for 'soffice' or 'libreoffice')." >&2
    exit 1
fi

for tool in pdftoppm magick; do
    if ! command -v "$tool" >/dev/null 2>&1; then
        echo "Error: '$tool' is required but was not found." >&2
        exit 1
    fi
done

mkdir -p "$output_dir"
output_dir=$(cd "$output_dir" && pwd)
input_odp=$(cd "$(dirname "$input_odp")" && pwd)/$(basename "$input_odp")

start_time=$SECONDS
work_dir=$(mktemp -d "$output_dir/.odp_export.XXXXXX")
trap 'rm -rf "$work_dir"' EXIT

shopt -s nullglob

bar_width=30

if [ -t 2 ]; then
    show_progress=1
else
    show_progress=0
fi

format_time() {
    # $1: seconds -> "mm:ss", or "h:mm:ss" when >= 1 hour
    local seconds=$1
    if [ "$seconds" -ge 3600 ]; then
        printf '%d:%02d:%02d' "$((seconds / 3600))" "$(((seconds % 3600) / 60))" "$((seconds % 60))"
    else
        printf '%02d:%02d' "$((seconds / 60))" "$((seconds % 60))"
    fi
}

note() {
    # phase messages: on stderr for interactive use, on stdout when logging
    if [ "$show_progress" -eq 1 ]; then
        echo "$*" >&2
    else
        echo "$*"
    fi
}

# ------------------------------------------------------ ODP -> PDF (all slides)

convert_log="$work_dir/soffice.log"
convert_start=$SECONDS

note "Converting $(basename "$input_odp") to PDF (this can take a while)..."

"$SOFFICE" --headless --norestore \
    "-env:UserInstallation=file://$work_dir/lo_profile" \
    --convert-to pdf --outdir "$work_dir" "$input_odp" >"$convert_log" 2>&1 &
soffice_pid=$!

spinner_pid=""
if [ "$show_progress" -eq 1 ]; then
    (
        frames='|/-\'
        spin=0
        while :; do
            printf '\r  %s Converting to PDF, elapsed %s\033[K' \
                "${frames:$((spin % 4)):1}" "$(format_time "$((SECONDS - convert_start))")" >&2
            spin=$((spin + 1))
            sleep 0.5
        done
    ) &
    spinner_pid=$!
fi

soffice_status=0
wait "$soffice_pid" || soffice_status=$?

if [ -n "$spinner_pid" ]; then
    kill "$spinner_pid" 2>/dev/null || true
    wait "$spinner_pid" 2>/dev/null || true
    printf '\r\033[K' >&2
fi

if [ "$soffice_status" -ne 0 ]; then
    echo "Error: LibreOffice failed to convert $input_odp" >&2
    if [ -s "$convert_log" ]; then
        sed 's/^/    /' "$convert_log" >&2
    fi
    exit 1
fi

note "Converted to PDF in $(format_time "$((SECONDS - convert_start))")"

pdf="$work_dir/$(basename "${input_odp%.*}").pdf"
if [ ! -f "$pdf" ]; then
    pdf=$(find "$work_dir" -maxdepth 1 -name '*.pdf' -print -quit || true)
fi
if [ ! -f "$pdf" ]; then
    echo "Error: LibreOffice did not produce a PDF for $input_odp" >&2
    if [ -s "$convert_log" ]; then
        sed 's/^/    /' "$convert_log" >&2
    fi
    exit 1
fi

# ------------------------------------------------------ rasterise each page

if ! pdftoppm -png -scale-to-x "$width" -scale-to-y "$height" "$pdf" "$work_dir/slide"; then
    echo "Error: pdftoppm failed to render $pdf" >&2
    exit 1
fi

pages=("$work_dir"/slide-*.png)
total=${#pages[@]}

if [ "$total" -eq 0 ]; then
    echo "Error: no slides were rendered." >&2
    exit 1
fi

note "Rendering $total slides at ${width}x${height}..."

render_start=$SECONDS
completed=0
processed=0
failed=0

draw_progress() {
    # $1: number of slides completed so far
    local done_slides=$1
    local elapsed=$((SECONDS - render_start))
    local percent=$((done_slides * 100 / total))
    local filled=$((bar_width * done_slides / total))
    local empty=$((bar_width - filled))
    local eta_text="--:--"
    local filled_bar empty_bar

    if [ "$done_slides" -gt 0 ]; then
        eta_text=$(format_time "$((elapsed * (total - done_slides) / done_slides))")
    fi

    printf -v filled_bar '%*s' "$filled" ''
    filled_bar=${filled_bar// /#}
    printf -v empty_bar '%*s' "$empty" ''
    empty_bar=${empty_bar// /-}

    printf '\r[%s%s] %3d%% | %d/%d slides | elapsed %s | ETA %s\033[K' \
        "$filled_bar" "$empty_bar" "$percent" "$done_slides" "$total" \
        "$(format_time "$elapsed")" "$eta_text" >&2
}

warn() {
    # print a warning without leaving it mangled by the progress bar
    if [ "$show_progress" -eq 1 ]; then
        printf '\r\033[K' >&2
    fi
    echo "  ! $*" >&2
    if [ "$show_progress" -eq 1 ]; then
        draw_progress "$completed"
    fi
}

if [ "$show_progress" -eq 1 ]; then
    draw_progress 0
fi

for png in "${pages[@]}"; do
    num=${png##*/slide-}
    num=${num%.png}
    n=$((10#$num))   # slide-01.png -> 1
    completed=$((completed + 1))

    # -resize ...! pins the exact requested size even if the slide aspect
    # ratio does not match the width/height given
    if ! magick "$png" -resize "${width}x${height}!" -quality 100 -define webp:lossless=true \
            "$output_dir/$n.webp"; then
        warn "failed to encode slide $n"
        failed=$((failed + 1))
        continue
    fi

    processed=$((processed + 1))

    if [ "$show_progress" -eq 1 ]; then
        draw_progress "$completed"
    else
        echo "  slide $n -> $n.webp"
    fi
done

# ------------------------------------------------------------------- report

if [ "$show_progress" -eq 1 ]; then
    printf '\n' >&2
fi

if [ "$processed" -eq 0 ]; then
    echo "Error: no slides were exported." >&2
    exit 1
fi

printf 'Done: exported %d slide(s) at %sx%s to %s (took %02d:%02d)\n' \
    "$processed" "$width" "$height" "$output_dir" \
    "$(( (SECONDS - start_time) / 60 ))" "$(( (SECONDS - start_time) % 60 ))"

if [ "$failed" -gt 0 ]; then
    echo "Finished with $failed error(s)." >&2
    exit 1
fi
