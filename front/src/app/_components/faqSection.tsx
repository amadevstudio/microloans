import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Как работает сервис МикроЗаймФиндер?",
    answer: "МикроЗаймФиндер помогает вам сравнить различные предложения микрозаймов от ведущих кредиторов. Вы вводите необходимую сумму и срок, а мы показываем вам наиболее подходящие варианты."
  },
  {
    question: "Безопасно ли использовать МикроЗаймФиндер?",
    answer: "Да, безопасность ваших данных - наш главный приоритет. Мы используем передовые технологии шифрования для защиты всей передаваемой информации."
  },
  {
    question: "Как быстро я могу получить деньги после одобрения займа?",
    answer: "Время получения денег зависит от выбранного кредитора, но в большинстве случаев средства поступают на ваш счет в течение 24 часов после одобрения."
  },
  {
    question: "Могу ли я получить займ с плохой кредитной историей?",
    answer: "Многие кредиторы на нашей платформе работают с клиентами, имеющими различную кредитную историю. Мы постараемся подобрать для вас подходящие варианты."
  },
]

export default function FAQSection() {
  return (
    <section className="py-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary">Часто задаваемые вопросы</h2>
  <Accordion type="single" collapsible className="max-w-3xl mx-auto">
  {faqs.map((faq, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
    <AccordionContent>{faq.answer}</AccordionContent>
    </AccordionItem>
))}
  </Accordion>
  </section>
)
}
