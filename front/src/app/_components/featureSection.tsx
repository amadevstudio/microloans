'use client'

import { Clock, ThumbsUp, Zap } from 'lucide-react'
import { WebsiteInfoQuery } from '@/app/_queries/gql/graphql'
import { useQuery } from '@tanstack/react-query'
import { getWebsiteInfo } from '@/app/_queries/websiteInfo'

const features = [
  // {
  //   icon: Shield,
  //   title: 'Безопасность',
  //   description: 'Ваши данные защищены по высшим стандартам безопасности'
  // },
  {
    icon: Clock,
    name: 'Clock',
    // title: 'Быстрое решение',
    // description: 'Получите ответ по займу в как можно быстрее'
  },
  {
    icon: ThumbsUp,
    name: 'ThumbsUp',
    // title: 'Высокий процент одобрения',
    // description: 'Мы работаем с широким кругом кредиторов для максимального одобрения'
  },
  {
    icon: Zap,
    name: 'Zap',
    // title: 'Мгновенное получение средств',
    // description: 'В нашем каталоге есть микрозаймы, которые выдают деньги сразу после одобрения'
  }
]

export default function FeatureSection() {
  const { data } = useQuery<WebsiteInfoQuery>({
    queryKey: [ 'websiteInfo' ],
    queryFn: getWebsiteInfo
  })

  const websiteInfo = data?.websiteInfo

  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary dark:text-primary/90">Почему выбирают
        нас</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 auto-rows-fr" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {features.map((feature, index) => (
          <div key={index}
               className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 text-primary dark:text-primary/90 mb-4">
              <feature.icon size={48} />
            </div>
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">{(websiteInfo as any)?.[`whyChooseUs${feature.name}Title`]}</h3>
            <p className="text-gray-600 dark:text-gray-300">{(websiteInfo as any)?.[`whyChooseUs${feature.name}Text`]}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
