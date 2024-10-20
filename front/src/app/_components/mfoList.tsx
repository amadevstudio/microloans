"use client";

import { useQuery } from "@tanstack/react-query";
import { getMfos } from "@/app/_queries/mfo";
import { MfosQuery } from "@/app/_queries/gql/graphql";
import MfoCard from "@/app/_components/mfoCard";

export default function MfoList() {
  const mfos = useQuery<MfosQuery>({
    queryKey: ["mfos"],
    queryFn: getMfos,
  });

  return (
    <section className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mt-4">
        {mfos?.data?.mfos
          .filter((mfo) => mfo !== null)
          .map((mfo, index) => (
            <MfoCard key={`mfo.documentId-${index}`} mfo={mfo} />
          ))}
      </div>
      <p className="text-muted-foreground">
        Информация об условиях представлена в ознакомительных целях и может
        отличаться от действительности. Уточняйте актуальные тарифы на сайте, по
        телефонам, в отделениях интересующего МФО.
      </p>
    </section>
  );
}
