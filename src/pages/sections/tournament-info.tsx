import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import ArrowButton from "@/components/arrow-button.tsx";

const tournamentInfo = {
  date: "2024-09-26",
  bar: "Belushi's Canal",
  address: "159 Rue de Crimée, 75019 Paris",
  metros: ["1", "8"]
};

const TournamentInfo: FunctionComponent = () => {
  return (
    <article
      id="rules"
      className="w-full min-h-full bg-gray-900 flex flex-col md:grid md:grid-cols-2 md:grid-rows-1 md:px-10 items-center pt-20 pb-6 gap-6"
    >
      <div className={"flex flex-col items-center gap-4"}>
        <div className={"flex flex-col items-center gap-4"}>
          <Badge className={"smooth font-display uppercase"}>🚨 Prochain tournoi</Badge>
          <h2 className={"smooth font-display uppercase md:text-title-l-extrabold text-title-m-extrabold"}>
            { formatDateIntl(tournamentInfo.date, "fr-FR") }<br/>
          </h2>
        </div>
        <div className={"w-full grid grid-cols-3 grid-rows-1 gap-6"}>
          <div className={"flex flex-col items-center text-center gap-4"}>
            <h3 className={"text-title-s-bold uppercase font-display"}>Horaire</h3>
            <p className={"font-text text-text-s-light text-white/80"}>{tournamentInfo.date}</p>
          </div>
          <div className={"flex flex-col items-center text-center gap-4"}>
            <h3 className={"text-title-s-bold uppercase font-display"}>Bar</h3>
            <p className={"font-text text-text-s-light text-white/80"}>{tournamentInfo.bar}</p>
          </div>
          <div className={"flex flex-col items-center text-center gap-4"}>
            <h3 className={"text-title-s-bold uppercase font-display"}>Métros</h3>
            <p className={"font-text text-text-s-light text-white/80"}>{tournamentInfo.metros.join(", ")}</p>
          </div>
        </div>
        <ArrowButton variant={"primary"} className={"py-4"}>Je m'inscris</ArrowButton>
      </div>
      <div>
        <iframe
            className={"w-[90vw] h-[50vh] sm:w-[40vw] sm:h-[40vh]"}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167528.9369283956!2d2.283622066391307!3d48.99841483925655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dd03520f50d%3A0x75e5f5b732674eeb!2sBelushi&#39;s%20Paris%20(Canal)!5e0!3m2!1sfr!2sfr!4v1726512608639!5m2!1sfr!2sfr"
            width="600" height="450" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </article>
  );
};

function formatDateIntl(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

export default TournamentInfo;
