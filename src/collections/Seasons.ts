import {CollectionConfig} from "payload";

export const Seasons: CollectionConfig = {
        slug: 'seasons',
        admin: {
            useAsTitle: 'name',
            defaultColumns: ['name', 'startDate', 'isActive'],
        },
        hooks: {
            afterDelete: [
                async ({doc, req}) => {
                    try {
                        const deletedRankings = await req.payload.delete({
                            collection: 'rankings',
                            where: {
                              season: { equals: doc.id } ,
                            },
                        });
                        req.payload.logger.info(
                            `Deleted ${deletedRankings.docs.length} ranking entries for season: ${doc.name}`
                        );
                    } catch (error) {
                        req.payload.logger.error(
                            `Error deleting rankings for season ${doc.id}: ${error}`
                        );
                    }
                },
            ],
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
    }
;