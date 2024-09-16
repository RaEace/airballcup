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
        <Badge className={"md:self-start md:ml-[25%]"}>
          <span className={"pr-2 text-sm self"}>🍺</span>
          <p> Comment Jouer ? </p>
        </Badge>
        <h2
          className={
            "smooth text-4xl md:text-[80px] lg:text-[100px] xl:text-[131px] md:w-1/2 md:mt-4 md:leading-none"
          }
        >
          Règles du <span className={"text-secondary-500"}>tournoi</span>
        </h2>
        <p
          className={
            "font-text text-gray-400 normal-case hidden md:block text-left w-1/2"
          }
        >
          “C’était la traverse du desert” Quand t’es asoiffé de beer pong et que
          tu sillonnes une ville comme Paris sans rien trouver à te mettre sous
          la glotte, tu paniques complétement.
        </p>
      </div>
      <div className={"w-full flex flex-col gap-4 md:w-2/3 self-start"}>
        {headers.map((header) => (
          <Details title={header} key={header}>
            Lorem ipsum tu connais
          </Details>
        ))}
      </div>
    </article>
  );
};

const AnimatedText: FunctionComponent = () => {
  const items = ["Paris", "Fun", "Beer Pong", "Tournoi"].join(" • ").split("");
  return (
    <div
      className={
        "whitespace-nowrap absolute -top-4 w-[110%] h-20 bg-secondary-500 -rotate-2 flex items-center justify-center overflow-hidden"
      }
    >
      <Marquee>
        <div>
          {items.map((item) => (
              <span className={"text-4xl"}>{item}</span>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Rules;
