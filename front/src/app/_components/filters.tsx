'use client'

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { t } from "@/lib/i18n/t";
import { z } from "zod";
import { cn } from "@/lib/utils";
import styles from './filters.module.scss';

type SortingMethod = 'default' | 'amount' | 'term' | 'interestRate';

const fieldError = t([ "fields", "errors", "error" ]);
const biggerThatZeroInputSchema = z.coerce.number({ message: fieldError }).min(0).optional();

const FiltersStateObject = z.object({
  amount: biggerThatZeroInputSchema,
  term: biggerThatZeroInputSchema,
  obtainingMethod: z.enum([ 'any', 'card', 'cash' ]).optional(),
  additional: z.object({
    firstFree: z.boolean().optional(),
    momentDecision: z.boolean().optional(),
    withoutIncomeCertificate: z.boolean().optional(),
  }),
})
type FiltersPageState = {
  amount: string;
  term: string;
  obtainingMethod: string;
  additional: {
    firstFree: boolean;
    momentDecision: boolean;
    withoutIncomeCertificate: boolean;
  }
}

export default function Filters() {
  const [ sortingMethod, setSortingMethod ] = useState<SortingMethod>('default');

  const [ filtersVisible, setFiltersVisible ] = useState<boolean>(false);
  const [ filtersPageState, setFiltersPageState ] = useState<FiltersPageState>({
    amount: "",
    term: "",
    obtainingMethod: "any",
    additional: {
      firstFree: false,
      momentDecision: false,
      withoutIncomeCertificate: false,
    }
  });

  const [ errorsPage, setErrorsPage ] =
    useState<Partial<Record<keyof FiltersPageState, string>>>({});

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

  function applyFilters() {
    if (!validateState()) return;

    alert("Filters was updated!")
  }

  type PlainKeys<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
  }[keyof T];
  const plainFields: { key: PlainKeys<FiltersPageState>; placeholder: string; header: string; }[] = [
    { key: 'amount', placeholder: "В рублях", header: "Сумма займа" },
    { key: 'term', placeholder: "В днях", header: "Срок займа" },
  ];

  return (
    <div>
      <div className="mb-4 flex gap-5 flex-wrap">
        <Select value={sortingMethod} onValueChange={(value) => setSortingMethod(value as SortingMethod)}>
          <SelectTrigger className="w-[180px]">
            <Image width="20" height="20" alt="Сортировка"
                   src="/icons/svg/sort.svg"/>
            {sortingMethod === "default" ? <p>Сортировка</p> : <SelectValue placeholder="Сортировка"></SelectValue>}
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

        <Button className="bg-project-primary" onClick={() => setFiltersVisible(!filtersVisible)}>Показать фильтры</Button>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 "
          + "rounded-2xl border-2 p-8 pb-0 "
          + "bg-gradient-to-br from-[#fbfbfb] to-white shadow-md"
          + "transition duration-200",
          styles.filtersGrid,
          !filtersVisible && "h-0 overflow-hidden p-0"
        )}>
        {plainFields.map(field => (
          <div key={field.key} className="flex flex-col min-h-6">
            <Label htmlFor={field.key} className="mb-1.5">{field.header}</Label>
            <Input id={field.key}
                   className={cn("w-full", errorsPage[field.key] && "text-red-500")} type="text"
                   placeholder={field.placeholder} value={filtersPageState[field.key]}
                   onChange={event => setFiltersPageState(prev => ({ ...prev, [field.key]: event.target.value }))}
                   onBlur={validateState}/>
            <span className="text-red-500">{errorsPage[field.key]}</span>
          </div>
        ))}

        <div className="flex flex-col">
          <Label className="mb-1.5">Способ получения</Label>
          <Select value={filtersPageState.obtainingMethod}
                  onValueChange={(value: Exclude<FiltersPageState['obtainingMethod'], undefined>) => setFiltersPageState(prev => ({
                    ...prev,
                    obtainingMethod: value
                  }))}>
            <SelectTrigger className="">
              <SelectValue placeholder="Выберите"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="any">Любой</SelectItem>
                <SelectItem value="card">На карту</SelectItem>
                <SelectItem value="cash">Наличными</SelectItem>
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
              {(Object.entries(filtersPageState.additional) as [keyof FiltersPageState['additional'], FiltersPageState['additional'][keyof FiltersPageState['additional']]][]).map(([ p, v ]) => (
                <Label key={p} className="flex items-center space-x-2 text-sm p-2 rounded hover:bg-project-accent">
                  <Checkbox
                    checked={v}
                    id={p}
                    onCheckedChange={checked => {
                      setFiltersPageState(prev => ({
                        ...prev,
                        additional: {
                          ...prev.additional,
                          [p]: checked === true
                        }
                      }));
                    }}
                  />
                  <p>{t([ "filters", "additional", p ])}</p>
                </Label>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Button type="submit" className="w-full mt-[1.25rem] self-end bg-project-primary" onClick={applyFilters}>
            Показать
          </Button>
        </div>
      </div>
    </div>
  )
}
