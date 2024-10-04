import { MfosQuery } from "@/app/_queries/gql/graphql";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Bolt, Calendar, Feather, Percent, Rocket, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tn } from "@/lib/i18n/t";
import { Badge } from "@/components/ui/badge";

const LoanCard = ({ mfo }: {
  mfo: Exclude<MfosQuery['mfos'][0], null>
}) => {
  const icons = [ Zap, Feather, Rocket, Target, Bolt ];
  const RandomIconComponent = icons[Math.floor(Math.random() * icons.length)];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          {<RandomIconComponent className="h-8 w-8" />}
          {/*{[Zap, Feather, Rocket, Target, Bolt][Math.round(Math.random() * 5)]}*/}
          <div>
            <CardTitle>{mfo.name}</CardTitle>
            <CardDescription>Предложение микрозайма (реклама)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-grow">
        <div className="space-y-4">
          <div className="flex items-center">
            <Banknote className="mr-2 h-4 w-4"/>
            <span>От {mfo.amount_from} до {mfo.amount_to} ₽</span>
          </div>
          {mfo.term_to &&
              <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4"/>
                  <span>От {mfo.term_from} до {mfo.term_to} {tn(mfo.term_to, 'mfo', 'card', 'interest', 'freeTerm')}</span>
              </div>
          }
          {mfo.interest_free_term &&
              <div>
                  <div className="flex items-center">
                      <Percent className="mr-2 h-4 w-4"/>
                      <span>{mfo.interest_rate}% в день</span>
                  </div>
                  <div>
                      <span>({mfo.interest_free_term} {tn(mfo.interest_free_term, 'mfo', 'card', 'interest', 'freeTerm')} без процентов)</span>
                  </div>
              </div>
          }
          <div className="flex flex-wrap gap-2">
            {mfo.obtaining_methods.map(obtainingMethod => obtainingMethod == null ? <></> : (
              <Badge key={obtainingMethod.documentId} variant="secondary">{obtainingMethod.name}</Badge>
            ))}
            <hr className="mt-2 mb-2"/>
            {mfo.additional_filters.map(additionalFilter => additionalFilter == null ? <></> : (
              <Badge key={additionalFilter.documentId} variant="outline">{additionalFilter.name}</Badge>
            ))}
          </div>
        </div>
        <Button className="w-full mt-4">Подать заявку</Button>
      </CardContent>
    </Card>
  );
};

export default LoanCard;
