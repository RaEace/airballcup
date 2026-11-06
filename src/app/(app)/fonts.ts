import localFont from "next/font/local";

// LC = variante effective aujourd'hui (la dernière @font-face déclarée gagnait dans font-config.css).
// Graisses limitées à celles utilisées : Thunder 500 (défaut des textes sans graisse), 700, 800 ; Obviously 400, 500, 700.
export const thunder = localFont({
    src: [
        {path: "../../assets/thunder/Web-TT/Thunder-MediumLC.woff2", weight: "500", style: "normal"},
        {path: "../../assets/thunder/Web-TT/Thunder-BoldLC.woff2", weight: "700", style: "normal"},
        {path: "../../assets/thunder/Web-TT/Thunder-ExtraBoldLC.woff2", weight: "800", style: "normal"},
    ],
    variable: "--font-thunder",
    display: "swap",
});

export const obviously = localFont({
    src: [
        {path: "../../assets/obviously/Obviously-Regular.otf", weight: "400", style: "normal"},
        {path: "../../assets/obviously/Obviously-Medium.otf", weight: "500", style: "normal"},
        {path: "../../assets/obviously/Obviously-Bold.otf", weight: "700", style: "normal"},
    ],
    variable: "--font-obviously",
    display: "swap",
});
