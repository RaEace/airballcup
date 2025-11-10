// storage-adapter-import-placeholder
import {mongooseAdapter} from "@payloadcms/db-mongodb";
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import path from "path";
import {buildConfig} from "payload";
import {fileURLToPath} from "url";
import sharp from "sharp";

import {Users} from "./collections/Users";
import {Media} from "./collections/Media";
import {Rules} from "@/collections/Rules.ts";
import {gcsStorage} from "@payloadcms/storage-gcs";
import {Carousels} from "@/collections/Carousels.ts";
import {Gallery} from "@/collections/Gallery.ts";
import {Tournament} from "@/collections/Tournament.ts";
import {Rankings} from "./collections/Rankings";
import {Seasons} from "@/collections/Seasons.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: "Airball Cup - Admin",
      description: "Airball Cup Admin",
    },
    components: {
      graphics: {
        Logo: './components/Logo.tsx',
      },
    }
  },
  collections: [Users, Media, Rules, Carousels, Gallery, Tournament, Rankings, Seasons],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    gcsStorage({
      bucket: "airballcup",
      collections: {
        media: true,
      },
      options: {
        credentials: {
          client_email: process.env.CLIENT_EMAIL || "",
          private_key:
            process.env.PRIVATE_KEY.split(String.raw`\n`).join("\n") || "",
        },
        projectId: process.env.PROJECT_ID || "",
      },
    }),
  ],
});
