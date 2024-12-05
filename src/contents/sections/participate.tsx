"use client";

import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import StyledCard from "@/components/styled-card.tsx";
import {Calendar, ExternalLink, TicketIcon, User} from "lucide-react";
import StyledIcon from "@/components/styled-icon.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CardDescription, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import useMediaQuery from "@/hooks/use-media-query.ts";
import {CURRENT_SIGNUP_URL} from "@/lib/utils.ts";

const belushisAddress = "https://maps.app.goo.gl/Xq6KDifHZRUGahjH8";

const Participate: FunctionComponent = () => {
    const isMobile = useMediaQuery();
    const btnSize = isMobile ? "sm" : "lg";

    return <article id={"participate"} className={"bg-gray-950 w-full min-h-full flex flex-col items-center justify-start py-20 px-10 lg:px-40 sm:py-4"}>
        <div className={"w-full h-full my-auto sm:mx-0 mx-auto space-y-6"}>
            <div className={"md:grid md:grid-cols-2 md:grid-rows-1 mt-4"}>
                <div className={"flex flex-col items-center justify-start md:items-start md:text-left text-center gap-4"}>
                    <Badge className={"uppercase font-text lg:text-tag-l text-tag-m"}>❓ Comment participer</Badge>
                    <h2 className={"font-display font-extrabold lg:text-title-l md:text-title-m text-title-s"}>
                        REJOINS L'AVENTURE <span className={"text-secondary-500"}>AIRBALL CUP</span>
                    </h2>
                </div>
            </div>
            <div
                className={"w-full mx-auto grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-4"}>
                <StyledCard icon={
                    <StyledIcon>
                        <TicketIcon/>
                    </StyledIcon>
                }>
                    <div className={"h-full flex flex-col gap-6"}>
                        <CardTitle>
                            <span className={"uppercase font-display font-bold text-title-s"}>Chope
                                ta place</span>
                        </CardTitle>
                        <CardDescription className={"h-3/4 md:px-6"}>
                            <span className={"font-text text-subtitle-m text-gray-300"}>
                                Inscris-toi à la prochaine Airball Cup pour participer au tournoi de Beer Pong.
                            </span>
                        </CardDescription>
                        <CardFooter className={"w-full flex items-center justify-center"}>
                            <ArrowButton role={"link"} onClick={() => { window.open(CURRENT_SIGNUP_URL) }} size={btnSize} iconSize={
                                isMobile ? 20 : 24
                            } iconPlacement={"right"} variant={"primary"}>
                                Je m'inscris
                            </ArrowButton>
                        </CardFooter>
                    </div>
                </StyledCard>
                <StyledCard icon={
                    <StyledIcon>
                        <User/>
                    </StyledIcon>
                }>
                    <div className={"h-full flex flex-col gap-6"}>
                        <CardTitle>
                            <span className={"uppercase font-display font-bold text-title-s"}>Tu cherches
                                un partenaire ?</span>
                        </CardTitle>
                        <CardDescription className={"h-3/4"}>
                            <span className={"font-text text-subtitle-m text-gray-300"}>
                                On se charge de te mettre en relation avec un autre joueur single. Indique ton mail
                                ci-dessous et on te tient au courant !
                            </span>
                        </CardDescription>
                        <CardFooter className={"w-full flex items-center justify-center"}>
                            <Input type={"email"} inputSize={btnSize} placeholder={"Ton addresse email"}/>
                        </CardFooter>
                    </div>
                </StyledCard>
                <StyledCard icon={
                    <StyledIcon>
                    <Calendar/>
                    </StyledIcon>
                }>
                    <div className={"h-full flex flex-col gap-6"}>
                        <CardTitle>
                            <span className={"uppercase font-display font-bold text-title-s"}>RDV AU BELUSHI'S CANAL</span>
                        </CardTitle>
                        <CardDescription className={"h-3/4"}>
                            <span className={"font-text  text-subtitle-m text-gray-300"}>
                                Notre partenaire, le Belushi's Canal, t'ouvre ses portes au bord de l'eau. Atmosphère
                                familiale, néons colorés, et 6 tables de BP privatisées rien que pour nous.
                            </span>
                        </CardDescription>
                        <CardFooter className={"w-full flex items-center justify-center"}>
                            <Button size={btnSize} variant={"link"} asChild>
                                <a href={belushisAddress}>Ouvrir
                                    maps <ExternalLink className={"ml-2 mb-1 hover:underline"} size={15}/></a>
                            </Button>
                        </CardFooter>
                    </div>
                </StyledCard>
            </div>
        </div>
    </article>
};

export default Participate;