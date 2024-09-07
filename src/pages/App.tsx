import { Button } from "@/components/ui/button";
import "./App.css";
import Details from "@/components/details";

const App = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-display">THIS IS A BIG TITLE</h1>
      <h2 className="text-2xl font-display">THIS IS A SMALLER TITLE</h2>
      <p className="font-text">This is a paragraph</p>

      <div className="flex items-center justify-evenly">
        {[
          "primary",
          "secondary",
          "destructive",
          "outline",
          "warning",
          "ghost",
          "link",
        ].map((variant) => (
          <Button key={variant} variant={variant} size="default">
            {variant}
          </Button>
        ))}
      </div>

      <div className="mx-auto w-1/2">
        <Details />
      </div>
    </div>
  );
};

export default App;
