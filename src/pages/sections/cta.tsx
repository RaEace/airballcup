import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import useMediaQuery from "@/hooks/use-media-query.ts";
import {cn} from "@/lib/utils.ts";

const CallToAction: FunctionComponent = () => {
  const isMobile = useMediaQuery();
  const buttonSize = isMobile ? "sm" : "lg";

  return (
    <article className={
      cn(`w-full h-full flex flex-col items-center justify-center bg-cta`, "bg-cover bg-center", { "bg-no-repeat": !isMobile })
    }>
      <div className={"px-8 mr-2 space-y-4"}>
        <div className={"smooth w-full md:w-3/4 h-full space-y-4"}>
          <Badge className={"font-text lg:text-tag-l text-tag-m text-black"}>
            <p>🚨 PROCHAIN TOURNOI: 4 SEPTEMBRE </p>
          </Badge>
          <h1 className={"smooth font-display lg:text-display-l text-display-s font-bold"}>
            TOURNOI MENSUEL DE BEER PONG À PARIS
          </h1>
        </div>
        <ArrowButton size={buttonSize} variant={"primary"} iconPlacement={"right"}>
          Je m'inscris
        </ArrowButton>
      </div>
    </article>
  );
};
export default CallToAction;
