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
                    <AspectRatio ratio={16 / 9}>
                      {mfo.Logo?.file?.url ? (
                        <Image
                          className="bg-white p-2 rounded-md object-contain w-full h-full"
                          src={`${env.NEXT_PUBLIC_CMS_BASE_URL}${mfo.Logo?.file?.url}`}
                          alt={mfo.name}
                          fill
                        />
                      ) : (
                        <Zap className="w-full h-full" />
                      )}
                    </AspectRatio>
                  </div>
                  <DialogTitle>{mfo.name}</DialogTitle>
                  <DialogDescription>
                    Предложение микрозайма (реклама)
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
                  <SubmitApplication partnerLink={mfo.partner_link} />
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

function Header({ mfo }: { mfo: Exclude<MfosQuery["mfos"][0], null> }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full">
        <AspectRatio ratio={16 / 9}>
          {mfo.Logo?.file?.url ? (
            <Image
              className="bg-white p-2 rounded-md object-contain w-full h-full"
              src={`${env.NEXT_PUBLIC_CMS_BASE_URL}${mfo.Logo?.file?.url}`}
              alt={mfo.name}
              fill
            />
          ) : (
            <Zap className="w-full h-full" />
          )}
        </AspectRatio>
      </div>
      {mfo.rich_description ? (
        <div className="cursor-help">
          <CardTitle className="text-primary text-base">
            {mfo.name} <Info className="w-4 inline-block" />
          </CardTitle>
          <CardDescription>Предложение микрозайма (реклама)</CardDescription>
        </div>
      ) : (
        <div>
          <CardTitle className="text-primary text-base">{mfo.name}</CardTitle>
          <CardDescription>Предложение микрозайма (реклама)</CardDescription>
        </div>
      )}
    </div>
  );
}

function SubmitApplication({ partnerLink }: { partnerLink: string }) {
  return (
    <Link href={partnerLink} target="_blank">
      <Button className="w-full cta-button text-white text-sm">
        Подать заявку
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
      <div className="space-y-4 mb-4">
        <div className="flex items-center">
          <Banknote className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
          <span className="font-semibold truncate">
            От {mfo.amount_from} до {mfo.amount_to} ₽
          </span>
        </div>
        {mfo.term_to && (
          <div className="flex items-center">
            <Calendar className="mr-2 h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
            <span className="truncate">
              От {mfo.term_from} до {mfo.term_to}{" "}
              {tn(mfo.term_to, "mfo", "card", "interest", "freeTerm")}
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
                  className="bg-primary/10 text-primary text-xs truncate max-w-full"
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
      <SubmitApplication partnerLink={mfo.partner_link} />
    </>
  );
}
