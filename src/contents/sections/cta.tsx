import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import useMediaQuery from "@/hooks/use-media-query.ts";
import {cn, CURRENT_SIGNUP_URL} from "@/lib/utils.ts";
import {useAppContext} from "@/contents/App.tsx";

const CallToAction: FunctionComponent = () => {
  const app = useAppContext();
  const isMobile = useMediaQuery();
  const buttonSize = isMobile ? "sm" : "lg";

  return (
    <article id={"cta"} className={
      cn(`w-full h-full flex flex-col items-center justify-center bg-cta`, "bg-cover bg-center", { "bg-no-repeat": !isMobile })
    }>
      <div className={"px-8 mr-2 space-y-4"}>
        <div className={"smooth w-full md:w-3/4 h-full space-y-4"}>
          <Badge className={"font-text lg:text-tag-l text-tag-m text-black"}>
            <p>🚨 {app.contents.cta.badgeText} </p>
          </Badge>
          <h1 className={"smooth font-display lg:text-display-l text-display-s font-bold"}>
            {app.contents.cta.headerText}
          </h1>
        </div>
        <ArrowButton role={"link"} onClick={() => { window.open(CURRENT_SIGNUP_URL) }} size={buttonSize} variant={"primary"} iconPlacement={"right"}>
          Je m'inscris
        </ArrowButton>
      </div>
    </article>
  );
};
export default CallToAction;
