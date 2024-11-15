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
import {createContext, FunctionComponent, useContext, useEffect, useState} from "react";
import {ClientOnlyProps} from "@/app/client.tsx";
import {sectionsLinkedList} from "@/lib/utils.ts";

const AppContext = createContext<ClientOnlyProps | null>(null);
const AppProvider = AppContext.Provider;

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}

const App: FunctionComponent<ClientOnlyProps> = ({contents}) => {
    const [scrolling, setScrolling] = useState(false);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

    useEffect(() => {
        window.addEventListener("wheel", smoothScrollToSection);
        return () => window.removeEventListener("wheel", smoothScrollToSection);
    }, []);

    function smoothScrollToSection(event: WheelEvent) {
        if (scrolling) return;
        setScrolling(true);

        const target = event.deltaY > 0 ? "next" : "prev";
        const currentSection = sectionsLinkedList[currentSectionIndex];
        const targetSectionName = currentSection[target];

        if (!targetSectionName) {
            setScrolling(false);
            return;
        } else {
            setCurrentSectionIndex(target === "prev" ? currentSectionIndex - 1 : currentSectionIndex + 1);
        }

        const targetSectionAnchor = document.getElementById(targetSectionName);
        if (!targetSectionAnchor) {
            setScrolling(false);
            return;
        }

        targetSectionAnchor.scrollIntoView({behavior: "smooth"});

        setTimeout(() => {
            setScrolling(false);
        }, 1000);
    }

    return (
        <AppProvider value={{contents}}>
            <main className={"w-screen h-screen overflow-x-hidden"}>
                <CallToAction/>
                <History/>
                <Participate/>
                <Winners/>
                <Cost/>
                <Rules/>
                <Gallery/>
                <TournamentInfo/>
                <Footer/>
            </main>
        </AppProvider>
    );
};

export default App;
