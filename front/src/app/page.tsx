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
    <main>
      <header className="px-10 py-6 container mx-auto">
        <h1 className="text-3xl font-bold text-project-primary">Микрозаймы</h1>
        <p className="mt-2">Небольшие займы для больших идей</p>
      </header>

      <Separator className="mx-auto container"/>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <SpecialOffer specialOfferCount={getSpecialOfferCount()}/>
      </HydrationBoundary>

      <Separator className="mx-auto container"/>

      <section className="container px-10 py-6 mx-auto flex flex-col gap-y-10">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Filters/>
        </HydrationBoundary>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <MfoList/>
        </HydrationBoundary>
      </section>

      <footer className="bg-blue-600 text-white p-6 mt-10">
        <p className="text-center">© 2023 Microloans Inc. All rights reserved.</p>
      </footer>
    </main>
  )
}
