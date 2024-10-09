"use client"

import { useQuery } from "@tanstack/react-query";
import { getMfos } from "@/app/_queries/mfo";
import MfoCard from "@/app/_components/mfoCard";
import { MfosQuery } from "@/app/_queries/gql/graphql";

export default function MfoList() {
  const mfos = useQuery<MfosQuery>({
    queryKey: [ 'mfos' ],
    queryFn: getMfos
  });

  const mfosToShowTemporary = { data: { mfos: Array(10).fill(mfos?.data?.mfos[0]) as MfosQuery['mfos'] } };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mt-4">
      {mfosToShowTemporary?.data?.mfos.filter(mfo => mfo !== null).map((mfo, index) => (
        <MfoCard key={`mfo.documentId-${index}`} mfo={mfo}/>
      ))}
    </div>
  )
}
