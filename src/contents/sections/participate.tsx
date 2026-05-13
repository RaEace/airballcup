import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import StyledCard from "@/components/styled-card.tsx";
import {Calendar, ExternalLink, TicketIcon} from "lucide-react";
import StyledIcon from "@/components/styled-icon.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import Link from "next/link";
import {Button} from "@/components/ui/button.tsx";
import {CardDescription, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {Tournament} from "@/payload-types.ts";

const belushisAddress = "https://maps.app.goo.gl/Xq6KDifHZRUGahjH8";

const Participate: FunctionComponent<{tournamentInfo: Tournament}> = ({tournamentInfo}) => {
    return (
        <article id={"participate"} className={"bg-gray-950 w-full min-h-full flex flex-col items-center justify-start py-20 px-10 lg:px-40 sm:py-4"}>
            <div className={"w-full h-full my-auto sm:mx-0 mx-auto space-y-6"}>
                <div className={"md:grid md:grid-cols-2 md:grid-rows-1 mt-4"}>
                    <div className={"flex flex-col items-center justify-start md:items-start md:text-left text-center gap-4"}>
                        <Badge className={"uppercase font-text lg:text-tag-l text-tag-m"}>❓ Comment participer</Badge>
                        <h2 className={"font-display font-extrabold lg:text-title-l md:text-title-m text-title-s"}>
                            REJOINS L'AVENTURE <span className={"text-secondary-500"}>AIRBALL CUP</span>
                        </h2>
                    </div>
                </div>
                <div className={"w-full mx-auto grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-4"}>
                    <StyledCard icon={<StyledIcon><TicketIcon/></StyledIcon>}>
                        <div className={"h-full flex flex-col gap-6"}>
                            <CardTitle>
                                <span className={"uppercase font-display font-bold text-title-s"}>Chope ta place</span>
                            </CardTitle>
                            <CardDescription className={"h-3/4 md:px-6"}>
                                <span className={"font-text text-subtitle-m text-gray-300"}>
                                    Inscris-toi à la prochaine Airball Cup pour participer au tournoi de Beer Pong.
                                </span>
                            </CardDescription>
                            <CardFooter className={"w-full flex items-center justify-center"}>
                                <Link href={tournamentInfo.registrationLink} target={"_blank"} rel={"noopener noreferrer"}>
                                    <ArrowButton size={"lg"} iconSize={24} iconPlacement={"right"} variant={"primary"}>
                                        Je m'inscris
                                    </ArrowButton>
                                </Link>
                            </CardFooter>
                        </div>
                    </StyledCard>
<StyledCard icon={<StyledIcon><Calendar/></StyledIcon>}>
                        <div className={"h-full flex flex-col gap-6"}>
                            <CardTitle>
                                <span className={"uppercase font-display font-bold text-title-s"}>RDV AU BELUSHI'S CANAL</span>
                            </CardTitle>
                            <CardDescription className={"h-3/4"}>
                                <span className={"font-text text-subtitle-m text-gray-300"}>
                                    Notre partenaire, le Belushi's Canal, t'ouvre ses portes au bord de l'eau. Atmosphère familiale, néons colorés, et 6 tables de BP privatisées rien que pour nous.
                                </span>
                            </CardDescription>
                            <CardFooter className={"w-full flex items-center justify-center"}>
                                <Button size={"lg"} variant={"link"} asChild>
                                    <a href={belushisAddress}>Ouvrir maps <ExternalLink className={"ml-2 mb-1 hover:underline"} size={15}/></a>
                                </Button>
                            </CardFooter>
                        </div>
                    </StyledCard>
                </div>
            </div>
        </article>
    );
};

export default Participate;
