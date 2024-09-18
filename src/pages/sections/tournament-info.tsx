import {Badge} from "@/components/ui/badge";
import {FunctionComponent} from "react";

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

        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167528.9369283956!2d2.283622066391307!3d48.99841483925655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dd03520f50d%3A0x75e5f5b732674eeb!2sBelushi&#39;s%20Paris%20(Canal)!5e0!3m2!1sfr!2sfr!4v1726512608639!5m2!1sfr!2sfr"
            width="600" height="450" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        <p className="text-center">
          <span className="text-secondary-500">🎟</span> 15€ par équipe
        </p>
      </div>
    </article>
  );
};

export default TournamentInfo;
