import Link from "next/link";
import { BookOpen } from "lucide-react";
import { routes } from "@/app/_config/routes";

export default function FinancialLiteracy() {
  return (
    <section className="text-center space-y-6">
      <Link href={routes.financialLiteracy} className="inline-block">
        <div className="bg-orange-50/30 dark:bg-orange-950/30 border-2 border-orange-100 dark:border-orange-900 rounded-lg p-6 transition-all duration-300 hover:border-orange-200 dark:hover:border-orange-800">
          <div className="flex flex-col md:flex-row justify-center items-center space-x-2 text-orange-700 dark:text-orange-400">
            <BookOpen className="h-5 w-5" />
            <h2 className="text-xl font-semibold">
              Изучите основы финансовой грамотности
            </h2>
          </div>
          <p className="mt-2 text-muted-foreground">
            Узнайте, как правильно управлять личными финансами и принимать
            взвешенные решения, прочитав нашу статью
          </p>
        </div>
      </Link>
    </section>
  );
}
