/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "12px",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      animation: {
        marquee: "marquee 14s linear infinite",
        marquee2: "marquee2 14s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      fontSize: {
        "subtitle-large": "24px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["Thunder"],
        text: ["Obviously"],
      },
      colors: {
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
        primary: {
          25: "#FFFFF4",
          50: "#FFFDE4",
          100: "#FDDFD1",
          200: "#FCB8A3",
          300: "#F78875",
          400: "#EF5B51",
          500: "#E51C21",
          600: "#C41428",
          700: "#A40E2C",
          800: "#84082C",
          900: "#6D052C",
        },
        secondary: {
          25: "#F7FCFF",
          50: "#EBF7FF",
          100: "#DAEFFD",
          200: "#B6DFDB",
          300: "#A5D3F7",
          400: "#8FC4F4",
          500: "#4587DC",
          600: "#32688D",
          700: "#224D9E",
          800: "#16367F",
          900: "#0D2569",
        },
        error: {
          25: "#FFF8FA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECFDA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A",
        },
        destructive: {
          25: "#FFF8FA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECFDA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A",
        },
        warning: {
          25: "#FFFCEF",
          50: "#FFF7EB",
          100: "#FECF07",
          200: "#FFE1A9",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
          800: "#93370D",
          900: "#7A2E0E",
        },
        success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
          800: "#05603A",
          900: "#054F31",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },

      fontSize: {
        "display-l-extrabold": [
          "112px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "display-l-bold": [
          "112px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "display-l-medium": [
          "112px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "display-l-light": [
          "112px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],

        "display-s-extrabold": [
          "64px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "display-s-bold": ["64px", { lineHeight: "110%", letterSpacing: "0%" }],
        "display-s-medium": [
          "64px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "display-s-light": [
          "64px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],

        "title-l-extrabold": [
          "48px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "title-l-bold": ["48px", { lineHeight: "110%", letterSpacing: "0%" }],
        "title-l-medium": ["48px", { lineHeight: "110%", letterSpacing: "0%" }],
        "title-l-light": ["48px", { lineHeight: "110%", letterSpacing: "0%" }],

        "title-m-extrabold": [
          "32px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "title-m-bold": ["32px", { lineHeight: "110%", letterSpacing: "0%" }],
        "title-m-medium": ["32px", { lineHeight: "110%", letterSpacing: "0%" }],
        "title-m-light": ["32px", { lineHeight: "110%", letterSpacing: "0%" }],

        "title-s-extrabold": [
          "24px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "title-s-bold": ["24px", { lineHeight: "110%", letterSpacing: "0%" }],
        "title-s-medium": ["24px", { lineHeight: "110%", letterSpacing: "0%" }],
        "title-s-light": ["24px", { lineHeight: "110%", letterSpacing: "0%" }],

        "subtitle-l-extrabold": [
          "20px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "subtitle-l-bold": [
          "20px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "subtitle-l-medium": [
          "20px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "subtitle-l-light": [
          "20px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],

        "subtitle-m-extrabold": [
          "16px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "subtitle-m-bold": [
          "16px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "subtitle-m-medium": [
          "16px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "subtitle-m-light": [
          "16px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],

        "button-l-extrabold": [
          "20px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "button-l-bold": ["20px", { lineHeight: "110%", letterSpacing: "0%" }],
        "button-l-medium": [
          "20px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "button-l-light": ["20px", { lineHeight: "110%", letterSpacing: "0%" }],

        "text-m-extrabold": [
          "16px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "text-m-bold": ["16px", { lineHeight: "110%", letterSpacing: "0%" }],
        "text-m-medium": ["16px", { lineHeight: "110%", letterSpacing: "0%" }],
        "text-m-light": ["16px", { lineHeight: "110%", letterSpacing: "0%" }],

        "text-s-extrabold": [
          "14px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "text-s-bold": ["14px", { lineHeight: "110%", letterSpacing: "0%" }],
        "text-s-medium": ["14px", { lineHeight: "110%", letterSpacing: "0%" }],
        "text-s-light": ["14px", { lineHeight: "110%", letterSpacing: "0%" }],

        "tag-l-extrabold": [
          "12px",
          { lineHeight: "110%", letterSpacing: "0%" },
        ],
        "tag-l-bold": ["12px", { lineHeight: "110%", letterSpacing: "0%" }],
        "tag-l-medium": ["12px", { lineHeight: "110%", letterSpacing: "0%" }],
        "tag-l-light": ["12px", { lineHeight: "110%", letterSpacing: "0%" }],
      },
      fontWeight: {
        extrabold: 800,
        bold: 700,
        medium: 500,
        light: 300,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
