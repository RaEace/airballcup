"use server";

import {getPayload} from "payload";
import _config from '@payload-config';
import {Rule} from "@/payload-types.ts";

async function getRules(): Promise<Rule[]> {
    const payload = await getPayload({
        config: _config
    });
    const rules = await payload.find({collection: 'rules', sort: ['createdAt']});

    return rules.docs;
}

export default getRules;