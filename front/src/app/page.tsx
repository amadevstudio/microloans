import SpecialOfferSection from "@/app/_components/specialOfferSection";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMfos, getSpecialOfferMfos } from "@/app/_queries/mfo";
import FiltersSection from "@/app/_components/filtersSection";
import { getAdditionalFilters, getObtainingMethods } from "@/app/_queries/dict";
import MfoList from "@/app/_components/mfoList";
import FeatureSection from "@/app/_components/featureSection";
import FAQSection from "@/app/_components/faqSection";
import BannerSection from "@/app/_components/bannerSection";

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
      <BannerSection/>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <SpecialOfferSection specialOfferCount={getSpecialOfferCount()}/>
      </HydrationBoundary>

      <div id="filters">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FiltersSection/>
        </HydrationBoundary>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MfoList/>
      </HydrationBoundary>

      <div id="why-choose-us">
        <FeatureSection/>
      </div>

      {/*<TestimonialSection/>*/}

      <FAQSection/>
    </div>
  )
}
