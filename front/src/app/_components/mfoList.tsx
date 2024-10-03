'use client'

import { useQuery } from "@tanstack/react-query";
import { getMfos } from "@/app/_queries/mfo";
import MfoCard from "@/app/_components/mfoCard";

export default function MfoList() {
  const mfos = useQuery({
    queryKey: [ 'mfos' ],
    queryFn: getMfos
  });

  const mfosToShowTemporary = { data: { mfos: Array(10).fill(mfos?.data?.mfos[0]) } };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mt-4">
      {mfosToShowTemporary?.data?.mfos.map(mfo => (
        <>{mfo !== null && <MfoCard key={mfo.documentId} mfo={mfo}/>}</>
      ))}
    </div>
  )
}
