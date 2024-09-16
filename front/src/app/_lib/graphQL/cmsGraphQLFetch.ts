import graphQLRequest from "@/lib/graphQL/graphQLFetch";
import { isServer } from "@tanstack/react-query";
import env from "@/app/_lib/env";

const [ token, url ] = isServer
  ? [ env.CMS_TOKEN, env.CMS_URL ]
  : [ env.NEXT_PUBLIC_CMS_TOKEN, env.NEXT_PUBLIC_CMS_URL ];

const tokenHeaders: { Authorization: string } | {} = token !== undefined && token !== ''
  ? { 'Authorization': `Bearer ${token}` }
  : {};

// export default async function cmsFetch(url: string, options: RequestInit = {}): Promise<{ [key: string]: any }> {
//   const headers = {
//     'Content-Type': 'application/json',
//     ...tokenHeaders,
//     ...options.headers
//   };
//
//   const respose = await fetch(url, {
//     ...options,
//     headers
//   });
//
//   if (!respose.ok) {
//     console.error(`Could not fetch ${url}, response status is ${respose.status}, options: ${options}`);
//     throw new Error(`Could not fetch ${url}, response status is ${respose.status}`);
//   }
//
//   return respose.json();
// }

export default async function cmsGraphQLRequest(
  ...args: Parameters<typeof graphQLRequest> extends [any, ...infer Rest] ? Rest : never
): Promise<ReturnType<typeof graphQLRequest>> {
  const [ document, variables, requestHeaders ] = args;

  const headers = {
    'Content-Type': 'application/json',
    ...tokenHeaders,
    ...requestHeaders // Use requestHeaders directly
  };

  return await graphQLRequest(url, document, variables, headers);
}
