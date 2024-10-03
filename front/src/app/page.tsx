import SpecialOffer from "@/app/_components/specialOffer";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { getMfos, getSpecialOfferMfos } from "@/app/_queries/mfo";
import Filters from "@/app/_components/filters";
import { getAdditionalFilters, getObtainingMethods } from "@/app/_queries/dict";
import MfoList from "@/app/_components/mfoList";

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
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Найдите Идеальный Микрозайм
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Сравните предложения от ведущих финансовых организаций и получите
          лучшие условия для ваших потребностей.
        </p>
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
