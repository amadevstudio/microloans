import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      <h1 className="text-3xl md:text-4xl font-bold">Свяжитесь с нами</h1>
      <p className="text-lg md:text-xl">
        У вас есть вопросы или отзывы? Мы будем рады услышать вас. Заполните
        форму ниже, и мы свяжемся с вами в ближайшее время.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Отправьте нам сообщение</CardTitle>
          <CardDescription>Мы ответим в течение 24 часов.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Имя
              </label>
              <Input id="name" placeholder="Ваше имя" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="Ваш email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Сообщение
              </label>
              <Textarea id="message" placeholder="Ваше сообщение" rows={4} />
            </div>
            <Button type="submit" className="w-full">
              Отправить сообщение
            </Button>
          </form>
        </CardContent>
      </Card>
      {/*<div className="mt-8">*/}
      {/*  <h2 className="text-2xl font-semibold mb-4">*/}
      {/*    Другие способы связаться с нами*/}
      {/*  </h2>*/}
      {/*  <div className="space-y-2">*/}
      {/*    <p>*/}
      {/*      <strong>Email:</strong> {siteConfig.contacts.email}*/}
      {/*    </p>*/}
      {/*    <p>*/}
      {/*      <strong>Телефон:</strong> {siteConfig.contacts.phone}*/}
      {/*    </p>*/}
      {/*    <p>*/}
      {/*      <strong>Адрес:</strong> {siteConfig.contacts.address}*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
