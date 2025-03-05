import {ReactNode} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";

interface DetailsProps {
    title: string;
    children: ReactNode;
}

function Details({title, children}: DetailsProps) {
    return (
        <Accordion type={"single"} collapsible
                   className="data-[state=open]:smooth data-[state=closed]:animate-out bg-gray-800 p-4 text-white border border-[#414147] rounded">
            <AccordionItem value={"item-1"}>
                <AccordionTrigger>
                    <h2 className="font-display lg:text-subtitle-l text-subtitle-m font-extrabold uppercase">
                        {title}
                    </h2>
                </AccordionTrigger>
                <AccordionContent className={"normal-case font-text"}>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default Details;
