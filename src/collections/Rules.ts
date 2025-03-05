import {CollectionConfig} from "payload";

export const Rules: CollectionConfig = {
    slug: 'rules',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            label: 'Content',
            type: 'richText',
        },
    ],
}