import { MetadataRoute } from "next";
import env from "@/app/_lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `${env.NEXT_PUBLIC_URL}/sitemap.xml`,
  };
}
