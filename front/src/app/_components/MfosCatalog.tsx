'use client'

import { useQuery } from "@tanstack/react-query";
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";
import { mfosQueryDocument } from "@/app/_queries/mfo";

export default function MfosCatalog() {
  const { data } = useQuery({
    queryKey: [ 'mfos' ],
    queryFn: async () => await cmsGraphQLRequest(mfosQueryDocument)
  });

  return (
    <>!{JSON.stringify(data, null, 2)}!</>
  )
}
