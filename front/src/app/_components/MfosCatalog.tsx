'use client'

import { useQuery } from "@tanstack/react-query";
import { getMfos } from "@/app/_queries/mfo";

export default function MfosCatalog() {
  const { data } = useQuery({
    queryKey: [ 'mfos' ],
    queryFn: getMfos
  });

  return (
    <>!{JSON.stringify(data, null, 2)}!</>
  )
}
