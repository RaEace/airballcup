"use server";

import {GALLERY, WINNERS} from "@/lib/utils.ts";
import GoogleService from "@/services/google.service.ts";

export default async function loadImages(folderName: "gallery" | "winners") {
    const googleService = GoogleService.instance;
    const folder = await googleService.getFilesInFolder(folderName === "gallery" ? GALLERY : WINNERS);

    if (!folder) return [];

    return folder.map((file) => ({
        id: String(file.id),
        name: String(file.name),
        url: `https://storage.cloud.google.com/airballcup_cms/${folderName}/${String(file.id)}?authuser=2`,
    }));
}