"use client";

import BannerClientBindings from "@/app/_components/bannerClientBindings";
import { useQuery } from "@tanstack/react-query";
import { WebsiteInfoQuery } from "@/app/_queries/gql/graphql";
import { getWebsiteInfo } from "@/app/_queries/websiteInfo";

export default function BannerSection() {
  const { data } = useQuery<WebsiteInfoQuery>({
    queryKey: ["websiteInfo"],
    queryFn: getWebsiteInfo,
  });
  const websiteInfo = data?.websiteInfo;

  return (
    <section className="text-center py-12 px-4 gradient-bg text-white rounded-lg">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
        {websiteInfo?.bannerTitle}
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
        {websiteInfo?.bannerText}
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <BannerClientBindings />
      </div>
    </section>
  );
}
