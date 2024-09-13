import { FunctionComponent } from "react";
import { Badge } from "@/components/ui/badge.tsx";

const CallToAction: FunctionComponent = () => {
  return (
    <article
      id={"cta"}
      className={
        "w-full h-screen font-display flex flex-col items-center justify-center p-10"
      }
    >
      <div id="main" className={"flex flex-col items-center justify-start"}>
        <Badge>🚨 Prochain tournoi : 4 Septembre</Badge>
        <h1 className={"text-[72px] leading-[93%] tracking-normal"}>
          TOURNOI MENSUEL DE BEER PONG À PARIS
        </h1>
      </div>
      <div id="footer"></div>
    </article>
  );
};

export default CallToAction;
