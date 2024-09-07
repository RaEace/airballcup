import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";

function Details() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible className="bg-gray-800 p-4 text-white border border-[#414147] rounded">
      <div className="flex items-center justify-between">
        <h2 className="w-full text-2xl font-display">LES TIRS</h2>

        <CollapsibleTrigger asChild>
          <Button onClick={() => setOpen(!open)} variant="ghost">
            {open ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2">
        <p className="font-text text-sm">
          Le tir direct dans une cup ne peut être intercepté par l’équipe
          adverse. Lorsqu’il est réussi, une seule cup est enlevée. Le rebond
          consiste à faire rebondir la balle sur la table avant qu’elle n’entre
          dans un gobelet adverse. Il peut être intercepté et compte double.
          S’il est réussi, 2 cups sont enlevées, la deuxième au choix du
          perdant. Attention, si une balle rebondit sur un gobelet et rentre
          dans un autre, il compte comme un tir direct.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default Details;
