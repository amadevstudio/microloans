import Root from "@/app/_components/root";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMfos } from "@/app/_queries/mfo";

export default async function Home() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ 'mfos' ],
    queryFn: getMfos
  })

  const specialOfferCount = Math.round(Math.random() * 4) + 3;

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Root specialOfferCount={specialOfferCount} />
      </HydrationBoundary>
    </main>
  )
}
