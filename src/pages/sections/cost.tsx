import { FunctionComponent } from "react";
import { Badge } from "@/components/ui/badge.tsx";
import { Tag, TrophyIcon } from "lucide-react";
import StyledCard from "@/components/styled-card.tsx";
import StyledIcon from "@/components/styled-icon.tsx";

const Cost: FunctionComponent = () => {
  return (
    <article
      id={"cost"}
      className={
        "overflow-hidden mb-10 relative bg-gray-700 h-screen w-screen flex flex-col items-center justify-start pt-[11rem] gap-6 px-4"
      }
    >
      <Shade />

      <div className={"z-10 flex flex-col items-center justify-evenly gap-4"}>
        <Badge className={"font-display tracking-wide"}>
          <p>
            <span className={"pr-2 text-sm"}>🎉</span> HAVE FUN
          </p>
        </Badge>
        <h1
          className={
            "smooth text-4xl md:text-5xl tracking-normal leading-none font-display uppercase text-center w-2/3"
          }
        >
          Tarif par équipe et{" "}
          <span className={"text-secondary-500"}>récompenses</span>
        </h1>
      </div>

      <section
        className={"z-10 flex flex-col items-center justify-evenly gap-4"}
      >
        <StyledCard
          icon={
            <StyledIcon>
              <Tag color={"white"} />
            </StyledIcon>
          }
          text={"15€/ Personne"}
        />

        <StyledCard text={"1 tarif tournoi pour tes consos"} />

        <div className={"w-full grid grid-rows-1 grid-cols-2 gap-4"}>
          <StyledCard text={"* 2 pintes offertes"} />
          <StyledCard text={"3 matchs minimum"} />
        </div>

        <StyledCard
          icon={
            <StyledIcon>
              <TrophyIcon color={"white"} />
            </StyledIcon>
          }
          text={"**Table de beer pong (100€)"}
        />

        <div className={"w-full text-left text-gray-400 font-text text-sm"}>
          <p>* Par équipe </p>
          <p>** Gain des vainqueurs </p>
        </div>
      </section>
    </article>
  );
};

const Shade: FunctionComponent = () => {
  return (
    <div
      className={
        "z-0 absolute top-[25%] bg-gray-900 rounded-full sm:size-[2616px] size-[938px] smooth"
      }
    ></div>
  );
};

export default Cost;
