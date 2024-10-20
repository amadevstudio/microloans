import SpecialOfferSection from "@/app/_components/specialOfferSection";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getMfos, getSpecialOfferMfos } from "@/app/_queries/mfo";
import { getAdditionalFilters, getObtainingMethods } from "@/app/_queries/dict";
import FeatureSection from "@/app/_components/featureSection";
import FAQSection from "@/app/_components/faqSection";
import BannerSection from "@/app/_components/bannerSection";
import { getLandingPage } from "@/app/_queries/websiteInfo";
import MfosWithFilters from "@/app/_components/mfosWithFilters";

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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MfosWithFilters />
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
