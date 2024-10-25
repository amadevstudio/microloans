"use client";

import FiltersSection from "@/app/_components/filtersSection";
import MfoList from "@/app/_components/mfoList";
import { useQuery } from "@tanstack/react-query";
import { MfosQuery } from "@/app/_queries/gql/graphql";
import { getMfos } from "@/app/_queries/mfo";
import { useState } from "react";
import MfosContext from "@/app/_components/mfosContext";
import Link from "next/link";
import { scrollToId } from "@/lib/utils/frontend/scrollTo";
import { Button } from "@/components/ui/button";

export default function MfosWithFilters() {
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

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
        value={{
          allMfos,
          filteredAndSortedMfos,
          setMfosList,
          filtersVisible,
          setFiltersVisible,
        }}
      >
        <div id="filtersSection">
          <FiltersSection />
        </div>
        <section className="space-y-2" id="mfosListSection">
          {filteredAndSortedMfos.length == 0 ? (
            <div className="text-center">
              Результаты не найдены
              <br />
              <Link
                href="#filtersSection"
                onClick={(e) => {
                  setFiltersVisible(true);
                  scrollToId("filtersSection", {
                    event: e as unknown as MouseEvent,
                  });
                }}
              >
                <Button className="mt-1.5">измените фильтрацию</Button>
              </Link>
            </div>
          ) : (
            <MfoList />
          )}
        </section>
      </MfosContext.Provider>
    </>
  );
}
