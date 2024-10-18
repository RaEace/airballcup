import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import Details from "@/components/details.tsx";
import Marquee from "react-fast-marquee";

const Rules: FunctionComponent = () => {
  const headers = [
    "Les tirs",
    "Balls back",
    "Défense",
    "Re-formed",
    "Redemption",
    "Airball",
  ];

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
        {headers.map((header) => (
          <Details title={header} key={header}>
            Le tir direct dans une cup ne peut être intercepté par l’équipe adverse.{" "}
            <span className={"font-bold"}>Lorsqu’il est réussi, une seule cup est enlevée</span>.{" "}

            <span className={"font-bold"}>Le rebond</span> consiste à faire rebondir la balle sur la table avant qu’elle n’entre dans un gobelet adverse.
            Il peut être intercepté et compte double. S’il est réussi, <span className={"font-bold"}>2 cups sont enlevées</span>, la deuxième au choix du perdant.
            Attention, si une balle rebondit sur un gobelet et rentre dans un autre, il compte comme un tir direct.
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
