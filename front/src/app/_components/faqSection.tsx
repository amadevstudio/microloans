"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getLandingPage } from "@/app/_queries/websiteInfo";
import { useQuery } from "@tanstack/react-query";
import { WebsiteInfoQuery } from "@/app/_queries/gql/graphql";

export default function FAQSection() {
  const { data } = useQuery<WebsiteInfoQuery>({
    queryKey: ["websiteInfo"],
    queryFn: getLandingPage,
  });

  const websiteInfo = data?.websiteInfo;

  return (
    <section className="py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
        Часто задаваемые вопросы
      </h2>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {websiteInfo?.faq?.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq?.title}
            </AccordionTrigger>
            <AccordionContent>{faq?.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
