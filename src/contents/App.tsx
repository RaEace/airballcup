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
import {ClientOnlyProps} from "@/app/client.tsx";

const AppContext = createContext<ClientOnlyProps | null>(null);
const AppProvider = AppContext.Provider;

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

const App: FunctionComponent<ClientOnlyProps> = ({ contents }) => {
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
