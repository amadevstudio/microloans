import env from "@/app/_lib/env";
import graphQLRequest from "@/lib/graphQL/graphQLFetch";

const token = env.NEXT_PUBLIC_CMS_TOKEN;
const url = env.NEXT_PUBLIC_CMS_URL;
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
