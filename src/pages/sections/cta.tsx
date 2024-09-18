import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import ArrowButton from "@/components/arrow-button.tsx";

const CallToAction: FunctionComponent = () => {
  return (
    <article
      id={"cta"}
      className={
        "smooth uppercase w-full h-full font-display flex flex-col justify-center gap-6 p-10 md:p-40"
      }
    >
      <div id="main" className={"smooth flex flex-col items-start justify-start gap-4"}>
        <Badge>🚨 Prochain tournoi : 4 Septembre</Badge>
        <h1 className={"smooth w-[50vw] md:text-display-s-extrabold xl:text-display-l-extrabold text-display-s-extrabold"}>
          TOURNOI MENSUEL DE BEER PONG À PARIS
        </h1>
      </div>
      <div className={"w-1/2"}>
        <ArrowButton variant={"primary"} className={"smooth p-6 lg:p-10 lg:w-1/2"}>
          Je m'inscris
        </ArrowButton>
      </div>
    </article>
  );
};
export default CallToAction;
