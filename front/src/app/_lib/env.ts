import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export default createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z.enum([ 'development', 'production' ]),
    CMS_URL: z.string().url().min(1),
    CMS_TOKEN: z.string().min(1)
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_CMS_URL: z.string().url().min(1),
    NEXT_PUBLIC_CMS_TOKEN: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    CMS_URL: process.env.CMS_URL,
    CMS_TOKEN: process.env.CMS_TOKEN,

    NEXT_PUBLIC_CMS_URL: process.env.NEXT_PUBLIC_CMS_URL,
    NEXT_PUBLIC_CMS_TOKEN: process.env.NEXT_PUBLIC_CMS_TOKEN,
  },
});
