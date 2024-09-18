import Root from "@/app/_components/root";

export default async function Home() {

  // const queryClient = new QueryClient();
  //
  // await queryClient.prefetchQuery({
  //   queryKey: [ 'mfos' ],
  //   queryFn: getMfos
  // })
  //
  // <HydrationBoundary state={dehydrate(queryClient)}>
  //   <Mfos/>
  //   </HydrationBoundary>

  return (
    <main>
      <Root/>
    </main>
  )
}
