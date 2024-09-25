import { isServer } from "@tanstack/react-query";
import env from "@/app/_lib/env";
import { request } from 'graphql-request'
import type {
  RequestDocument,
  Variables,
  VariablesAndRequestHeadersArgs
// @ts-ignore
} from "graphql-request/src/legacy/helpers/types";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { HeadersInit } from "undici-types";

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

type LocalVariables = Variables;
type LocalRequestDocument = RequestDocument;
type LocalTypedDocumentNode<T, V> = TypedDocumentNode<T, V>;
type LocalVariablesAndRequestHeadersArgs<V> = VariablesAndRequestHeadersArgs<V>;

type LocalHeaders = [string, string][] | Record<string, string> | Headers;

async function cmsGraphQLRequestMethod<T, V extends LocalVariables = LocalVariables>(
  document: LocalRequestDocument | LocalTypedDocumentNode<T, V>,
  { variables, requestHeaders }: { variables?: V; requestHeaders?: LocalHeaders }
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...tokenHeaders,
    ...requestHeaders // Use requestHeaders directly
  };

  // return await graphQLRequest(url, document, variables, headers);
  return await request(url, document, variables, headers);
}

export async function cmsGraphQLRequestWithRequestDocument<T, V extends LocalVariables = LocalVariables>(
  document: LocalRequestDocument,
  { variables, requestHeaders }: { variables?: V; requestHeaders?: LocalHeaders } = {}
): Promise<T> {
  return await cmsGraphQLRequestMethod(document, { variables, requestHeaders });
}

export default async function cmsGraphQLRequest<T, V extends LocalVariables = LocalVariables>(
  document: LocalTypedDocumentNode<T, V>,
  { variables, requestHeaders }: { variables?: V; requestHeaders?: LocalHeaders } = {}
): Promise<T> {
  return await cmsGraphQLRequestMethod(document, { variables, requestHeaders });
}
