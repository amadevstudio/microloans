import SpecialOffer from "@/app/_components/specialOffer";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import { getMfos } from "@/app/_queries/mfo";
import Filters from "@/app/_components/filters";
import { getAdditionalFilters, getObtainingMethods } from "@/app/_queries/dict";

function getSpecialOfferCount() {
  return Math.round(Math.random() * 4) + 3;
}

export default async function Home() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ 'mfos' ],
    queryFn: getMfos
  })

  await queryClient.prefetchQuery({
    queryKey: [ 'obtainingMethods' ],
    queryFn: getObtainingMethods
  })

  await queryClient.prefetchQuery({
    queryKey: [ 'additionalFilters' ],
    queryFn: getAdditionalFilters
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

        <div>
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Available Microloans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg">Small Business Loan</h3>
                <p className="mt-2 text-gray-700">Amount: $1,000</p>
                <p className="text-gray-700">Term: 6 Months</p>
                <p className="text-gray-700">Interest Rate: 5%</p>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Apply Now</button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg">Startup Loan</h3>
                <p className="mt-2 text-gray-700">Amount: $5,000</p>
                <p className="text-gray-700">Term: 12 Months</p>
                <p className="text-gray-700">Interest Rate: 10%</p>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Apply Now</button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg">Expansion Loan</h3>
                <p className="mt-2 text-gray-700">Amount: $10,000</p>
                <p className="text-gray-700">Term: 24 Months</p>
                <p className="text-gray-700">Interest Rate: 15%</p>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Apply Now</button>
              </div>
            </div>
          </section>
        </div>
      </section>

      <footer className="bg-blue-600 text-white p-6 mt-10">
        <p className="text-center">© 2023 Microloans Inc. All rights reserved.</p>
      </footer>
    </main>
  )
}
