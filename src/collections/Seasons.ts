import {CollectionConfig} from "payload";

export const Seasons: CollectionConfig = {
    slug: 'seasons',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'startDate', 'isActive'],
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Season Name',
        },
        {
            name: 'startDate',
            type: 'date',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayOnly',
                },
            },
        },
        {
            name: 'endDate',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayOnly',
                },
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
            label: 'Active Season',
        },
    ],
};