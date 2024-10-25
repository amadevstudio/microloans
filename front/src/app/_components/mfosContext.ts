import { createContext } from "react";
import { MfosQuery } from "@/app/_queries/gql/graphql";

export default createContext<{
  allMfos: Exclude<MfosQuery["mfos"][0], null>[];
  filteredAndSortedMfos: Exclude<MfosQuery["mfos"][0], null>[];
  setMfosList: (
    filteredAndSortedMfos: Exclude<MfosQuery["mfos"][0], null>[],
  ) => void;
  filtersVisible: boolean;
  setFiltersVisible: (filterVisible: boolean) => void;
}>({
  allMfos: [],
  filteredAndSortedMfos: [],
  setMfosList: () => {},
  filtersVisible: false,
  setFiltersVisible: () => {},
});
