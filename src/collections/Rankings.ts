import {CollectionConfig} from "payload";

export const Rankings: CollectionConfig = {
    slug: 'rankings',
    admin: {
        useAsTitle: 'playerName',
        defaultColumns: ['rank', 'playerName', 'eloRating', 'wins', 'season'],
    },
    fields: [
        {
            name: 'season',
            type: 'relationship',
            relationTo: 'seasons',
            required: true,
            hasMany: false,
        },
        {
            name: 'rank',
            type: 'number',
            required: true,
            min: 1,
        },
        {
            name: 'playerName',
            type: 'text',
            required: true,
            label: 'Player Name',
        },
        {
            name: 'eloRating',
            type: 'number',
            required: true,
            label: 'ELO Rating',
            defaultValue: 1000,
        },
        {
            name: 'wins',
            type: 'number',
            required: true,
            defaultValue: 0,
            min: 0,
            admin: {
                description: "Deprecated field"
            }
        },
        {
            name: 'losses',
            type: 'number',
            defaultValue: 0,
            min: 0,
            admin: {
                readOnly: true,
                description: "Deprecated field"
            }
        },
        {
            name: 'matches',
            type: 'number',
            defaultValue: 0,
            min: 0,
            admin: {
                readOnly: true,
                description: 'Deprecated field',
            },
        },
    ],
    hooks: {
        beforeChange: [
            ({data}) => {
                // Auto-calculate total matches
                if (data.wins !== undefined || data.losses !== undefined) {
                    data.matches = (data.wins || 0) + (data.losses || 0);
                } else {
                    data.wins = 0;
                    data.losses = 0;
                    data.matches = 0;
                }
                return data;
            },
        ],
    },
};
