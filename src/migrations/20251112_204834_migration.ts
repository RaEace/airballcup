import {MigrateDownArgs, MigrateUpArgs,} from '@payloadcms/db-mongodb'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
    // Remove wins, losses, matchesPlayed fields from rankings collection
    const rankings = await payload.find({
        collection: 'rankings',
    });
    for (const ranking of rankings.docs) {
        const updatedData: any = { ...ranking };
        delete updatedData.wins;
        delete updatedData.losses;
        delete updatedData.matchesPlayed;
        await payload.update({
            collection: 'rankings',
            id: ranking.id,
            data: updatedData,
        });
    }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
    // Add wins, losses, matchesPlayed fields back to rankings collection with default value 0
    const rankings = await payload.find({
        collection: 'rankings',
    });
    for (const ranking of rankings.docs) {
        const updatedData: any = { ...ranking };
        updatedData.wins = 0;
        updatedData.losses = 0;
        updatedData.matchesPlayed = 0;
        await payload.update({
            collection: 'rankings',
            id: ranking.id,
            data: updatedData,
        });
    }
}
