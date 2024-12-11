import {ReactNode} from "react";
import {Metadata} from "next";
import "./index.css";
import Header from "@/components/header.tsx";

export const metadata: Metadata = {
    title: "Airball Cup",
    description: "Airball Cup est une compétition de beer pong ayant lieu chaque mois à Paris. Venez défier vos amis et tentez de remporter le trophée !",
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link href="/logo.svg" rel="icon" type="image/svg+xml"/>
            <link href="https://fonts.cdnfonts.com/css/humane" rel="stylesheet"/>
            <script dangerouslySetInnerHTML={{
                __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KVMJKGHJ');
                `
            }}/>
        </head>
        <body>
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KVMJKGHJ"
                    height="0" width="0" style={{
                        visibility: 'hidden',
                        display: 'none',
            }}></iframe>
        </noscript>
        <Header/>
        <div id="root">{children}</div>
        </body>
        </html>
    );
}