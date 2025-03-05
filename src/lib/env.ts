import {z} from "zod";

const envSchema = z.object({
    CLIENT_EMAIL: z.string().email(),
    PRIVATE_KEY: z.string(),
    PROJECT_ID: z.string(),
    GALLERY_DIR: z.string(),
    WINNERS_DIR: z.string(),
    RULES_DOC: z.string(),
    SECTIONS_DOC: z.string(),
    TOURNAMENT_INFO_DOC: z.string(),
    ELO_DOC: z.string(),
    GTM_ID: z.string(),
});

export const validateEnv = () => envSchema.safeParse({
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    PRIVATE_KEY: process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n'),
    PROJECT_ID: process.env.PROJECT_ID,
    GALLERY_DIR: process.env.GALLERY_DIR,
    WINNERS_DIR: process.env.WINNERS_DIR,
    RULES_DOC: process.env.RULES_DOC,
    SECTIONS_DOC: process.env.SECTIONS_DOC,
    TOURNAMENT_INFO_DOC: process.env.TOURNAMENT_INFO_DOC,
    ELO_DOC: process.env.ELO_DOC,
    GTM_ID: process.env.GTM_ID,
});

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}