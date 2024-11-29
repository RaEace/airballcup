"use client";

import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {Tag, TrophyIcon} from "lucide-react";
import StyledCard from "@/components/styled-card.tsx";
import StyledIcon from "@/components/styled-icon.tsx";

const Cost: FunctionComponent = () => {
  return (
    <article
      id={"cost"}
      className={
        "overflow-hidden mb-10 relative bg-gray-700 w-full min-h-full flex flex-col items-center justify-start pt-[11rem] gap-6 px-4"
      }
    >
      <Shade />

      <div className={"z-10 flex flex-col items-center justify-evenly gap-4"}>
        <Badge className={"font-text sm:text-tag-l text-tag-m font-bold"}>
          <p>
            🎉 HAVE FUN
          </p>
        </Badge>
        <h1
          className={
            "smooth font-display lg:text-title-l md:text-title-m text-title-s font-bold uppercase text-center w-2/3"
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
                <Tag color={"white"}/>
              </StyledIcon>
            }
        >
          <b className={"smooth font-display sm:text-subtitle-l text-subtitle-m font-bold whitespace-nowrap uppercase"}>
            15€/ Personne
          </b>
        </StyledCard>

        <StyledCard>
          <b className={"smooth font-display sm:text-subtitle-l text-subtitle-m font-bold whitespace-nowrap uppercase"}>
            1 tarif tournoi pour tes consos
          </b>
        </StyledCard>

        <div className={"w-full grid grid-rows-1 grid-cols-2 gap-4"}>
          <StyledCard>
            <b className={"smooth font-display sm:text-subtitle-l text-subtitle-m font-bold whitespace-nowrap uppercase"}>
              * 2 pintes offertes
            </b>
          </StyledCard>
          <StyledCard>
            <b className={"smooth font-display sm:text-subtitle-l text-subtitle-m font-bold whitespace-nowrap uppercase"}>
              3 matchs minimum
            </b>
          </StyledCard>
        </div>

        <StyledCard
            icon={
              <StyledIcon>
                <TrophyIcon color={"white"}/>
              </StyledIcon>
            }
        >
          <b className={"smooth font-display sm:text-subtitle-l text-subtitle-m font-bold whitespace-nowrap uppercase"}>
            **Table de beer pong (100€)
          </b>
        </StyledCard>

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
