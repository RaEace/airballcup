import {z} from "zod";

const envSchema = z.object({
    CLIENT_EMAIL: z.string().email(),
    PRIVATE_KEY: z.string(),
    NEXT_PUBLIC_BASE_PATH: z.string(),
    GALLERY_DIR: z.string(),
    WINNERS_DIR: z.string(),
    RULES_DOC: z.string(),
    SECTIONS_DOC: z.string(),
    TOURNAMENT_INFO_DOC: z.string(),
    ELO_DOC: z.string(),
});

export const validateEnv = () => envSchema.safeParse({
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    GALLERY_DIR: process.env.GALLERY_DIR,
    WINNERS_DIR: process.env.WINNERS_DIR,
    RULES_DOC: process.env.RULES_DOC,
    SECTIONS_DOC: process.env.SECTIONS_DOC,
    TOURNAMENT_INFO_DOC: process.env.TOURNAMENT_INFO_DOC,
    ELO_DOC: process.env.ELO_DOC,
});

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}