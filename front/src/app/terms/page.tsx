import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGlobal } from "@/app/_queries/websiteInfo";

const { global: global } = await getGlobal();

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Условия использования</h1>
      <Card>
        <CardHeader>
          <CardTitle>Добро пожаловать на {global?.siteName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Используя этот сайт, вы соглашаетесь с настоящими условиями
            использования. Пожалуйста, внимательно прочитайте их.
          </p>
          <h2 className="text-xl font-semibold">1. Использование сайта</h2>
          <p>
            Вы соглашаетесь использовать сайт только в законных целях и
            способом, который не нарушает права третьих лиц и не ограничивает
            использование сайта другими пользователями.
          </p>
          <h2 className="text-xl font-semibold">2. Точность информации</h2>
          <p>
            Мы стремимся предоставлять точную и актуальную информацию о
            микрозаймах, но не гарантируем абсолютную точность всех данных.
            Рекомендуем всегда проверять информацию непосредственно у
            кредиторов.
          </p>
          <h2 className="text-xl font-semibold">3. Ответственность</h2>
          <p>
            {global?.siteName} не несет ответственности за любые убытки,
            возникшие в результате использования информации с нашего сайта.
            Решение о получении микрозайма принимается вами самостоятельно.
          </p>
          <h2 className="text-xl font-semibold">4. Изменения условий</h2>
          <p>
            Мы оставляем за собой право изменять эти условия использования в
            любое время. Продолжая использовать сайт после внесения изменений,
            вы соглашаетесь с новыми условиями.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
