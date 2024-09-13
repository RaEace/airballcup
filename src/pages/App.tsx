import "./App.css";
import Cost from "./sections/cost.tsx";
import Rules from "@/pages/sections/rules.tsx";
import CallToAction from "@/pages/sections/cta.tsx";
import Gallery from "./sections/gallery.tsx";

const App = () => {
  return (
    <main className={"w-screen min-h-screen overflow-x-hidden"}>
      <CallToAction />
      <Cost />
      <Rules />
      <Gallery />
    </main>
  );
};

export default App;
