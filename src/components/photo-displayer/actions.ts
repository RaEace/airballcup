"use server";

import {getPayload} from "payload";
import config from "@payload-config";
import {Carousel, Gallery} from "@/payload-types.ts";

export default async function loadImages(folderName: "gallery" | "carousels"): Promise<Gallery | Carousel> {
    const payload = await getPayload({config});
    const images = await payload.find({
        collection: folderName, sort: ['-created_at'], limit: 1
    });
    return images.docs[0];
}