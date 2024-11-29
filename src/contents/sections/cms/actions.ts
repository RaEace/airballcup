"use server";

import {CtaTextContent} from "@/app/client.tsx";
import GoogleService from "@/services/google.service.ts";
import {SECTIONS_TEXT, translateTomlToJson} from "@/lib/utils.ts";

async function getContentForSections(): Promise<{
    cta: CtaTextContent;
}> {
    const file = await GoogleService.instance.readGoogleDoc(SECTIONS_TEXT);

    if (!file) {
        throw new Error("No sections text found");
    }

    return translateTomlToJson<{ cta: CtaTextContent; }>(file);
}

export default getContentForSections;