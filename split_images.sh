#!/usr/bin/env bash
#
# split_images.sh — split every image in a folder vertically in half.
#
# Usage:
#   ./split_images.sh <input_folder> <output_folder>
#
# For each image (jpg, jpeg, png, webp — extensions matched case-insensitively)
# in <input_folder>, the image is cut along its vertical centre line:
#
#   <name>a.webp   the left half
#   <name>b.webp   the right half
#
# Output is always lossless WebP, whatever the input format was.
# On odd pixel widths the extra pixel goes to the left ("a") half.
#
# A live progress bar (elapsed time + ETA) is drawn on stderr when the script
# runs in a terminal; when output is redirected, one line per image is printed
# instead so logs stay readable.
#
# Requires ImageMagick (v7 "magick", or v6 "convert" + "identify").

set -euo pipefail

# ---------------------------------------------------------------- arguments

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <input_folder> <output_folder>" >&2
    exit 1
fi

input_dir=$1
output_dir=$2

if [ ! -d "$input_dir" ]; then
    echo "Error: input folder does not exist: $input_dir" >&2
    exit 1
fi

# ------------------------------------------------------------- dependencies

if command -v magick >/dev/null 2>&1; then
    MAGICK=(magick)                # ImageMagick 7
    IDENTIFY=(magick identify)
elif command -v convert >/dev/null 2>&1 && command -v identify >/dev/null 2>&1; then
    MAGICK=(convert)               # ImageMagick 6
    IDENTIFY=(identify)
else
    echo "Error: ImageMagick is required but was not found (looked for 'magick' or 'convert')." >&2
    exit 1
fi

mkdir -p "$output_dir"

# -------------------------------------------------------- collect input files

shopt -s nullglob nocaseglob

files=()
for img in "$input_dir"/*.jpg "$input_dir"/*.jpeg "$input_dir"/*.png "$input_dir"/*.webp; do
    files+=("$img")
done

total=${#files[@]}

if [ "$total" -eq 0 ]; then
    echo "No jpg / jpeg / png / webp images found in: $input_dir"
    exit 0
fi

# ---------------------------------------------------------- progress display

bar_width=30
start_time=$SECONDS
completed=0

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

draw_progress() {
    # $1: number of files completed so far
    local done_files=$1
    local elapsed=$((SECONDS - start_time))
    local percent=$((done_files * 100 / total))
    local filled=$((bar_width * done_files / total))
    local empty=$((bar_width - filled))
    local eta_text="--:--"
    local filled_bar empty_bar

    if [ "$done_files" -gt 0 ]; then
        # linear estimate: average time per finished file x files still to do
        eta_text=$(format_time "$((elapsed * (total - done_files) / done_files))")
    fi

    printf -v filled_bar '%*s' "$filled" ''
    filled_bar=${filled_bar// /#}
    printf -v empty_bar '%*s' "$empty" ''
    empty_bar=${empty_bar// /-}

    printf '\r[%s%s] %3d%% | %d/%d images | elapsed %s | ETA %s\033[K' \
        "$filled_bar" "$empty_bar" "$percent" "$done_files" "$total" \
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

# --------------------------------------------------------------------- main

webp_opts=(-quality 100 -define webp:lossless=true)

processed=0
failed=0

if [ "$show_progress" -eq 1 ]; then
    draw_progress 0
fi

for img in "${files[@]}"; do
    filename=${img##*/}
    base=${filename%.*}
    completed=$((completed + 1))

    dims=$("${IDENTIFY[@]}" -format '%w %h' "$img" 2>/dev/null || true)
    width=${dims%% *}
    height=${dims##* }

    case ${width:-x}${height:-x} in
        *[!0-9]*)
            warn "cannot read image dimensions, skipping: $filename"
            failed=$((failed + 1))
            continue
            ;;
    esac

    if [ "$width" -lt 2 ]; then
        warn "only $width px wide, too narrow to split in half, skipping: $filename"
        failed=$((failed + 1))
        continue
    fi

    # ceil(width / 2): on odd widths the left half keeps the extra pixel
    left_width=$(( (width + 1) / 2 ))
    right_width=$(( width - left_width ))

    out_a="$output_dir/${base}a.webp"
    out_b="$output_dir/${base}b.webp"

    if ! "${MAGICK[@]}" "$img" -auto-orient \
             -crop "${left_width}x${height}+0+0" +repage "${webp_opts[@]}" "$out_a" ||
       ! "${MAGICK[@]}" "$img" -auto-orient \
             -crop "${right_width}x${height}+${left_width}+0" +repage "${webp_opts[@]}" "$out_b"; then
        warn "failed to split: $filename"
        rm -f "$out_a" "$out_b"
        failed=$((failed + 1))
        continue
    fi

    processed=$((processed + 1))

    if [ "$show_progress" -eq 1 ]; then
        draw_progress "$completed"
    else
        echo "  $filename -> ${base}a.webp + ${base}b.webp"
    fi
done

# ------------------------------------------------------------------- report

if [ "$show_progress" -eq 1 ]; then
    printf '\n' >&2
fi

echo "Done: split $processed image(s) into $((processed * 2)) file(s) in $output_dir (took $(format_time "$((SECONDS - start_time))"))"

if [ "$failed" -gt 0 ]; then
    echo "Finished with $failed error(s)." >&2
    exit 1
fi
