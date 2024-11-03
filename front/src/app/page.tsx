import SpecialOfferSection from "@/app/_components/specialOfferSection";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getMfos, getSpecialOfferMfos } from "@/app/_queries/mfo";
import { getAdditionalFilters, getObtainingMethods } from "@/app/_queries/dict";
import BannerSection from "@/app/_components/bannerSection";
import { getLandingPage } from "@/app/_queries/websiteInfo";
import FinancialLiteracy from "@/app/_components/financialLiteracy";
import dynamic from "next/dynamic";

const MfosWithFilters = dynamic(
  () => import("@/app/_components/mfosWithFilters"),
);
const FeatureSection = dynamic(
  () => import("@/app/_components/featureSection"),
);
const FAQSection = dynamic(() => import("@/app/_components/faqSection"));

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

      <FinancialLiteracy />

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
