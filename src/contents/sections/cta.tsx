import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import Link from "next/link";
import dayjs from "dayjs";
import {Tournament} from "@/payload-types.ts";

const CallToAction: FunctionComponent<{tournamentInfo: Tournament}> = ({tournamentInfo}) => {
    return (
        <article id={"cta"} className={"w-full h-full flex flex-col items-center justify-center bg-cta bg-cover bg-center bg-no-repeat"}>
            <div className={"px-8 mr-2 space-y-4"}>
                <div className={"smooth w-full md:w-3/4 h-full space-y-4"}>
                    <Badge className={"font-text lg:text-tag-l text-tag-m text-black"}>
                        <p>{tournamentInfo.badgeText} : {new Intl.DateTimeFormat(
                            "fr-FR",
                            {year: "numeric", month: "long", day: "numeric"}
                        ).format(dayjs(tournamentInfo.date).toDate())}</p>
                    </Badge>
                    <h1 className={"smooth font-display lg:text-display-l text-display-s font-bold"}>
                        TOURNOI MENSUEL DE BEERPONG A PARIS
                    </h1>
                </div>
                <Link href={tournamentInfo.registrationLink}>
                    <ArrowButton size={"lg"} variant={"primary"} iconPlacement={"right"}>
                        Je m'inscris
                    </ArrowButton>
                </Link>
            </div>
        </article>
    );
};

export default CallToAction;
