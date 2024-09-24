import SpecialOffer from "@/app/_components/specialOffer";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import MfosCatalog from "@/app/_components/MfosCatalog";
import { getMfos } from "@/app/_queries/mfo";

function getSpecialOfferCount() {
  return Math.round(Math.random() * 4) + 3;
}

export default async function Home() {

  const queryClient = new QueryClient();

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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MfosCatalog/>
      </HydrationBoundary>

      <Separator className="mx-auto container"/>

      <div className="container mx-auto p-6">
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Filter Microloans</h2>
          <div className="flex flex-wrap mt-4">
            <div className="mr-4">
              <label htmlFor="amount" className="block text-gray-700">Amount:</label>
              <select id="amount" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">All</option>
                <option value="1000">Up to $1,000</option>
                <option value="5000">Up to $5,000</option>
                <option value="10000">Up to $10,000</option>
              </select>
            </div>
            <div className="mr-4">
              <label htmlFor="term" className="block text-gray-700">Term:</label>
              <select id="term" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">All</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
              </select>
            </div>
            <div>
              <label htmlFor="interest" className="block text-gray-700">Interest Rate:</label>
              <select id="interest" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">All</option>
                <option value="5">Up to 5%</option>
                <option value="10">Up to 10%</option>
                <option value="15">Up to 15%</option>
              </select>
            </div>
          </div>
        </section>

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

      <footer className="bg-blue-600 text-white p-6 mt-10">
        <p className="text-center">© 2023 Microloans Inc. All rights reserved.</p>
      </footer>
    </main>
  )
}
