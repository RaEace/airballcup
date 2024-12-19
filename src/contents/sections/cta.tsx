"use client";

import {FunctionComponent} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import ArrowButton from "@/components/arrow-button.tsx";
import useMediaQuery from "@/hooks/use-media-query.ts";
import {cn} from "@/lib/utils.ts";
import {useAppContext} from "@/contents/App.tsx";
import {motion} from "framer-motion";
import Link from "next/link";

const CallToAction: FunctionComponent = () => {
  const app = useAppContext();
  const isMobile = useMediaQuery();
  const buttonSize = isMobile ? "sm" : "lg";

  return (
    <article id={"cta"} className={
      cn(`w-full h-full flex flex-col items-center justify-center bg-cta`, "bg-cover bg-center", { "bg-no-repeat": !isMobile })
    }>
      <div className={"px-8 mr-2 space-y-4"}>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={"smooth w-full md:w-3/4 h-full space-y-4"}>
          <Badge className={"font-text lg:text-tag-l text-tag-m text-black"}>
            <p>🚨 {app.sectionsText.cta.badgeText} </p>
          </Badge>
          <h1 className={"smooth font-display lg:text-display-l text-display-s font-bold"}>
            {app.sectionsText.cta.headerText}
          </h1>
        </motion.div>
        <Link href={app.tournamentInfo.registrationLink}>
          <ArrowButton size={buttonSize} variant={"primary"} iconPlacement={"right"}>
            Je m'inscris
          </ArrowButton>
        </Link>
      </div>
    </article>
  );
};
export default CallToAction;
