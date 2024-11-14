import {ReactNode} from "react";
import {Metadata} from "next";
import "./index.css";
import Header from "@/components/header.tsx";

export const metadata: Metadata = {
    title: "Airball Cup",
    description: "Airball Cup est une compétition de beer pong ayant lieu chaque mois à Paris. Venez défier vos amis et tentez de remporter le trophée !",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link href="/logo.svg" rel="icon" type="image/svg+xml"/>
            <link href="https://fonts.cdnfonts.com/css/humane" rel="stylesheet"/>
        </head>
        <body>
        <Header/>
        <div id="root">{children}</div>
            </body>
        </html>
    );
}