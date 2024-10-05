'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getMfos } from "@/app/_queries/mfo";
import { MfosQuery } from "@/app/_queries/gql/graphql";
import MfoCard from "@/app/_components/mfoCard";

export default function SpecialOfferSection({ specialOfferCount }: { specialOfferCount: number }) {
  const { data } = useQuery<MfosQuery>({
    queryKey: [ 'mfos' ],
    // queryFn: async () => await cmsGraphQLRequest(mfosQueryDocument)
    queryFn: getMfos
  })

  const mfos = data?.mfos;
  if (mfos === undefined || mfos.length === 0) {
    return <></>
  }


  const specialOfferMfos: Exclude<typeof mfos, undefined> = Array(specialOfferCount).fill(mfos[0]);

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">Специальные предложения ({specialOfferCount})</h2>
      <div className="px-10 py-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {specialOfferMfos.slice(0, specialOfferCount).map((mfo, index) => (
              <CarouselItem key={index} className="lg:basis-1/2 xl:basis-1/3 2xl::basis-1/4">
                <div className="p-1">
                  <>{mfo !== null && <MfoCard key={mfo.documentId} mfo={mfo}/>}</>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </div>
    </section>
  )
}
