import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import React from "react";
import { QueryClient, } from "@tanstack/react-query";
import { getWebsiteInfo } from "@/app/_queries/websiteInfo";

export default async function MainStructure({
                                              children,
                                            }: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  const websiteInfo = await queryClient.fetchQuery({
    queryKey: [ 'websiteInfo' ],
    queryFn: getWebsiteInfo
  })

  return (
    <>
      <Header websiteInfo={websiteInfo.websiteInfo}/>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer/>
    </>
  )
}
