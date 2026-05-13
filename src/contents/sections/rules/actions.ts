import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import _config from "@payload-config";
import { Rule } from "@/payload-types.ts";

const getRules = unstable_cache(
    async (): Promise<Rule[]> => {
        const payload = await getPayload({ config: _config });
        const rules = await payload.find({
            collection: "rules",
            sort: ["createdAt"],
        });
        return rules.docs;
    },
    ["rules"],
    { tags: ["rules"], revalidate: 3600 } // 1 hour — changes rarely
);

export default getRules;
