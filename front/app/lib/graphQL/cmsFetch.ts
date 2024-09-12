import env from "@/app/hooks/env";

import {request} from 'graphql-request'
import {TypedDocumentNode} from "@graphql-typed-document-node/core";
import {RequestDocument} from "graphql-request/src/legacy/helpers/types";

const token = env.CMS_TOKEN;
const tokenHeaders: { Authorization: string } | {} = token !== undefined && token !== ''
  ? {'Authorization': `Bearer ${token}`}
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

export default async function cmsGraphqlRequest(
  url: string,
  document: RequestDocument | TypedDocumentNode<unknown, any>,
  ...variablesAndRequestHeaders: [variables: any, requestHeaders: HeadersInit | undefined]
) {
  // Destructure the variables and requestHeaders
  const [variables, requestHeaders] = variablesAndRequestHeaders;

  const headers = {
    'Content-Type': 'application/json',
    ...tokenHeaders,
    ...requestHeaders // Use requestHeaders directly
  };

  const response = await request(url, document, variables, headers);

  console.log(response);
}
