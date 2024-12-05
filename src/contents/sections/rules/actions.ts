"use server";

import GoogleService from "@/services/google.service.ts";
import {RULES, translateTomlToJson} from "@/lib/utils.ts";
import {RulesContent} from "@/app/client.tsx";

async function getRules(): Promise<{ rules: RulesContent[] }> {
    const googleService = GoogleService.instance;
    const rules = await googleService.readGoogleDoc(RULES);

    if (!rules) {
        throw new Error("No rules found");
    }

    const config =  translateTomlToJson<{
        rules_configuration: {
            rules: { title: string; content: string; }[];
        };
    }>(rules);

    return config.rules_configuration;
}

export default getRules;