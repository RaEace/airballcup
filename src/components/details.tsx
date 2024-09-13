import {ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "./ui/button";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "./ui/collapsible";
import {ReactNode, useState} from "react";

interface DetailsProps {
  title: string;
  children: ReactNode;
}

function Details({ title, children }: DetailsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible className="bg-gray-800 p-4 text-white border border-[#414147] rounded">
      <div className="flex items-center justify-between">
        <h2 className="w-full text-2xl font-display">
          { title }
        </h2>

        <CollapsibleTrigger asChild>
          <Button onClick={() => setOpen(!open)} variant="ghost">
            {open ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 smooth">
        <p className="font-text text-sm">
          { children }
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default Details;
