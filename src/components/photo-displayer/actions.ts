import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import { Carousel, Gallery } from "@/payload-types.ts";

/**
 * Cached image loader for gallery / carousels collections.
 * folderName is included in the cache key via the key array,
 * so gallery and carousels are stored as separate entries.
 */
export default function loadImages(folderName: "gallery" | "carousels"): Promise<Gallery | Carousel> {
    return unstable_cache(
        async () => {
            const payload = await getPayload({ config });
            const images = await payload.find({
                collection: folderName,
                sort: ["-created_at"],
                limit: 1,
            });
            return images.docs[0];
        },
        [`images-${folderName}`],
        { tags: [`images-${folderName}`], revalidate: 3600 } // 1 hour — images change rarely
    )();
}
