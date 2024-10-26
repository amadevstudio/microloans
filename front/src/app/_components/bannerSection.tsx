"use client";

import BannerClientBindings from "@/app/_components/bannerClientBindings";
import { useQuery } from "@tanstack/react-query";
import { WebsiteInfoQuery } from "@/app/_queries/gql/graphql";
import { getLandingPage } from "@/app/_queries/websiteInfo";
import Image from "next/image";

export default function BannerSection() {
  const { data } = useQuery<WebsiteInfoQuery>({
    queryKey: ["websiteInfo"],
    queryFn: getLandingPage,
  });
  const websiteInfo = data?.websiteInfo;

  return (
    <section className="text-center py-12 px-4 gradient-bg text-white rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none hidden md:block">
        <Image
          src="/images/monster.svg"
          alt="Background Logo"
          fill
          style={{ objectFit: "cover" }}
          loading="eager"
        />
      </div>
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
