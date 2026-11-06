import {ReactNode} from "react";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import "./App.css";

export function PageShell({children}: {children: ReactNode}) {
    return (
        <TooltipProvider>
            <main
                id={"smooth-wrapper"}
                className={"w-screen h-screen overflow-x-hidden scroll-body animate-page-in"}
            >
                {children}
                <Toaster/>
            </main>
        </TooltipProvider>
    );
}
