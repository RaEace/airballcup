import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import StyledCard from "@/components/styled-card.tsx";
import {Calendar, ExternalLink, TicketIcon, User} from "lucide-react";
import StyledIcon from "@/components/styled-icon.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const belushisAddress = "https://maps.app.goo.gl/Xq6KDifHZRUGahjH8";

const Participate: FunctionComponent = () => {
    return <article id={"participate"} className={"w-full min-h-full flex flex-col items-center justify-start py-20 px-6 sm:py-0"}>
        <div className={"w-full h-full my-auto sm:mx-0 mx-auto space-y-6"}>
            <div className={"md:grid md:grid-cols-2 md:grid-rows-1 mt-4"}>
                <div className={"flex flex-col items-center justify-start md:items-start md:text-left text-center gap-4"}>
                    <Badge className={"uppercase font-display"}>❓ Comment participer</Badge>
                    <h2 className={"uppercase font-display text-title-l-extrabold"}>
                        Rejoins l'aventure <span className={"text-secondary-500"}>Airball Cup</span>
                    </h2>
                </div>
            </div>
            <div
                className={"w-full mx-auto grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4"}>
                <StyledCard icon={
                    <StyledIcon>
                        <TicketIcon/>
                    </StyledIcon>
                }>
                    <div className={"h-full flex flex-col gap-6"}>
                    <div className={"h-3/4"}>
                            <h3 className={"text-title-s-bold uppercase"}>Chope ta place</h3>
                            <p className={"font-text text-text-s-light"}>
                                Inscris-toi à la prochaine Airball Cup pour participer au tournoi de Beer Pong.
                            </p>
                        </div>
                        <div className={"h-1/4 mb-4"}>
                            <ArrowButton variant={"primary"} className={"px-4 py-6 w-full my-auto"}>
                                Je m'inscris
                            </ArrowButton>
                        </div>
                    </div>
                </StyledCard>
                <StyledCard icon={
                    <StyledIcon>
                        <User/>
                    </StyledIcon>
                }>
                    <div className={"h-full flex flex-col gap-6"}>
                        <div className={"h-3/4"}>
                            <h3 className={"text-title-s-bold uppercase"}>Tu cherches un partenaire ?</h3>
                            <p className={"font-text text-text-s-light"}>
                                On se charge de te mettre en relation avec un autre joueur single. Indique ton mail
                                ci-dessous et on te tient au courant !
                            </p>
                        </div>
                        <div className={"h-1/4 mb-4"}>
                            <Input placeholder={"Ton addresse email"}/>
                        </div>
                    </div>
                </StyledCard>
                <StyledCard icon={
                    <StyledIcon>
                        <Calendar/>
                    </StyledIcon>
                }>
                    <div className={"h-full flex flex-col gap-6"}>
                        <div className={"h-3/4"}>
                            <h3 className={"text-title-s-bold uppercase"}>RDV AU BELUSHI'S CANAL</h3>
                            <p className={"font-text text-text-s-light"}>
                                Notre partenaire, le Belushi's Canal, t'ouvre ses portes au bord de l'eau. Atmosphère
                                familiale, néons colorés, et 6 tables de BP privatisées rien que pour nous.
                            </p>
                        </div>
                        <div className={"h-1/4 mb-4"}>
                            <Button className={"my-auto uppercase flex items-center justify-center"} variant={"link"} asChild>
                                <a className={"font-display text-text-m-light tracking-wider"} href={belushisAddress}>Ouvrir
                                    maps <ExternalLink className={"ml-2 mb-1 hover:underline"} size={15}/></a>
                            </Button>
                        </div>
                    </div>
                </StyledCard>
            </div>
        </div>
    </article>
};

export default Participate;