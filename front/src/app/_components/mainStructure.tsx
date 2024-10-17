import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import React from "react";
import { QueryClient } from "@tanstack/react-query";
import { getGlobal } from "@/app/_queries/websiteInfo";

export default async function MainStructure({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  const { global: global } = await queryClient.fetchQuery({
    queryKey: ["global"],
    queryFn: getGlobal,
    staleTime: 0,
  });

  // const { global: global } = await getGlobal();

  return (
    <>
      <Header global={global} />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer global={global} />
    </>
  );
}
