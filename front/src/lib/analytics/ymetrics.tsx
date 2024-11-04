"use client";

import Script from "next/script";
import env from "@/app/_lib/env";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface Window {
  ym?: (id: number, method: string, ...args: any[]) => void;
}

export default function YMetrics() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const w = window as unknown as Window;

  useEffect(() => {
    w.ym && w.ym(env.NEXT_PUBLIC_YM_TOKEN, "hit", window.location.href);
  }, [pathName, searchParams, w]);

  return (
    <>
      <Script
        id="ymetrics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `const YM_TOKEN = ${env.NEXT_PUBLIC_YM_TOKEN}`,
        }}
      />
      <Script src="/scripts/ymetrics.js" strategy="lazyOnload" />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${env.NEXT_PUBLIC_YM_TOKEN}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt="Statistics helper"
            aria-hidden="true"
          />
        </div>
      </noscript>
    </>
  );
}

export function reachGoal(goal: string, ...args: any[]) {
  const w = window as unknown as Window;
  w.ym && w.ym(env.NEXT_PUBLIC_YM_TOKEN, "reachGoal", goal, ...args);
}
