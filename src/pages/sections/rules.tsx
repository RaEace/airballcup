import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import Details from "@/components/details.tsx";
import Marquee from "react-fast-marquee";
import markdownIt from "markdown-it";

import shotsMd from "@/pages/sections/rules/shots.md?raw";
import ballsBackMd from "@/pages/sections/rules/balls-back.md?raw";
import defenseMd from "@/pages/sections/rules/defense.md?raw";
import reFormedMd from "@/pages/sections/rules/re-formed.md?raw";
import redemptionMd from "@/pages/sections/rules/redemption.md?raw";
import airballMd from "@/pages/sections/rules/airball.md?raw";
import trickshotsMd from "@/pages/sections/rules/trick-shots.md?raw";

const md = markdownIt();

const Rules: FunctionComponent = () => {
  const headers = [
    ["Les tirs", shotsMd],
    ["Balls back", ballsBackMd],
    ["Défense", defenseMd],
    ["Re-formed", reFormedMd],
    ["Redemption", redemptionMd],
    ["Trick Shots", trickshotsMd],
    ["Airball", airballMd],
  ];

  function markdownToHtml(content: string) {
    return md.render(content);
  }

  return (
    <article
      id={"rules"}
      className={
        "smooth md:grid md:grid-cols-2 md:grid-rows-1 relative font-display w-full min-h-full bg-gray-900 uppercase flex flex-col items-center justify-start px-4 pt-[11rem] gap-6"
      }
    >
      <AnimatedText />
      <div
        className={
          "w-full h-full mb-12 md:pt-10 flex flex-col items-center md:items-center justify-center md:justify-start gap-2"
        }
      >
        <Badge className={"font-text lg:text-tag-l text-tag-m font-bold md:self-start md:ml-[25%] mb-1"}>
          <p>🍺 Comment Jouer ?</p>
        </Badge>
        <h2
          className={
            "smooth md:text-left text-center whitespace-nowrap font-display font-bold lg:text-display-l md:text-display-s text-title-s md:w-1/2 md:mt-4"
          }
        >
          Règles du <br/><span className={"text-secondary-500"}>tournoi</span>
        </h2>
        <p
          className={
            "font-text sm:text-text-m text-text-s text-gray-400 normal-case md:text-left text-center w-1/2"
          }
        >
          “C’était la traverse du desert” Quand t’es asoiffé de beer pong et que
          tu sillonnes une ville comme Paris sans rien trouver à te mettre sous
          la glotte, tu paniques complétement.
        </p>
      </div>
      <div className={"w-full flex flex-col gap-4 md:w-2/3 self-start md:pt-14"}>
        {headers.map(([header, mdFile]) => (
          <Details title={header} key={header}>
            <p dangerouslySetInnerHTML={{
              __html: markdownToHtml(mdFile),
            }}></p>
          </Details>
        ))}
      </div>
    </article>
  );
};

const AnimatedText: FunctionComponent = () => {
  const screenTypeRep = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  };

  const itemsParts = ["Paris", "Fun", "Beer Pong", "Tournoi"];
  const items = Array.from({ length: screenTypeRep.xl * itemsParts.length }).map(
    (_, i) => itemsParts[i % itemsParts.length]
  ).join(" • ").split("").concat(` • \t`);

  return (
    <div
      className={
        "whitespace-nowrap absolute -top-4 w-[110%] h-20 bg-secondary-500 -rotate-2 flex items-center justify-center overflow-hidden"
      }
    >
      <Marquee speed={40}>
        <div className={"mr-2"}>
          {items.map((item) => (
              <span className={"smooth font-display lg:text-title-l md:text-title-m text-title-s font-bold"}>{item}</span>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Rules;
