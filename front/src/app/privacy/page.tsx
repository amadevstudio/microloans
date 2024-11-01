import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGlobal } from "@/app/_queries/websiteInfo";

export const revalidate = 60;

export default async function PrivacyPolicy() {
  const { global: global } = await getGlobal();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 break-words">
        Политика конфиденциальности
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Защита ваших данных на {global?.siteName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Мы серьезно относимся к защите ваших личных данных. Эта политика
            конфиденциальности объясняет, какую информацию мы собираем и как ее
            используем.
          </p>
          <h2 className="text-xl font-semibold">1. Сбор информации</h2>
          <p>
            Мы собираем информацию, которую вы предоставляете нам напрямую,
            например, при заполнении форм на сайте. Мы также автоматически
            собираем некоторые обезличенные данные о вашем устройстве и
            использовании сайта, в том числе ваше поведение на сайте.
          </p>
          <h2 className="text-xl font-semibold">2. Использование информации</h2>
          <p>
            Мы используем собранную информацию для предоставления и улучшения
            наших услуг, анализа использования сайта, в том числе с
            использованием внешней метрики от третьих лиц, и коммуникации с
            вами.
          </p>
          <h2 className="text-xl font-semibold">3. Защита данных</h2>
          <p>
            Мы принимаем разумные меры для защиты вашей информации от
            несанкционированного доступа, изменения, раскрытия или уничтожения.
            Данные хранятся в обезличенном виде.
          </p>
          <h2 className="text-xl font-semibold">
            4. Раскрытие информации третьим лицам
          </h2>
          <p>
            Мы не продаем и не передаем вашу личную информацию третьим лицам, за
            исключением случаев, описанных в этой политике или с вашего явного
            согласия.
          </p>
          <h2 className="text-xl font-semibold">
            5. Изменения в политике конфиденциальности
          </h2>
          <p>
            Мы можем обновлять эту политику конфиденциальности время от времени
            без уведомления.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
