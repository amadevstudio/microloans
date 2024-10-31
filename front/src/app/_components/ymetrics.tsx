import Script from "next/script";
import env from "@/app/_lib/env";
import React from "react";

export default function YMetrics() {
  return (
    <>
      <Script
        id="ymetrics"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `const YM_TOKEN = ${env.NEXT_PUBLIC_YM_TOKEN};`,
        }}
      />
      <Script src="/scripts/ymetrics.js" strategy="lazyOnload" />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://mc.yandex.ru/watch/98785553"
            style={{ position: "absolute", left: "-9999px" }}
            alt="Statistics helper"
            aria-hidden="true"
          />
        </div>
      </noscript>
    </>
  );
}
