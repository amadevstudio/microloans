"use client"

import Link from "next/link";
import { scrollToId } from "@/lib/utils/frontend/scrollTo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

export default function BannerClientBindings() {
  return (
    <>
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
    </>
  )
}
