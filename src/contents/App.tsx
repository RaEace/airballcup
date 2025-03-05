"use client";

import "./App.css";
import Cost from "./sections/cost.tsx";
import Rules from "@/contents/sections/rules.tsx";
import CallToAction from "@/contents/sections/cta.tsx";
import Gallery from "./sections/gallery.tsx";
import TournamentInfo from "./sections/tournament-info.tsx";
import History from "@/contents/sections/history.tsx";
import Participate from "@/contents/sections/participate.tsx";
import Winners from "@/contents/sections/winners.tsx";
import Footer from "@/components/footer.tsx";
import {createContext, FunctionComponent, useContext} from "react";
import {motion} from "framer-motion";
import {ClientOnlyProps, CtaTextContent} from "@/app/(app)/client.tsx";
import type {Carousel, Gallery as GalleryType, Tournament} from "@/payload-types.ts";
import {Rule} from "@/payload-types.ts";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";

type AppContextProps = {
    sectionsText: {
        cta: CtaTextContent;
    };
    tournamentInfo: Tournament;
    rules: Rule[];
    gallery: GalleryType;
    carousel: Carousel;
};

// Resulting type

const AppContext = createContext<AppContextProps | null>(null);
const AppProvider = AppContext.Provider;

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}


const App: FunctionComponent<ClientOnlyProps> = ({contents}) => {
    console.log(contents)
    return (
        <AppProvider value={{
            sectionsText: contents.sectionsText,
            tournamentInfo: contents.tournamentInfo,
            rules: contents.rules,
            gallery: contents.gallery,
            carousel: contents.carousel,
        }}>
            <TooltipProvider>
                <motion.main
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                    id={"smooth-wrapper"} className={"w-screen h-screen overflow-x-hidden scroll-body"}>
                    <CallToAction/>
                    <History/>
                    <Participate/>
                    <Winners/>
                    <Cost/>
                    <Rules/>
                    <Gallery/>
                    <TournamentInfo/>
                    <Footer/>
                </motion.main>
            </TooltipProvider>
        </AppProvider>
    );
};

export default App;
