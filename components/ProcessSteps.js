function ProcessSteps() {
  try {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 1024);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    const steps = [
      {
        title: "Submit Required Documents",
        desc: "Gather and submit all mandatory documents including ownership proof, CTS plans, and consent letters from existing members to initiate the 79(A) application.",
      },
      {
        title: "Project Feasibility Report",
        desc: "Our team evaluates the structural condition, FSI potential, and financial viability to prepare a comprehensive feasibility report for the proposed redevelopment.",
      },
      {
        title: "Tendering & Selection of Developers",
        desc: "A transparent tender process is conducted to shortlist and select a qualified developer, ensuring the best terms and conditions for the existing members of the society.",
      },
      {
        title: "Development Agreement & Building Plans",
        desc: "The development agreement is executed between the society and the selected developer. Architectural plans are prepared and submitted for MHADA approval under DCPR 2034.",
      },
      {
        title: "Construction Process",
        desc: "Construction commences post-approval with regular site supervision, quality control checks, and compliance monitoring to ensure timely delivery within the sanctioned plans.",
      },
      {
        title: "Repossession & Defect Liability",
        desc: "Members take possession of their new units upon project completion. A defect liability period ensures the developer addresses any structural or finishing issues post-handover.",
      },
    ];

    /* ── Inline SVG illustrations for each step ── */
    const illustrations = [
      /* Step 1 — Submit Documents */
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="200" r="160" fill="#EDF1FF" />
        <circle cx="250" cy="200" r="120" fill="#dce3f9" opacity="0.5" />
        {/* Folder back */}
        <rect x="140" y="130" width="220" height="170" rx="12" fill="#29438D" />
        <path
          d="M140 142c0-6.627 5.373-12 12-12h60l20 24h116c6.627 0 12 5.373 12 12v0H140v-24z"
          fill="#3d5aad"
        />
        {/* Document 1 */}
        <rect
          x="170"
          y="155"
          width="140"
          height="180"
          rx="8"
          fill="white"
          stroke="#e0e4ed"
          strokeWidth="1.5"
        />
        <rect x="190" y="175" width="80" height="6" rx="3" fill="#c7cee0" />
        <rect x="190" y="191" width="100" height="6" rx="3" fill="#c7cee0" />
        <rect x="190" y="207" width="60" height="6" rx="3" fill="#c7cee0" />
        <rect x="190" y="230" width="90" height="6" rx="3" fill="#c7cee0" />
        <rect x="190" y="246" width="70" height="6" rx="3" fill="#c7cee0" />
        {/* Document 2 (offset) */}
        <rect
          x="200"
          y="145"
          width="140"
          height="180"
          rx="8"
          fill="white"
          stroke="#e0e4ed"
          strokeWidth="1.5"
        />
        <rect x="220" y="165" width="80" height="6" rx="3" fill="#c7cee0" />
        <rect x="220" y="181" width="100" height="6" rx="3" fill="#c7cee0" />
        <rect x="220" y="197" width="60" height="6" rx="3" fill="#c7cee0" />
        <rect x="220" y="220" width="90" height="6" rx="3" fill="#c7cee0" />
        <rect x="220" y="236" width="70" height="6" rx="3" fill="#c7cee0" />
        {/* Checkmark badge */}
        <circle cx="330" cy="275" r="30" fill="#009946" />
        <path
          d="M315 275l10 10 20-20"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Pen */}
        <rect
          x="155"
          y="265"
          width="8"
          height="50"
          rx="3"
          fill="#29438D"
          transform="rotate(-20 155 265)"
        />
        <polygon points="149,312 153,324 161,316" fill="#29438D" />
        {/* Decorative dots */}
        <circle cx="120" cy="120" r="5" fill="#009946" opacity="0.4" />
        <circle cx="390" cy="130" r="4" fill="#29438D" opacity="0.3" />
        <circle cx="380" cy="320" r="6" fill="#009946" opacity="0.3" />
      </svg>,

      /* Step 2 — Feasibility Report */
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="200" r="160" fill="#EDF1FF" />
        <circle cx="250" cy="200" r="120" fill="#dce3f9" opacity="0.5" />
        {/* Clipboard */}
        <rect x="160" y="100" width="180" height="230" rx="12" fill="#29438D" />
        <rect x="170" y="110" width="160" height="210" rx="8" fill="white" />
        {/* Clipboard clip */}
        <rect x="220" y="90" width="60" height="30" rx="8" fill="#3d5aad" />
        <circle cx="250" cy="105" r="6" fill="white" />
        {/* Bar chart */}
        <rect
          x="195"
          y="230"
          width="22"
          height="60"
          rx="4"
          fill="#29438D"
          opacity="0.3"
        />
        <rect
          x="225"
          y="210"
          width="22"
          height="80"
          rx="4"
          fill="#29438D"
          opacity="0.5"
        />
        <rect
          x="255"
          y="190"
          width="22"
          height="100"
          rx="4"
          fill="#29438D"
          opacity="0.7"
        />
        <rect x="285" y="170" width="22" height="120" rx="4" fill="#009946" />
        {/* Trend line */}
        <path
          d="M205 240 L235 220 L265 195 L295 170"
          stroke="#009946"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="6 4"
        />
        {/* Text lines on clipboard */}
        <rect x="195" y="130" width="100" height="6" rx="3" fill="#c7cee0" />
        <rect x="195" y="146" width="80" height="6" rx="3" fill="#c7cee0" />
        <rect x="195" y="162" width="110" height="6" rx="3" fill="#c7cee0" />
        {/* Magnifying glass */}
        <circle
          cx="365"
          cy="155"
          r="35"
          stroke="#29438D"
          strokeWidth="6"
          fill="white"
          opacity="0.9"
        />
        <line
          x1="390"
          y1="180"
          x2="410"
          y2="205"
          stroke="#29438D"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <text
          x="352"
          y="162"
          fontSize="22"
          fontWeight="bold"
          fill="#009946"
          fontFamily="sans-serif"
        >
          FSI
        </text>
        {/* Decorative */}
        <circle cx="130" cy="130" r="5" fill="#009946" opacity="0.4" />
        <circle cx="400" cy="300" r="6" fill="#29438D" opacity="0.3" />
      </svg>,

      /* Step 3 — Tendering & Selection */
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="200" r="160" fill="#EDF1FF" />
        <circle cx="250" cy="200" r="120" fill="#dce3f9" opacity="0.5" />
        {/* Person card 1 (left, faded) */}
        <rect
          x="100"
          y="140"
          width="110"
          height="150"
          rx="12"
          fill="white"
          stroke="#e0e4ed"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="155" cy="185" r="22" fill="#c7cee0" />
        <rect x="130" y="218" width="50" height="5" rx="2.5" fill="#c7cee0" />
        <rect x="125" y="232" width="60" height="5" rx="2.5" fill="#c7cee0" />
        <rect x="135" y="260" width="40" height="14" rx="7" fill="#e0e4ed" />
        {/* Person card 2 (center, selected) */}
        <rect
          x="195"
          y="120"
          width="110"
          height="170"
          rx="12"
          fill="white"
          stroke="#009946"
          strokeWidth="2.5"
        />
        <circle cx="250" cy="170" r="26" fill="#29438D" />
        <circle cx="250" cy="163" r="10" fill="white" opacity="0.3" />
        <path
          d="M232 182c0-6 8-10 18-10s18 4 18 10"
          fill="white"
          opacity="0.2"
        />
        <rect
          x="220"
          y="208"
          width="60"
          height="6"
          rx="3"
          fill="#29438D"
          opacity="0.4"
        />
        <rect x="215" y="224" width="70" height="5" rx="2.5" fill="#c7cee0" />
        <rect x="220" y="252" width="60" height="18" rx="9" fill="#009946" />
        <text
          x="225"
          y="265"
          fontSize="10"
          fill="white"
          fontFamily="sans-serif"
          fontWeight="bold"
        >
          SELECTED
        </text>
        {/* Checkmark on selected card */}
        <circle cx="285" cy="140" r="16" fill="#009946" />
        <path
          d="M278 140l5 5 10-10"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Person card 3 (right, faded) */}
        <rect
          x="290"
          y="140"
          width="110"
          height="150"
          rx="12"
          fill="white"
          stroke="#e0e4ed"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="345" cy="185" r="22" fill="#c7cee0" />
        <rect x="320" y="218" width="50" height="5" rx="2.5" fill="#c7cee0" />
        <rect x="315" y="232" width="60" height="5" rx="2.5" fill="#c7cee0" />
        <rect x="325" y="260" width="40" height="14" rx="7" fill="#e0e4ed" />
        {/* Gavel */}
        <rect x="225" y="310" width="50" height="10" rx="3" fill="#29438D" />
        <rect x="243" y="295" width="14" height="20" rx="3" fill="#3d5aad" />
        {/* Decorative */}
        <circle cx="90" cy="110" r="5" fill="#009946" opacity="0.4" />
        <circle cx="420" cy="310" r="4" fill="#29438D" opacity="0.3" />
      </svg>,

      /* Step 4 — Agreement & Plans */
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="200" r="160" fill="#EDF1FF" />
        <circle cx="250" cy="200" r="120" fill="#dce3f9" opacity="0.5" />
        {/* Blueprint paper */}
        <rect
          x="130"
          y="100"
          width="240"
          height="200"
          rx="6"
          fill="#29438D"
          opacity="0.1"
        />
        <rect
          x="135"
          y="105"
          width="230"
          height="190"
          rx="4"
          fill="white"
          stroke="#29438D"
          strokeWidth="1.5"
        />
        {/* Grid lines */}
        <line
          x1="135"
          y1="150"
          x2="365"
          y2="150"
          stroke="#29438D"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="135"
          y1="195"
          x2="365"
          y2="195"
          stroke="#29438D"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="135"
          y1="240"
          x2="365"
          y2="240"
          stroke="#29438D"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="210"
          y1="105"
          x2="210"
          y2="295"
          stroke="#29438D"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <line
          x1="290"
          y1="105"
          x2="290"
          y2="295"
          stroke="#29438D"
          strokeWidth="0.5"
          opacity="0.15"
        />
        {/* Building plan outline */}
        <rect
          x="180"
          y="155"
          width="140"
          height="100"
          rx="2"
          fill="none"
          stroke="#29438D"
          strokeWidth="2"
        />
        <line
          x1="250"
          y1="155"
          x2="250"
          y2="255"
          stroke="#29438D"
          strokeWidth="1.5"
        />
        <rect
          x="195"
          y="175"
          width="40"
          height="30"
          rx="2"
          fill="#29438D"
          opacity="0.12"
          stroke="#29438D"
          strokeWidth="1"
        />
        <rect
          x="265"
          y="175"
          width="40"
          height="30"
          rx="2"
          fill="#29438D"
          opacity="0.12"
          stroke="#29438D"
          strokeWidth="1"
        />
        <rect
          x="230"
          y="220"
          width="40"
          height="35"
          rx="2"
          fill="#009946"
          opacity="0.15"
          stroke="#009946"
          strokeWidth="1"
        />
        {/* Dimension arrows */}
        <line
          x1="175"
          y1="270"
          x2="325"
          y2="270"
          stroke="#29438D"
          strokeWidth="1"
        />
        <polygon points="175,267 175,273 170,270" fill="#29438D" />
        <polygon points="325,267 325,273 330,270" fill="#29438D" />
        <text
          x="230"
          y="283"
          fontSize="10"
          fill="#29438D"
          fontFamily="sans-serif"
        >
          24.5m
        </text>
        {/* Handshake below */}
        <ellipse
          cx="250"
          cy="340"
          rx="50"
          ry="35"
          fill="#009946"
          opacity="0.1"
        />
        <path
          d="M220 335 C225 325, 240 320, 250 330 C260 320, 275 325, 280 335"
          stroke="#29438D"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M220 335 L210 340"
          stroke="#29438D"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M280 335 L290 340"
          stroke="#29438D"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Stamp */}
        <circle
          cx="330"
          cy="130"
          r="22"
          fill="#009946"
          stroke="#009946"
          strokeWidth="2.5"
          opacity="0.98"
        />
        <text
          x="319"
          y="134"
          fontSize="15"
          fill="#ffffff"
          fontFamily="sans-serif"
          fontWeight="bold"
        >
          OK
        </text>
        {/* Decorative */}
        <circle cx="115" cy="130" r="5" fill="#009946" opacity="0.4" />
        <circle cx="395" cy="290" r="4" fill="#29438D" opacity="0.3" />
      </svg>,

      /* Step 5 — Construction Process */
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="200" r="160" fill="#EDF1FF" />
        <circle cx="250" cy="200" r="120" fill="#dce3f9" opacity="0.5" />
        {/* Ground */}
        <rect
          x="100"
          y="310"
          width="300"
          height="8"
          rx="4"
          fill="#29438D"
          opacity="0.15"
        />
        {/* Building under construction */}
        <rect
          x="180"
          y="150"
          width="130"
          height="160"
          rx="4"
          fill="#29438D"
          opacity="0.15"
          stroke="#29438D"
          strokeWidth="2"
        />
        {/* Floors */}
        <line
          x1="180"
          y1="190"
          x2="310"
          y2="190"
          stroke="#29438D"
          strokeWidth="1.5"
        />
        <line
          x1="180"
          y1="230"
          x2="310"
          y2="230"
          stroke="#29438D"
          strokeWidth="1.5"
        />
        <line
          x1="180"
          y1="270"
          x2="310"
          y2="270"
          stroke="#29438D"
          strokeWidth="1.5"
        />
        {/* Windows */}
        <rect
          x="195"
          y="158"
          width="20"
          height="22"
          rx="2"
          fill="#29438D"
          opacity="0.25"
        />
        <rect
          x="225"
          y="158"
          width="20"
          height="22"
          rx="2"
          fill="#29438D"
          opacity="0.25"
        />
        <rect
          x="260"
          y="158"
          width="20"
          height="22"
          rx="2"
          fill="white"
          stroke="#29438D"
          strokeWidth="1"
        />
        <rect
          x="195"
          y="198"
          width="20"
          height="22"
          rx="2"
          fill="#29438D"
          opacity="0.25"
        />
        <rect
          x="225"
          y="198"
          width="20"
          height="22"
          rx="2"
          fill="white"
          stroke="#29438D"
          strokeWidth="1"
        />
        <rect
          x="260"
          y="198"
          width="20"
          height="22"
          rx="2"
          fill="white"
          stroke="#29438D"
          strokeWidth="1"
        />
        <rect
          x="195"
          y="238"
          width="20"
          height="22"
          rx="2"
          fill="white"
          stroke="#29438D"
          strokeWidth="1"
        />
        <rect
          x="225"
          y="238"
          width="20"
          height="22"
          rx="2"
          fill="white"
          stroke="#29438D"
          strokeWidth="1"
        />
        <rect
          x="260"
          y="238"
          width="20"
          height="22"
          rx="2"
          fill="white"
          stroke="#29438D"
          strokeWidth="1"
        />
        {/* Door */}
        <rect
          x="230"
          y="278"
          width="30"
          height="32"
          rx="3"
          fill="#009946"
          opacity="0.3"
          stroke="#009946"
          strokeWidth="1.5"
        />
        {/* Crane */}
        <rect
          x="315"
          y="90"
          width="8"
          height="220"
          fill="#29438D"
          opacity="0.6"
        />
        <rect
          x="270"
          y="90"
          width="100"
          height="8"
          fill="#29438D"
          opacity="0.6"
        />
        <line
          x1="323"
          y1="90"
          x2="370"
          y2="98"
          stroke="#29438D"
          strokeWidth="2"
          opacity="0.4"
        />
        <line
          x1="315"
          y1="90"
          x2="270"
          y2="98"
          stroke="#29438D"
          strokeWidth="2"
          opacity="0.4"
        />
        {/* Crane hook & cable */}
        <line
          x1="285"
          y1="98"
          x2="285"
          y2="145"
          stroke="#29438D"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M280 145 L285 155 L290 145"
          stroke="#29438D"
          strokeWidth="2"
          fill="none"
        />
        {/* Progress bar */}
        <rect x="165" y="330" width="160" height="12" rx="6" fill="#e0e4ed" />
        <rect x="165" y="330" width="100" height="12" rx="6" fill="#009946" />
        <text
          x="340"
          y="340"
          fontSize="11"
          fill="#29438D"
          fontFamily="sans-serif"
          fontWeight="bold"
        >
          62%
        </text>
        {/* Hard hat */}
        <ellipse cx="155" cy="288" rx="18" ry="10" fill="#FFC107" />
        <rect x="138" y="278" width="34" height="12" rx="4" fill="#FFC107" />
        <rect x="142" y="274" width="26" height="8" rx="4" fill="#FFD54F" />
        {/* Safety cone */}
        <polygon
          points="350,310 340,290 360,290"
          fill="#FF6B35"
          opacity="0.7"
        />
        <rect
          x="335"
          y="308"
          width="30"
          height="5"
          rx="2"
          fill="#FF6B35"
          opacity="0.5"
        />
        {/* Decorative */}
        <circle cx="120" cy="100" r="5" fill="#009946" opacity="0.4" />
        <circle cx="410" cy="280" r="4" fill="#29438D" opacity="0.3" />
      </svg>,

      /* Step 6 — Repossession & Defect Liability */
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="200" r="160" fill="#EDF1FF" />
        <circle cx="250" cy="200" r="120" fill="#dce3f9" opacity="0.5" />
        {/* Completed building */}
        <rect
          x="175"
          y="130"
          width="150"
          height="180"
          rx="6"
          fill="white"
          stroke="#29438D"
          strokeWidth="2.5"
        />
        {/* Roof */}
        <polygon points="165,135 250,85 335,135" fill="#29438D" />
        <polygon points="175,135 250,95 325,135" fill="#3d5aad" />
        {/* Windows row 1 */}
        <rect
          x="195"
          y="150"
          width="24"
          height="24"
          rx="3"
          fill="#87CEEB"
          stroke="#29438D"
          strokeWidth="1"
        />
        <line
          x1="207"
          y1="150"
          x2="207"
          y2="174"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <line
          x1="195"
          y1="162"
          x2="219"
          y2="162"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <rect
          x="238"
          y="150"
          width="24"
          height="24"
          rx="3"
          fill="#87CEEB"
          stroke="#29438D"
          strokeWidth="1"
        />
        <line
          x1="250"
          y1="150"
          x2="250"
          y2="174"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <line
          x1="238"
          y1="162"
          x2="262"
          y2="162"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <rect
          x="281"
          y="150"
          width="24"
          height="24"
          rx="3"
          fill="#87CEEB"
          stroke="#29438D"
          strokeWidth="1"
        />
        <line
          x1="293"
          y1="150"
          x2="293"
          y2="174"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <line
          x1="281"
          y1="162"
          x2="305"
          y2="162"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        {/* Windows row 2 */}
        <rect
          x="195"
          y="190"
          width="24"
          height="24"
          rx="3"
          fill="#87CEEB"
          stroke="#29438D"
          strokeWidth="1"
        />
        <line
          x1="207"
          y1="190"
          x2="207"
          y2="214"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <line
          x1="195"
          y1="202"
          x2="219"
          y2="202"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <rect
          x="238"
          y="190"
          width="24"
          height="24"
          rx="3"
          fill="#87CEEB"
          stroke="#29438D"
          strokeWidth="1"
        />
        <line
          x1="250"
          y1="190"
          x2="250"
          y2="214"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <line
          x1="238"
          y1="202"
          x2="262"
          y2="202"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <rect
          x="281"
          y="190"
          width="24"
          height="24"
          rx="3"
          fill="#87CEEB"
          stroke="#29438D"
          strokeWidth="1"
        />
        <line
          x1="293"
          y1="190"
          x2="293"
          y2="214"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        <line
          x1="281"
          y1="202"
          x2="305"
          y2="202"
          stroke="#29438D"
          strokeWidth="0.75"
        />
        {/* Main door */}
        <rect x="230" y="250" width="40" height="60" rx="4" fill="#009946" />
        <circle cx="261" cy="282" r="3" fill="white" />
        {/* Ground */}
        <rect
          x="120"
          y="310"
          width="260"
          height="6"
          rx="3"
          fill="#29438D"
          opacity="0.15"
        />
        {/* Key */}
        <g transform="translate(360, 175) rotate(25)">
          <circle
            cx="0"
            cy="0"
            r="18"
            fill="none"
            stroke="#FFB300"
            strokeWidth="4"
          />
          <rect x="14" y="-3" width="40" height="6" rx="2" fill="#FFB300" />
          <rect x="44" y="-3" width="6" height="14" rx="2" fill="#FFB300" />
          <rect x="36" y="-3" width="6" height="10" rx="2" fill="#FFB300" />
        </g>
        {/* Shield / warranty badge */}
        <g transform="translate(130, 230)">
          <path
            d="M0 10 C0 0, 25 -5, 25 -5 C25 -5, 50 0, 50 10 L50 35 C50 50, 25 60, 25 60 C25 60, 0 50, 0 35 Z"
            fill="#009946"
            opacity="0.9"
          />
          <path
            d="M15 28 L22 35 L37 20"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
        {/* Sparkle / celebration */}
        <g opacity="0.5">
          <line
            x1="340"
            y1="110"
            x2="340"
            y2="95"
            stroke="#FFB300"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="333"
            y1="103"
            x2="347"
            y2="103"
            stroke="#FFB300"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="370"
            y1="130"
            x2="370"
            y2="120"
            stroke="#009946"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="365"
            y1="125"
            x2="375"
            y2="125"
            stroke="#009946"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        {/* Decorative */}
        <circle cx="105" cy="120" r="5" fill="#009946" opacity="0.4" />
        <circle cx="410" cy="300" r="4" fill="#29438D" opacity="0.3" />
      </svg>,
    ];

    /* ── Illustration panel (shared between mobile & desktop) ── */
    const illustrationPanel = (
      <div className="relative rounded-2xl overflow-hidden process-illustration-panel">
        {illustrations.map((svg, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex items-center justify-center p-6 sm:p-10 process-illustration-slide ${activeStep === idx ? "process-illustration-slide-active" : ""}`}
          >
            {svg}
          </div>
        ))}

        {/* Step label overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-3 process-step-label-overlay">
          <span className="text-xs font-bold tracking-widest uppercase process-step-label-text">
            Step {String(activeStep + 1).padStart(2, "0")} of{" "}
            {String(steps.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    );

    return (
      <section
        id="process"
        className="py-20 bg-gradient-to-b from-white to-gray-50"
        data-name="process-steps"
        data-file="components/ProcessSteps.js"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-20">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl text-(--primary-color) mb-3">
              Section 79(A) Process
            </h2>
            <p className="text-lg text-(--text-secondary) max-w-3xl mx-auto">
              A step-by-step guide to navigating the redevelopment process with
              Radius Architects
            </p>
            <div className="w-16 h-1 bg-(--secondary-color) mx-auto mt-5 rounded-full"></div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
            {/* Left — Steps accordion */}
            <div className="w-full lg:w-[45%]">
              {/* Mobile-only illustration panel */}
              {isMobile && (
                <div className="sticky mb-6 top-4 z-10">
                  {illustrationPanel}
                </div>
              )}

              {/* Progress indicator */}
              <div className="flex items-center mb-6 gap-2">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`process-progress-segment ${idx <= activeStep ? "process-progress-segment-active" : ""}`}
                  />
                ))}
              </div>

              {/* Step cards */}
              <div className="flex flex-col gap-2">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl cursor-pointer process-step-card ${isActive ? "process-step-card-active" : ""}`}
                      onMouseEnter={() => {
                        if (!isMobile) setActiveStep(idx);
                      }}
                      onClick={() => {
                        if (isMobile) setActiveStep(idx);
                      }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Step number circle */}
                        <div
                          className={`flex-shrink-0 flex items-center justify-center rounded-full process-step-number ${isActive ? "process-step-number-active" : ""}`}
                        >
                          <span
                            className={`text-sm font-bold process-step-number-text ${isActive ? "process-step-number-text-active" : ""}`}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Text content */}
                        <div className="process-step-text-content">
                          <h3
                            className={`font-bold text-lg process-step-title ${isActive ? "process-step-title-active" : ""}`}
                          >
                            {step.title}
                          </h3>

                          {/* Expanding description */}
                          <div
                            className={`process-step-description ${isActive ? "process-step-description-active" : ""}`}
                          >
                            <div className="process-step-description-inner">
                              <p className="text-sm leading-relaxed process-step-description-text">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — Sticky illustration (desktop only) */}
            {!isMobile && (
              <div className="w-full lg:w-[55%] flex items-center">
                <div className="sticky w-full top-24">{illustrationPanel}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("ProcessSteps component error:", error);
    return null;
  }
}
