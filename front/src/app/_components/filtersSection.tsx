"use client";

import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { t } from "@/lib/i18n/t";
import { z } from "zod";
import { cn } from "@/lib/utils";
import styles from "./filters.module.scss";
import { useQuery } from "@tanstack/react-query";
import {
  AdditionalFiltersQuery,
  MfosQuery,
  ObtainingMethodsQuery,
} from "@/app/_queries/gql/graphql";
import { getAdditionalFilters, getObtainingMethods } from "@/app/_queries/dict";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import MfosContext from "@/app/_components/mfosContext";
import { scrollToId } from "@/lib/utils/frontend/scrollTo";

type SortingMethod = "default" | "amount" | "term" | "interestRate";

const fieldError = t("fields", "errors", "error");
const biggerThatZeroInputSchema = z.coerce
  .number({ message: fieldError })
  .min(0)
  .optional();

const FiltersStateObject = z.object({
  amount: biggerThatZeroInputSchema,
  term: biggerThatZeroInputSchema,
  obtainingMethod: z.string(),
  additional: z.record(z.boolean()),
});
type FiltersPageState = {
  amount: string;
  term: string;
  obtainingMethod: string;
  additional: { [k: string]: boolean };
};

function sort(
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
}

export default function FiltersSection() {
  const {
    allMfos,
    filteredAndSortedMfos,
    setMfosList,
    filtersVisible,
    setFiltersVisible,
  } = useContext(MfosContext);

  const obtainingMethodsResult = useQuery<ObtainingMethodsQuery>({
    queryKey: ["obtainingMethods"],
    queryFn: getObtainingMethods,
  });

  const additionalFiltersResult = useQuery<AdditionalFiltersQuery>({
    queryKey: ["additionalFilters"],
    queryFn: getAdditionalFilters,
  });

  const [sortingMethod, setSortingMethod] = useState<SortingMethod>("default");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filtersPageState, setFiltersPageState] = useState<FiltersPageState>({
    amount: "",
    term: "",
    obtainingMethod: "any",
    additional:
      additionalFiltersResult?.data?.additionalFilters.reduce(
        (acc: { [k: string]: boolean }, obj) => {
          obj?.documentId !== undefined && (acc[obj?.documentId] = false);
          return acc;
        },
        {},
      ) ?? {},
  });

  const [errorsPage, setErrorsPage] = useState<
    Partial<Record<keyof FiltersPageState, string>>
  >({});

  function validateState() {
    const fieldErrors: Partial<Record<keyof FiltersPageState, string>> = {};
    setErrorsPage(fieldErrors);

    const dataParseResult = FiltersStateObject.safeParse(filtersPageState);
    if (!dataParseResult.success) {
      dataParseResult.error.errors.forEach((error) => {
        const path = error.path[0] as keyof FiltersPageState;
        fieldErrors[path] = error.message;
      });

      setErrorsPage(fieldErrors);
      return false;
    }

    return true;
  }

  function applyFilters({
    newSortingMethod,
    newSortOrder,
  }: {
    newSortingMethod?: SortingMethod;
    newSortOrder?: typeof sortOrder;
  } = {}) {
    if (!validateState()) return;

    let result = [...allMfos];

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
    const appliedAdditionalFilters = Object.entries(filtersPageState.additional)
      .filter(([_, value]) => value)
      .map(([name, _]) => name);
    result = result.filter((mfo) =>
      appliedAdditionalFilters.every((af) =>
        additionalForMfos[mfo.documentId].includes(af),
      ),
    );

    // Sort
    result = sort(
      result,
      newSortingMethod ?? sortingMethod,
      newSortOrder ?? sortOrder,
    );

    setMfosList(result);

    scrollToId("mfosListSection");
  }

  function setSortingMethodAndSort(newSortingMethod: SortingMethod) {
    setSortingMethod(newSortingMethod);
    if (newSortingMethod === "default") {
      applyFilters({ newSortingMethod });
      return;
    }

    setMfosList(sort(filteredAndSortedMfos, newSortingMethod, sortOrder));
  }

  function setSortOrderAndSort(newSortOrder: typeof sortOrder) {
    setSortOrder(newSortOrder);
    setMfosList(sort(filteredAndSortedMfos, sortingMethod, newSortOrder));
  }

  type PlainKeys<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
  }[keyof T];
  const plainFields: {
    key: PlainKeys<FiltersPageState>;
    placeholder: string;
    header: string;
  }[] = [
    { key: "amount", placeholder: "В рублях", header: "Сумма займа" },
    { key: "term", placeholder: "В днях", header: "Срок займа" },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Все Микрозаймы</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={sortingMethod}
              onValueChange={(value) =>
                setSortingMethodAndSort(value as SortingMethod)
              }
            >
              <SelectTrigger className="w-[180px]">
                <Image
                  width="16"
                  height="16"
                  alt="Сортировка"
                  className="text-primary dark:invert"
                  src="/icons/svg/sort.svg"
                />
                {sortingMethod === "default" ? (
                  <p>Сортировка</p>
                ) : (
                  <SelectValue placeholder="Сортировка"></SelectValue>
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Сортировка</SelectLabel>
                  <SelectItem value="default">по умолчанию</SelectItem>
                  <SelectItem value="amount">по сумме</SelectItem>
                  <SelectItem value="term">по сроку</SelectItem>
                  <SelectItem value="interestRate">по ставке</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setSortOrderAndSort(sortOrder === "asc" ? "desc" : "asc")
              }
            >
              {sortOrder === "asc" ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            <Button onClick={() => setFiltersVisible(!filtersVisible)}>
              <Filter className="h-4 w-4" />
              <p className="ml-4 hidden sm:block">Показать фильтры</p>
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 " +
              "rounded-2xl border-2 p-8 pb-0 " +
              "bg-gradient-to-br from-primary/5 to-background shadow-md" +
              "transition duration-200",
            styles.filtersGrid,
            !filtersVisible && "h-0 overflow-hidden p-0",
          )}
        >
          {plainFields.map((field) => (
            <div key={field.key} className="flex flex-col min-h-6">
              <Label htmlFor={field.key} className="mb-1.5">
                {field.header}
              </Label>
              <Input
                id={field.key}
                className={cn(
                  "w-full",
                  errorsPage[field.key] && "text-red-500",
                )}
                type="text"
                placeholder={field.placeholder}
                value={filtersPageState[field.key]}
                onChange={(event) =>
                  setFiltersPageState((prev) => ({
                    ...prev,
                    [field.key]: event.target.value,
                  }))
                }
                onBlur={validateState}
              />
              <span className="text-red-500">{errorsPage[field.key]}</span>
            </div>
          ))}

          <div className="flex flex-col">
            <Label className="mb-1.5">Способ получения</Label>
            <Select
              value={filtersPageState.obtainingMethod}
              onValueChange={(value) =>
                setFiltersPageState((prev) => ({
                  ...prev,
                  obtainingMethod: value,
                }))
              }
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Выберите"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="any">
                    {t("filters", "obtainingMethods", "any")}
                  </SelectItem>
                  {obtainingMethodsResult.data?.obtainingMethods
                    .filter((om) => om !== null)
                    .map((om) => (
                      <SelectItem key={om.documentId} value={om.documentId}>
                        {om.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex flex-col">
                  <Label className="mb-1.5">Дополнительные условия</Label>
                  <Button variant="outline">Выберите</Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2">
                {additionalFiltersResult?.data?.additionalFilters.map(
                  (f) =>
                    f !== null && (
                      <Label
                        key={f.documentId}
                        className="flex items-center space-x-2 text-sm p-2 rounded hover:bg-project-accent"
                      >
                        <Checkbox
                          checked={filtersPageState.additional[f.documentId]}
                          id={f.documentId}
                          onCheckedChange={(checked) => {
                            setFiltersPageState((prev) => ({
                              ...prev,
                              additional: {
                                ...prev.additional,
                                [f.documentId]: checked === true,
                              },
                            }));
                          }}
                        />
                        <p>{f.name}</p>
                      </Label>
                    ),
                )}
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full mt-[1.25rem] self-end"
              onClick={() => applyFilters()}
            >
              Показать
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
