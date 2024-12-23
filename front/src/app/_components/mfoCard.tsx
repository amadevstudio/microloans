import { MfosQuery } from "@/app/_queries/gql/graphql";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, Calendar, Info, Percent, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tn } from "@/lib/i18n/t";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import Markdown from "@/components/markdown";
import Image from "next/image";
import env from "@/app/_lib/env";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { reachGoal } from "@/lib/analytics/ymetrics";

// Simple hash function to convert string to number
const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

function checkOneOfPairNumber(
  a: null | undefined | number,
  b: null | undefined | number,
): boolean {
  return (a !== null && a !== undefined) || (b !== null && b !== undefined);
}

export default function MfoCard({
  mfo,
}: {
  mfo: Exclude<MfosQuery["mfos"][0], null>;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        {mfo.rich_description ? (
          <div>
            <Dialog>
              <DialogTrigger className="w-full">
                <Header mfo={mfo} />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[100vh] sm:max-h-[80vh] py-16 overflow-y-auto">
                <DialogHeader>
                  <div className="mt-4 mb-2">
                    <MfoImage mfo={mfo} />
                  </div>
                  <DialogTitle>{mfo.name}</DialogTitle>
                  <DialogDescription className="text-[0.7rem]">
                    Предложение микрозайма от посредника (реклама)
                  </DialogDescription>
                </DialogHeader>
                <MfoContent mfo={mfo} />
                <p>
                  <u>Сообщение от компании-микрозайма:</u>
                </p>
                <Markdown markdownString={mfo.rich_description} />
                <DialogFooter className="gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Закрыть
                    </Button>
                  </DialogClose>
                  <SubmitApplication
                    partnerLink={mfo.partner_link}
                    mfoId={mfo.documentId}
                  />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Header mfo={mfo} />
        )}
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-grow">
        <MfoContent mfo={mfo} />
      </CardContent>
    </Card>
  );
}

function MfoImage({ mfo }: { mfo: Exclude<MfosQuery["mfos"][0], null> }) {
  return (
    <AspectRatio ratio={16 / 9}>
      {mfo.Logo?.svg ? (
        <Image
          className="bg-white p-2 rounded-md object-contain w-full h-full"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(mfo.Logo?.svg)}`}
          alt={mfo.name}
          fill
          loading="lazy"
        />
      ) : mfo.Logo?.file?.url ? (
        <Image
          className="bg-white p-2 rounded-md object-contain w-full h-full"
          src={`${env.NEXT_PUBLIC_CMS_BASE_URL}${mfo.Logo?.file?.url}`}
          alt={mfo.name}
          fill
          loading="lazy"
        />
      ) : (
        <Zap className="w-full h-full" />
      )}
    </AspectRatio>
  );
}

function Header({ mfo }: { mfo: Exclude<MfosQuery["mfos"][0], null> }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center space-y-4",
        !mfo.rich_description && "cursor-auto",
      )}
      role="button"
    >
      <div className="w-full">
        <MfoImage mfo={mfo} />
      </div>
      <div className={mfo.rich_description ? "cursor-help" : undefined}>
        <CardTitle className="text-primary text-base">
          {mfo.name}{" "}
          {mfo.rich_description && (
            <>
              {" "}
              <Info className="w-4 inline-block" />
            </>
          )}
        </CardTitle>
        <CardDescription className="text-[0.7rem]">
          Предложение микрозайма от посредника (реклама)
        </CardDescription>
      </div>
    </div>
  );
}

function SubmitApplication({
  partnerLink,
  mfoId,
  potentialIncome,
}: {
  partnerLink: string;
  mfoId: string;
  potentialIncome?: number;
}) {
  return (
    <Link href={partnerLink} target="_blank">
      <Button
        onClick={() =>
          reachGoal(
            `submit-application-button-${mfoId}`,
            potentialIncome
              ? { order_price: potentialIncome, currency: "RUB" }
              : {},
          )
        }
        className="w-full cta-button text-white text-sm"
      >
        Открыть предложение
      </Button>
    </Link>
  );
}

function freePeriod(mfo: Exclude<MfosQuery["mfos"][0], null>) {
  const forNew =
    mfo?.additional_filters.find((af) => af?.code === "firstFree") !==
    undefined;

  const forAll =
    mfo?.additional_filters.find((af) => af?.code === "freePeriod") !==
    undefined;

  if (forNew && !forAll) {
    return "new";
  }
}

function InterestFreeTerm({
  mfo,
}: {
  mfo: Exclude<MfosQuery["mfos"][0], null>;
}) {
  return (
    <>
      {mfo.interest_free_term && (
        <div>
          • {mfo.interest_free_term}{" "}
          {tn(mfo.interest_free_term, "mfo", "card", "interest", "freeTerm")}{" "}
          бесплатно
          {freePeriod(mfo) === "new" ? " для новых клиентов" : ""}
        </div>
      )}
    </>
  );
}

function FullCreditPrice({
  mfo,
}: {
  mfo: Exclude<MfosQuery["mfos"][0], null>;
}) {
  return (
    <>
      {(mfo.interest_rate || mfo.interest_rate === 0) && (
        <div>
          • ПСК {freePeriod(mfo) !== undefined ? "0-" : ""}
          {mfo.full_credit_price_to
            ? mfo.full_credit_price_to
            : Math.round(mfo.interest_rate * 365 * 1000) / 1000}
          %
        </div>
      )}
    </>
  );
}

function MfoContent({ mfo }: { mfo: Exclude<MfosQuery["mfos"][0], null> }) {
  return (
    <>
      <SubmitApplication
        partnerLink={mfo.partner_link}
        mfoId={mfo.documentId}
      />
      <div className="space-y-4 mt-4">
        {checkOneOfPairNumber(mfo.amount_from, mfo.amount_to) && (
          <div className="flex items-center">
            <Banknote className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="font-semibold truncate">
              {mfo.amount_from
                ? `От ${mfo.amount_from}` +
                  (mfo.amount_to ? ` до ${mfo.amount_to}` : "") +
                  " ₽"
                : mfo.amount_to && `До ${mfo.amount_to} ₽`}
            </span>
          </div>
        )}
        {checkOneOfPairNumber(mfo.term_from, mfo.term_to) && (
          <div className="flex items-center">
            <Calendar className="mr-2 h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
            <span className="truncate">
              {mfo.term_from
                ? `От ${mfo.term_from}` +
                  (mfo.term_to
                    ? ` до ${mfo.term_to} ` +
                      tn(mfo.term_to, "mfo", "card", "interest", "freeTerm")
                    : " " +
                      tn(mfo.term_from, "mfo", "card", "interest", "freeTerm"))
                : mfo.term_to &&
                  `До ${mfo.term_to} ` +
                    tn(mfo.term_to, "mfo", "card", "interest", "freeTerm")}
            </span>
          </div>
        )}
        {mfo.interest_rate && (
          <div>
            <div className="flex items-center">
              <Percent className="mr-2 h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
              <span className="truncate">{mfo.interest_rate}% в день</span>
            </div>
            <InterestFreeTerm mfo={mfo} />
            <FullCreditPrice mfo={mfo} />
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {mfo.obtaining_methods.map(
            (obtainingMethod) =>
              obtainingMethod !== null && (
                <Badge
                  key={obtainingMethod.documentId}
                  variant="secondary"
                  className="bg-primary/5 text-primary text-xs truncate max-w-full"
                >
                  {obtainingMethod.name}
                </Badge>
              ),
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {mfo.additional_filters.map((additionalFilter) =>
            additionalFilter == null ? (
              <></>
            ) : (
              <Badge key={additionalFilter.documentId} variant="outline">
                {additionalFilter.name}
              </Badge>
            ),
          )}
        </div>
      </div>
    </>
  );
}
