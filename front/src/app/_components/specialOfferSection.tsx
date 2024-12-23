"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { getSpecialOfferMfos } from "@/app/_queries/mfo";
import { MfosQuery } from "@/app/_queries/gql/graphql";
import MfoCard from "@/app/_components/mfoCard";
import React from "react";

export default function SpecialOfferSection() {
  const { data } = useQuery<MfosQuery>({
    queryKey: ["specialOfferMfos"],
    // queryFn: async () => await cmsGraphQLRequest(mfosQueryDocument)
    queryFn: getSpecialOfferMfos,
  });

  const mfos = data?.mfos;
  if (mfos === undefined || mfos.length === 0) {
    return <></>;
  }

  const specialOfferMfos: Exclude<typeof mfos, undefined> = mfos;

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
        Специальные предложения ({specialOfferMfos.length})
      </h2>
      <div className="px-10 py-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {specialOfferMfos
              .filter((mfo) => mfo !== null)
              .map((mfo, index) => (
                <CarouselItem
                  key={`${mfo.documentId}-${index}`}
                  className="lg:basis-1/2 xl:basis-1/3 2xl::basis-1/4"
                >
                  <div className="p-1">
                    <>{<MfoCard key={mfo.documentId} mfo={mfo} />}</>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
