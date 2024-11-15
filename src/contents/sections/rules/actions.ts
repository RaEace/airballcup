"use server";

import GoogleService from "@/services/google.service.ts";
import {RULES} from "@/lib/utils.ts";

async function getRules() {
    const googleService = new GoogleService();
    const rules = await googleService.getFilesInFolder(RULES);

    if (!rules) return [];

    const formattedFileArray: {name: string; content: string;}[] = [];

    for await (const rule of rules) {
        const name = formatFileName(String(rule.name));
        const content = await googleService.readGoogleDoc(String(rule.id));

        if (!content) continue;
        
        formattedFileArray.push({name, content});
    }

    return formattedFileArray;
}

function formatFileName(fileName: string) {
    const withoutHyphens = fileName.replace(/-/g, " ");
    const withoutExtension = withoutHyphens.replace(".md", "");
    return withoutExtension.charAt(0).toUpperCase() + withoutExtension.slice(1);
}

export default getRules;