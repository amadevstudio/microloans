"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { UserFeedbacksQuery } from "@/app/_queries/gql/graphql";
import { getUserFeedbacks } from "@/app/_queries/user";
import env from "@/app/_lib/env";

export default function TestimonialSection() {
  const { data } = useQuery<UserFeedbacksQuery>({
    queryKey: ["userFeedbacks"],
    queryFn: getUserFeedbacks,
  });

  if (data === undefined || data?.userFeedbacks.length === 0) return;

  return (
    <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary dark:text-primary/90">
        Отзывы наших клиентов
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {data.userFeedbacks.map((testimonial, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage
                    src={`${env.NEXT_PUBLIC_CMS_BASE_URL}${testimonial?.user_contact?.photo?.url}`}
                    alt={testimonial?.user_contact?.name}
                  />
                  <AvatarFallback>
                    {testimonial?.user_contact?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold dark:text-gray-100">
                    {testimonial?.user_contact?.name}
                  </p>
                  {testimonial?.user_contact?.value && (
                    <>
                      {testimonial?.user_contact?.user_contact_type
                        ?.baseLink ? (
                        <Link
                          className="hover:underline"
                          href={`${testimonial.user_contact.user_contact_type.baseLink}${testimonial.user_contact.value}`}
                        >
                          @{testimonial.user_contact.value}
                        </Link>
                      ) : (
                        <p>@{testimonial.user_contact.value}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic whitespace-pre-line">
                &quot;{testimonial?.feedback}&quot;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
        Чтобы добавить свой отзыв,{" "}
        <Link href="http://localhost:3000/contact">напишите нам</Link>
      </p>
    </section>
  );
}
