import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  BookOpen,
  Brain,
  Calculator,
  CreditCard,
  PiggyBank,
  Target,
  Wallet,
} from "lucide-react";

const topics = [
  {
    icon: Wallet,
    title: "Основы личного бюджета",
    content:
      "Первый шаг к финансовой грамотности – это умение управлять личным бюджетом. Важно отслеживать доходы и расходы, создавать сбережения и планировать крупные покупки. Рекомендуется следовать правилу 50/30/20, где 50% дохода идет на необходимые расходы, 30% на желания, и 20% на сбережения.",
  },
  {
    icon: PiggyBank,
    title: "Создание финансовой подушки",
    content:
      "Финансовая подушка безопасности – это ваша защита от непредвиденных ситуаций. Рекомендуется иметь сбережения, равные 3-6 месячным расходам. Начните с малого: откладывайте даже небольшие суммы регулярно.",
  },
  {
    icon: CreditCard,
    title: "Разумное использование кредитов",
    content:
      "Кредиты и займы могут быть полезным инструментом в определенных ситуациях, но важно использовать их осознанно. Перед оформлением займа тщательно оцените свои возможности по его возврату. Микрозаймы лучше рассматривать как крайнюю меру в действительно срочных ситуациях.",
  },
  {
    icon: Target,
    title: "Постановка финансовых целей",
    content:
      "Четкие финансовые цели помогают принимать правильные решения и мотивируют к сбережениям. Разделите цели на краткосрочные (до года), среднесрочные (1-5 лет) и долгосрочные (более 5 лет). Каждая цель должна быть конкретной и достижимой.",
  },
];

export default function FinancialLiteracy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">
          Финансовая грамотность
        </h1>
        <p className="text-xl text-muted-foreground">
          Ваш путь к финансовой независимости начинается здесь
        </p>
      </section>

      <section className="space-y-6">
        {topics.map((topic, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <topic.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{topic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{topic.content}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="bg-primary/5 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2 text-orange-600">
          <AlertCircle className="h-5 w-5" />
          <h2 className="font-semibold">Важное замечание о микрозаймах</h2>
        </div>
        <p className="text-muted-foreground">
          Хотя микрозаймы могут быть полезны в экстренных ситуациях, они не
          должны становиться регулярным способом решения финансовых проблем.
          Перед оформлением займа рассмотрите альтернативные варианты:
          использование сбережений, получение аванса на работе или заём у
          родственников. Если вы всё же решили взять микрозайм, внимательно
          изучите условия и убедитесь, что сможете вернуть его в срок.
        </p>
      </section>

      {false && (
        <section className="border-2 border-primary rounded-lg p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-primary/10 w-fit mx-auto p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary">
              Курс &ldquo;Основы финансовой грамотности&rdquo;
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Инвестируйте в своё финансовое образование! Наш комплексный курс
              поможет вам освоить основы управления личными финансами, создания
              сбережений и разумного использования кредитных продуктов.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Что включает курс</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <span>10 подробных уроков</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-primary" />
                  <span>Практические задания</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Персональный финансовый план</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Специальное предложение</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Ограниченное время
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">1,990 ₽</div>
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Купить курс
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
