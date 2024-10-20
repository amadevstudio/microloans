"use client";

import MfoCard from "@/app/_components/mfoCard";
import { useContext } from "react";
import MfosContext from "@/app/_components/mfosContext";

export default function MfoList() {
  const { filteredAndSortedMfos } = useContext(MfosContext);

  return (
    <section className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mt-4">
        {filteredAndSortedMfos.map((mfo, index) => (
          <MfoCard key={`mfo.documentId-${index}`} mfo={mfo} />
        ))}
      </div>
      <p className="text-muted-foreground">
        Информация об условиях представлена в ознакомительных целях и может
        отличаться от действительности. Уточняйте актуальные тарифы на сайте, по
        телефонам, в отделениях интересующего МФО.
      </p>
    </section>
  );
}
