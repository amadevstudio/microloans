import siteConfig from "@/config/site.json";
import Link from "next/link";
import { scrollToId } from "@/lib/utils/frontend/scrollTo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import BannerClientBindings from "@/app/_components/bannerClientBindings";

export default function BannerSection() {
  return (
    <section className="text-center py-12 px-4 gradient-bg text-white rounded-lg">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
        {siteConfig.title}
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
        {siteConfig.description}
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <BannerClientBindings/>
      </div>
    </section>
  )
}
