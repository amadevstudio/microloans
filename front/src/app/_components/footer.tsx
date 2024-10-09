import { GlobalQuery } from "@/app/_queries/gql/graphql";
import Markdown from "@/components/markdown";

const currentYear = new Date().getFullYear();
const creationYear = 2024;

export default function Footer({ global }: { global: GlobalQuery["global"] }) {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О нас</h3>
            <p className="text-muted-foreground">{global?.siteDescription}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:underline">
                  О нас
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Контакты
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline">
                  Условия использования
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>
          <div>
            {/*<h3 className="text-lg font-semibold mb-4">Свяжитесь с нами</h3>*/}
            {/*<p className="text-muted-foreground">*/}
            {/*  Email: info@microzaimfinder.ru*/}
            {/*</p>*/}
            {/*<p className="text-muted-foreground">Телефон: +7 (800) 123-45-67</p>*/}
            <h3 className="text-lg font-semibold mb-4">
              Контактная информация
            </h3>
            <div className="text-sm text-muted-foreground">
              <Markdown markdownString={global?.contacts} />
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          <Markdown markdownString={global?.legalDescription} />
        </div>
        <div className="text-center">
          ©{" "}
          {currentYear === creationYear
            ? currentYear
            : `${creationYear}–${currentYear}`}{" "}
          {global?.siteName}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
