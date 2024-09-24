'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getMfos } from "@/app/_queries/mfo";
import { MfosQuery } from "@/app/_queries/gql/graphql";
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

export default function SpecialOffer({ specialOfferCount }: { specialOfferCount: number }) {
  const { data } = useQuery<MfosQuery>({
    queryKey: [ 'mfos' ],
    // queryFn: async () => await cmsGraphQLRequest(mfosQueryDocument)
    queryFn: getMfos
  })

  const firstMfo = data?.mfos?.data;
  if (!firstMfo) {
    return <></>
  }


  const specialOfferMfos: Exclude<typeof firstMfo, undefined> = Array(specialOfferCount).fill(firstMfo[0]);

  return (
    <section className="container mx-auto px-10 py-6">
      <h2 className="text-2xl font-bold"><span className="text-project-accent">Специальные</span> предложения
        ({specialOfferCount})</h2>
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
              <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-xl font-semibold">{index + 1}. {mfo?.attributes?.name}</span>
                    </CardContent>
                  </Card>
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
