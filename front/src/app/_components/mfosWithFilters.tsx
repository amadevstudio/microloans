"use client";

import FiltersSection from "@/app/_components/filtersSection";
import MfoList from "@/app/_components/mfoList";
import { useQuery } from "@tanstack/react-query";
import { MfosQuery } from "@/app/_queries/gql/graphql";
import { getMfos } from "@/app/_queries/mfo";
import { useState } from "react";
import MfosContext from "@/app/_components/mfosContext";

export default function MfosWithFilters() {
  const mfosResponse = useQuery<MfosQuery>({
    queryKey: ["mfos"],
    queryFn: getMfos,
  });

  const allMfos = (mfosResponse?.data?.mfos.filter((mfo) => mfo !== null) ??
    []) as Exclude<MfosQuery["mfos"][0], null>[];

  const [filteredAndSortedMfos, setFilteredAndSortedMfos] = useState(allMfos);

  function setMfosList(mfosQuery: Exclude<MfosQuery["mfos"][0], null>[]) {
    setFilteredAndSortedMfos(mfosQuery);
  }

  return (
    <>
      <MfosContext.Provider
        value={{ allMfos, filteredAndSortedMfos, setMfosList }}
      >
        <div id="filtersSection">
          <FiltersSection />
        </div>
        <MfoList />
      </MfosContext.Provider>
    </>
  );
}
