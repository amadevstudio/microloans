import { Shield, Clock, ThumbsUp, Zap } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'Ваши данные защищены по высшим стандартам безопасности'
  },
  {
    icon: Clock,
    title: 'Быстрое решение',
    description: 'Получите ответ по займу в течение нескольких минут'
  },
  {
    icon: ThumbsUp,
    title: 'Высокий процент одобрения',
    description: 'Мы работаем с широким кругом кредиторов для максимального одобрения'
  },
  {
    icon: Zap,
    title: 'Мгновенное получение средств',
    description: 'Деньги на вашем счету сразу после одобрения'
  }
]

export default function FeatureSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary dark:text-primary/90">Почему выбирают
        нас</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index}
               className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <feature.icon className="w-12 h-12 text-primary dark:text-primary/90 mb-4"/>
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
