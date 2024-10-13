import { MfosQuery } from "@/app/_queries/gql/graphql";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Bolt, Calendar, Feather, Percent, Rocket, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tn } from "@/lib/i18n/t";
import { Badge } from "@/components/ui/badge";

// Simple hash function to convert string to number
const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

export default function MfoCard({ mfo }: {
  mfo: Exclude<MfosQuery['mfos'][0], null>
}) {
  const icons = [Zap, Feather, Rocket, Target, Bolt];
  const iconIndex = hashCode(mfo.documentId) % icons.length;
  const SelectedIcon = icons[iconIndex];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <SelectedIcon className="h-8 w-8 text-primary"/>
          {/*{[Zap, Feather, Rocket, Target, Bolt][Math.round(Math.random() * 5)]}*/}
          <div>
            <CardTitle className="text-primary text-base truncate">{mfo.name}</CardTitle>
            <CardDescription>Предложение микрозайма (реклама)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-grow">
        <div className="space-y-4">
          <div className="flex items-center">
            <Banknote className="mr-2 h-4 w-4 text-green-500 flex-shrink-0"/>
            <span className="font-semibold truncate">От {mfo.amount_from} до {mfo.amount_to} ₽</span>
          </div>
          {mfo.term_to &&
              <div className="flex items-center">
                  <Calendar className="mr-2 h-3.5 w-3.5 text-blue-500 flex-shrink-0"/>
                  <span
                      className="truncate">От {mfo.term_from} до {mfo.term_to} {tn(mfo.term_to, 'mfo', 'card', 'interest', 'freeTerm')}</span>
              </div>
          }
          {mfo.interest_free_term &&
              <div>
                  <div className="flex items-center">
                      <Percent className="mr-2 h-3.5 w-3.5 text-orange-500 flex-shrink-0"/>
                      <span className="truncate">{mfo.interest_rate}% в день</span>
                  </div>
                  <div>
                      <span>({mfo.interest_free_term} {tn(mfo.interest_free_term, 'mfo', 'card', 'interest', 'freeTerm')} без процентов)</span>
                  </div>
              </div>
          }
          <div className="flex flex-wrap gap-2">
            {mfo.obtaining_methods.map(obtainingMethod => obtainingMethod == null ? <></> : (
              <Badge key={obtainingMethod.documentId} variant="secondary"
                     className="bg-primary/10 text-primary text-xs truncate max-w-full">{obtainingMethod.name}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {mfo.additional_filters.map(additionalFilter => additionalFilter == null ? <></> : (
              <Badge key={additionalFilter.documentId} variant="outline">{additionalFilter.name}</Badge>
            ))}
          </div>
        </div>
        <Button className="w-full mt-2 cta-button text-white text-sm">Подать заявку</Button>
      </CardContent>
    </Card>
  );
}
