import { Badge } from "@/components/ui/badge";
import { FunctionComponent } from "react";

const TournamentInfo: FunctionComponent = () => {
  return (
    <article
      id="rules"
      className="smooth md:grid md:grid-cols-2 md:grid-rows-1 relative font-display h-screen w-screen bg-gray-900 uppercase flex flex-col items-center justify-start px-4 pt-[11rem] gap-6"
    >
      <Badge className={"md:self-start md:ml-[25%]"}>
        <span className={"pr-2 text-sm self"}>🚨</span>
        <p> Prochain Tournoi </p>
      </Badge>
      <h1 className="smooth text-4xl md:text-5xl tracking-normal leading-none font-display uppercase text-center w-2/3">
        LUNDI 4 SEPTEMBRE
        <br />
        20H00
      </h1>
      <div className="flex flex-col items-center justify-evenly gap-4">
        <p className="text-center">
          <span className="text-secondary-500">📍</span> 2 rue de la République,
          69002 Lyon
        </p>
        <p className="text-center">
          <span className="text-secondary-500">🎟</span> 15€ par équipe
        </p>
      </div>
    </article>
  );
};

export default TournamentInfo;
