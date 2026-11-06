import {ReactNode} from "react";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import "./App.css";

export function PageShell({children}: {children: ReactNode}) {
    return (
        <TooltipProvider>
            <main className={"w-full scroll-body animate-page-in"}>
                {children}
                <Toaster/>
            </main>
        </TooltipProvider>
    );
}
