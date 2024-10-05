'use client'

import siteConfig from "@/config/site.json";
import Link from "next/link";
import { scrollToId } from "@/lib/utils/frontend/scrollTo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

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
        <Link href="#filtersSection" onClick={e => scrollToId(e as unknown as MouseEvent, "filtersSection")}>
          <Button className="cta-button text-white px-6 py-2 rounded-full w-full sm:w-auto" size="lg">
            Начать поиск <Search className="ml-2 h-4 w-4"/>
          </Button>
        </Link>
        <Link href="#featuresSection" onClick={e => scrollToId(e as unknown as MouseEvent, "featuresSection")}>
          <Button variant="outline"
                  className="bg-white text-primary hover:bg-primary hover:text-white border-white px-6 py-2 rounded-full w-full sm:w-auto"
                  size="lg">
            Узнать больше <ArrowRight className="ml-2 h-4 w-4"/>
          </Button>
        </Link>
      </div>
    </section>
  )
}
