import { createContext } from "react";
import { MfosQuery } from "@/app/_queries/gql/graphql";

export default createContext<{
  allMfos: Exclude<MfosQuery["mfos"][0], null>[];
  filteredAndSortedMfos: Exclude<MfosQuery["mfos"][0], null>[];
  setMfosList: (
    filteredAndSortedMfos: Exclude<MfosQuery["mfos"][0], null>[],
  ) => void;
}>({ allMfos: [], filteredAndSortedMfos: [], setMfosList: () => {} });
