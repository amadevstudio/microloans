import SpecialOffer from "@/app/_components/specialOffer";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { getMfos, getSpecialOfferMfos } from "@/app/_queries/mfo";
import Filters from "@/app/_components/filters";
import { getAdditionalFilters, getObtainingMethods } from "@/app/_queries/dict";
import MfoList from "@/app/_components/mfoList";
import siteConfig from '@/config/site.json'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

function getSpecialOfferCount() {
  return Math.round(Math.random() * 4) + 3;
}

export default async function Home() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ 'specialOfferMfos' ],
    queryFn: getSpecialOfferMfos
  })

  await queryClient.prefetchQuery({
    queryKey: [ 'obtainingMethods' ],
    queryFn: getObtainingMethods
  })

  await queryClient.prefetchQuery({
    queryKey: [ 'additionalFilters' ],
    queryFn: getAdditionalFilters
  })

  await queryClient.prefetchQuery({
    queryKey: [ 'mfos' ],
    queryFn: getMfos
  })

  return (
    <div className="space-y-12">
      <section className="text-center py-12 px-4 gradient-bg text-white rounded-lg">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          {siteConfig.title}
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          {siteConfig.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="#all-microloans">
            <Button className="cta-button text-white px-6 py-2 rounded-full w-full sm:w-auto" size="lg">
              Начать поиск <Search className="ml-2 h-4 w-4"/>
            </Button>
          </Link>
          <Link href="#why-choose-us">
            <Button variant="outline"
                    className="bg-white text-primary hover:bg-primary hover:text-white border-white px-6 py-2 rounded-full w-full sm:w-auto"
                    size="lg">
              Узнать больше <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </Link>
        </div>
      </section>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <SpecialOffer specialOfferCount={getSpecialOfferCount()}/>
      </HydrationBoundary>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Filters/>
      </HydrationBoundary>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MfoList/>
      </HydrationBoundary>
    </div>
  )
}
