import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Анна С.",
    avatar: "AS",
    testimonial: "Благодаря МикроЗаймФиндер я нашла идеальный займ за считанные минуты. Процесс был простым и быстрым!",
  },
  {
    name: "Иван П.",
    avatar: "ИП",
    testimonial: "Отличный сервис! Помог мне сравнить различные предложения и выбрать наиболее выгодные условия.",
  },
  {
    name: "Елена М.",
    avatar: "ЕМ",
    testimonial: "Удобный интерфейс и широкий выбор предложений. Рекомендую всем, кто ищет микрозайм!",
  },
]

export default function TestimonialSection() {
  return (
    <section
      className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary dark:text-primary/90">Отзывы наших
        клиентов</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonial.avatar}`}
                               alt={testimonial.name}/>
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold dark:text-gray-100">{testimonial.name}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.testimonial}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
        Примечание: Все отзывы являются художественным вымыслом и приведены исключительно в иллюстративных целях.
      </p>
    </section>
  )
}
