import "./App.css";
import Cost from "./sections/cost.tsx";
import Rules from "@/pages/sections/rules.tsx";
import CallToAction from "@/pages/sections/cta.tsx";
import Gallery from "./sections/gallery.tsx";
import TournamentInfo from "./sections/tournament-info.tsx";
import History from "@/pages/sections/history.tsx";
import Participate from "@/pages/sections/participate.tsx";
import Winners from "@/pages/sections/winners.tsx";

const App = () => {
  return (
    <main className={"w-screen h-screen overflow-x-hidden"}>
      <CallToAction />
      <History />
      <Participate />
      <Winners />
      <Cost />
      <Rules />
      <Gallery />
      <TournamentInfo />
    </main>
  );
};

export default App;
