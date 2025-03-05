import {CollectionConfig} from "payload";

export const Tournament: CollectionConfig = {
    slug: 'tournament',
    admin: {
        useAsTitle: 'date',
    },
    fields: [
        {
            name: 'badgeText',
            label: 'Badge Text',
            type: 'text',
            required: true,
        },
        {
            name: 'date',
            label: 'Date',
            type: 'date',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                }
            }
        },
        {
            name: 'registrationLink',
            label: 'Registration Link',
            type: 'text',
            required: true,
        },
    ],
}