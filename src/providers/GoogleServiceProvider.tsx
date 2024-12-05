import GoogleService from "@/services/google.service.ts";
import {createContext, ReactNode, useContext} from "react";

interface StrapiProviderFn {
    api: GoogleService;
}

const StrapiContext = createContext<StrapiProviderFn | null>(null);

export function StrapiProvider({api, children}: {api: GoogleService; children: ReactNode}) {
    return <StrapiContext.Provider value={{api}}>{children}</StrapiContext.Provider>;
}

export function useStrapi() {
    const context = useContext(StrapiContext);
    if (!context) {
        throw new Error("useStrapi must be used within a GoogleServiceProvider");
    }
    return context.api;
}