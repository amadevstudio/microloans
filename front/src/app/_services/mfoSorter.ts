import { MfosQuery } from "@/app/_queries/gql/graphql";

export type FiltersPageState = {
  amount: string;
  term: string;
  obtainingMethod: string;
  additional: { [k: string]: boolean };
};

export type SortingMethod = "default" | "amount" | "term" | "interestRate";

function createMfoSorter() {
  return {
    sort: function sort(
      mfosToSort: Exclude<MfosQuery["mfos"][0], null>[],
      sortingMethod: SortingMethod,
      sortOrder: "asc" | "desc",
    ) {
      if (sortingMethod === "default") {
        return mfosToSort;
      }

      const sortByMap: {
        amount: { asc: "amount_from"; desc: "amount_to" };
        term: { asc: "term_from"; desc: "term_to" };
        interestRate: { [key in "asc" | "desc"]: "interest_rate" };
      } = {
        amount: {
          asc: "amount_from",
          desc: "amount_to",
        },
        term: {
          asc: "term_from",
          desc: "term_to",
        },
        interestRate: {
          asc: "interest_rate",
          desc: "interest_rate",
        },
      };

      const result = [...mfosToSort];

      result.sort((a, b) => {
        const aParam = a[sortByMap[sortingMethod][sortOrder]];
        const bParam = b[sortByMap[sortingMethod][sortOrder]];
        if (!aParam) return sortOrder === "asc" ? 1 : -1;
        if (!bParam) return sortOrder === "asc" ? -1 : 1;

        if (aParam < bParam) return sortOrder === "asc" ? -1 : 1;
        if (aParam > bParam) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      return result;
    },

    filter: function (
      filtersPageState: FiltersPageState,
      initial: Exclude<MfosQuery["mfos"][0], null>[],
    ) {
      let result = [...initial];

      // Filter by amount
      if (
        filtersPageState.amount !== undefined &&
        filtersPageState.amount !== ""
      ) {
        const amount = Number(filtersPageState.amount);
        result = result.filter(
          (mfo) =>
            (!mfo?.amount_from || mfo.amount_from <= amount) &&
            (!mfo?.amount_to || mfo.amount_to >= amount),
        );
      }

      // Filter by term
      if (filtersPageState.term !== undefined && filtersPageState.term !== "") {
        const term = Number(filtersPageState.term);
        result = result.filter(
          (mfo) =>
            (!mfo?.term_from || mfo.term_from <= term) &&
            (!mfo?.term_to || mfo.term_to >= term),
        );
      }

      // Filter by obtaining method
      if (filtersPageState.obtainingMethod !== "any") {
        result = result.filter((mfo) =>
          mfo?.obtaining_methods
            .map((om) => om?.documentId)
            .includes(filtersPageState.obtainingMethod),
        );
      }

      // Filter by additional filters
      const additionalForMfos = result.reduce(
        (acc: { [key in string]: string[] }, item) => {
          acc[item.documentId] = item.additional_filters
            .filter((filter) => filter !== null)
            .map((filter) => filter.documentId);
          return acc;
        },
        {},
      );
      const appliedAdditionalFilters = Object.entries(
        filtersPageState.additional,
      )
        .filter(([_, value]) => value)
        .map(([name, _]) => name);
      result = result.filter((mfo) =>
        appliedAdditionalFilters.every((af) =>
          additionalForMfos[mfo.documentId].includes(af),
        ),
      );

      return result;
    },
  };
}

export default createMfoSorter;
