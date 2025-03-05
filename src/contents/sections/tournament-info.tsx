"use client";

import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useAppContext} from "@/contents/App.tsx";
import dayjs from "dayjs";
import {Tournament} from "@/payload-types.ts";

const getTournamentInfo = ({date}: Tournament) => ({
    date: dayjs(date).valueOf(),
    bar: "Belushi's Canal",
    address: "159 Rue de Crimée, 75019 Paris",
    metros: [{
        line: "1",
        type: "metro"
    }, {
        line: "9",
        type: "metro"
    }, {
        line: "E",
        type: "rer"
    }]
});

const TournamentInfo: FunctionComponent = () => {
    const {tournamentInfo} = useAppContext();
    const info = getTournamentInfo(tournamentInfo);

    return (
        <article
            id="tournament-info"
            className="flex min-h-full w-full flex-col items-center gap-6 bg-gray-900 px-4 pt-20 sm:px-20 md:grid md:grid-cols-2 md:grid-rows-1 md:px-10"
        >
            <div className={"flex flex-col items-center md:items-start gap-4 sm:px-20"}>
                <div className={"flex flex-col items-center md:items-start gap-4"}>
                    <Badge
                        className={"smooth font-text font-bold md:text-tag-l text-tag-m uppercase"}>{tournamentInfo.badgeText}</Badge>
                    <h2 className={"smooth font-display font-bold uppercase lg:text-display-s md:text-title-l text-title-m"}>
                        {formatDateIntl(info.date.valueOf(), "fr-FR")}<br/>
                    </h2>
                </div>
                <div className={"w-full grid grid-cols-3 grid-rows-1 gap-6 px-4"}>
                    <div className={"flex flex-col items-center text-center gap-4"}>
                        <h3 className={"text-subtitle-l uppercase font-display font-bold"}>Horaire</h3>
                        <p className={"font-text text-text-m text-white/80"}>{dayjs(tournamentInfo.date).format("HH[h]mm")}</p>
                    </div>
                    <div className={"flex flex-col items-center text-center gap-4"}>
                        <h3 className={"text-subtitle-l uppercase font-display font-bold"}>Bar</h3>
                        <p className={"font-text text-text-m text-white/80"}>{info.bar}</p>
                    </div>
                    <div className={"flex flex-col items-center text-center gap-4"}>
                        <h3 className={"text-subtitle-l uppercase font-display font-bold"}>Métros</h3>
                        <div className={"flex items-center gap-2 font-text text-text-m text-white/80"}>
                            {info.metros.map(({line, type}) => (
                                <Avatar key={line + type} className={"size-[24px]"}>
                                    <AvatarImage src={getLineImage(line, type)} alt={`Ligne ${line}`}/>
                                    <AvatarFallback>{line}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </div>
                </div>
                <ArrowButton role={"link"} onClick={() => {
                    window.open(tournamentInfo.registrationLink)
                }} iconPlacement={"right"} variant={"primary"} className={"py-4 self-center"}>Je m'inscris</ArrowButton>
            </div>
            <div>
                <iframe
                    className={"w-[100vw] h-[50vh] sm:w-[40vw] sm:h-[40vh]"}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167528.9369283956!2d2.283622066391307!3d48.99841483925655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dd03520f50d%3A0x75e5f5b732674eeb!2sBelushi&#39;s%20Paris%20(Canal)!5e0!3m2!1sfr!2sfr!4v1726512608639!5m2!1sfr!2sfr"
                    width="600" height="450" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </article>
    );
};

function formatDateIntl(date: string | number, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
    }).format(dayjs(date).toDate());
}

function getLineImage(line: string, type: string) {
    if (type === "metro") {
        return `https://www.ratp.fr/sites/default/files/lines-assets/picto/${type}/picto_metro_ligne-${line}.svg`;
    } else if (type === "rer") {
        return `https://www.ratp.fr/sites/default/files/lines-assets/picto/${type}/picto_rer_ligne-${line.toLowerCase()}.svg`;
    }
}

export default TournamentInfo;
