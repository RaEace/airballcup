"use client";

import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import WinnerCarousel from "@/components/winner-carousel.tsx";

const Winners: FunctionComponent = () => {
    return <article id={"champions"} className={"overflow-hidden relative w-full h-full flex flex-col items-center bg-secondary-500 px-6 pt-32 pb-20"}>
        <CircleBackground />
        <section className={"z-20 w-full h-full grid md:grid-cols-5 md:grid-rows-1 grid-rows-4 grid-cols-1 gap-6"}>
            <div className={"mx-4 md:col-span-2 row-span-1 flex flex-col gap md:items-start justify-center items-center md:text-left text-center gap-4"}>
                <Badge className={"font-text lg:text-tag-l text-tag-m text-black"}>
                    <p>🏆 LES GOATS</p>
                </Badge>
                <h1 className={"smooth uppercase font-display lg:text-display-l text-title-m font-bold"}>
                    Nos <br/> derniers <br/>
                    Vainqueurs
                </h1>
            </div>
            <div className={"md:col-span-3 row-span-3 w-full flex flex-col items-center justify-center"}>
                <div
                    className={"w-1/2 min-w-[300px] max-w-[500px] h-full flex flex-col items-center justify-center z-20"}>
                    <WinnerCarousel/>
                </div>
            </div>
        </section>
    </article>
};

const CircleBackground: FunctionComponent = () => {
    return <svg className={"absolute -top-20 z-1"} xmlns="http://www.w3.org/2000/svg" width="2131" height="910" viewBox="0 0 375 723" fill="none">
        <path d="M1649 118.122C1090.54 146.334 -4.3577 -73.5375 -482 -187C127.339 344.127 631 616 1649 723V118.122Z"
              fill="#224D9E"/>
    </svg>;
};

export default Winners;