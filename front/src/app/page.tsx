import SpecialOfferSection from "@/app/_components/specialOfferSection";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getMfos, getSpecialOfferMfos } from "@/app/_queries/mfo";
import FiltersSection from "@/app/_components/filtersSection";
import { getAdditionalFilters, getObtainingMethods } from "@/app/_queries/dict";
import MfoList from "@/app/_components/mfoList";
import FeatureSection from "@/app/_components/featureSection";
import FAQSection from "@/app/_components/faqSection";
import BannerSection from "@/app/_components/bannerSection";
import { getLandingPage } from "@/app/_queries/websiteInfo";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["specialOfferMfos"],
    queryFn: getSpecialOfferMfos,
  });

  await queryClient.prefetchQuery({
    queryKey: ["obtainingMethods"],
    queryFn: getObtainingMethods,
  });

  await queryClient.prefetchQuery({
    queryKey: ["additionalFilters"],
    queryFn: getAdditionalFilters,
  });

  await queryClient.prefetchQuery({
    queryKey: ["mfos"],
    queryFn: getMfos,
  });

  await queryClient.prefetchQuery({
    queryKey: ["websiteInfo"],
    queryFn: getLandingPage,
  });

  return (
    <div className="space-y-12">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BannerSection />
      </HydrationBoundary>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <SpecialOfferSection />
      </HydrationBoundary>

      <div id="filtersSection">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FiltersSection />
        </HydrationBoundary>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MfoList />
      </HydrationBoundary>

      <div id="featuresSection">
        <FeatureSection />
      </div>

      {/*<TestimonialSection/>*/}

      <HydrationBoundary state={dehydrate(queryClient)}>
        <FAQSection />
      </HydrationBoundary>
    </div>
  );
}
