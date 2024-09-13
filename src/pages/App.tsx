import "./App.css";
import Cost from "./home/sections/cost.tsx";
import Rules from "@/pages/home/sections/rules.tsx";
import CallToAction from "@/pages/home/sections/cta.tsx";

const App = () => {
  return (
    <main className={"w-screen min-h-screen overflow-x-hidden"}>
        <CallToAction />
        <Cost />
        <Rules />
    </main>
  );
};

export default App;
