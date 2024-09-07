import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {Tag, TrophyIcon} from "lucide-react";
import StyledCard from "@/components/styled-card.tsx";
import StyledIcon from "@/components/styled-icon.tsx";

const Cost: FunctionComponent = () => {
    return <article className={"w-full h-full flex flex-col items-center justify-center gap-6 px-4"}>
        <div className={"flex flex-col items-center justify-evenly gap-2"}>
            <Badge className={"font-display"}>
                <span className={"pr-2"}>🎉</span> HAVE FUN
            </Badge>
            <h1 className={"text-subtitle-large font-display uppercase text-center w-2/3"}>
                Tarif par équipe et <span className={"text-secondary-500"}>premier prix</span>
            </h1>
        </div>

        <section className={"flex flex-col items-center justify-evenly gap-4"}>
            <StyledCard icon={<StyledIcon>
                <Tag color={"white"} />
            </StyledIcon>} text={"15€/ Personne"} />

            <StyledCard text={"1 tarif tournoi pour tes consos"} />

            <div className={"w-full grid grid-rows-1 grid-cols-2 gap-4"}>
                <StyledCard text={"*2 pintes offertes"} />
                <StyledCard text={"3 matchs minimum"} />
            </div>

            <StyledCard icon={
                <StyledIcon><TrophyIcon color={"white"} /></StyledIcon>
            } text={"**Table de beer pong (100€)"} />

            <div className={"w-full text-left text-gray-400 font-text text-sm"}>
                <p>* Par équipe </p>
                <p>** Gain des vainqueurs </p>
            </div>
        </section>
    </article>;
}

export default Cost;