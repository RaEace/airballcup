"use client";

import {ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import "./App.css";

export function PageShell({children}: {children: ReactNode}) {
    const prefersReducedMotion = useReducedMotion();
    return (
        <TooltipProvider>
            <motion.main
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={prefersReducedMotion ? {duration: 0} : {duration: 0.5}}
                id={"smooth-wrapper"}
                className={"w-screen h-screen overflow-x-hidden scroll-body"}
            >
                {children}
                <Toaster/>
            </motion.main>
        </TooltipProvider>
    );
}
