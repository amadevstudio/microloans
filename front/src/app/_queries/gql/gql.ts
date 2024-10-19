/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query ObtainingMethods {\n        obtainingMethods(sort: \"name:asc\") {\n            documentId\n            name\n        },\n    }\n": types.ObtainingMethodsDocument,
    "\n    query AdditionalFilters {\n        additionalFilters(sort: \"name:asc\") {\n            documentId\n            name\n        }\n    }\n": types.AdditionalFiltersDocument,
    "\n    query Mfos {\n        mfos {\n            documentId\n            name\n            amount_from\n            amount_to\n            term_from\n            term_to\n            interest_rate\n            interest_free_term\n            additional_filters {\n                documentId\n                name\n            }\n            obtaining_methods {\n                documentId\n                name\n            }\n        }\n    }\n": types.MfosDocument,
    "\n  query Global {\n    global {\n      siteName\n      motto\n      siteDescription\n      contacts\n      legalDescription\n\n      defaultSeo {\n        metaTitle\n        metaDescription\n        shareImage {\n          url\n        }\n        keywords\n      }\n    }\n  }\n": types.GlobalDocument,
    "\n  query WebsiteInfo {\n    websiteInfo {\n      bannerTitle\n      bannerText\n      whyChooseUsClockTitle\n      whyChooseUsClockText\n      whyChooseUsThumbsUpTitle\n      whyChooseUsThumbsUpText\n      whyChooseUsZapTitle\n      whyChooseUsZapText\n      faq {\n        title\n        body\n      }\n    }\n  }\n": types.WebsiteInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ObtainingMethods {\n        obtainingMethods(sort: \"name:asc\") {\n            documentId\n            name\n        },\n    }\n"): (typeof documents)["\n    query ObtainingMethods {\n        obtainingMethods(sort: \"name:asc\") {\n            documentId\n            name\n        },\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query AdditionalFilters {\n        additionalFilters(sort: \"name:asc\") {\n            documentId\n            name\n        }\n    }\n"): (typeof documents)["\n    query AdditionalFilters {\n        additionalFilters(sort: \"name:asc\") {\n            documentId\n            name\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Mfos {\n        mfos {\n            documentId\n            name\n            amount_from\n            amount_to\n            term_from\n            term_to\n            interest_rate\n            interest_free_term\n            additional_filters {\n                documentId\n                name\n            }\n            obtaining_methods {\n                documentId\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query Mfos {\n        mfos {\n            documentId\n            name\n            amount_from\n            amount_to\n            term_from\n            term_to\n            interest_rate\n            interest_free_term\n            additional_filters {\n                documentId\n                name\n            }\n            obtaining_methods {\n                documentId\n                name\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Global {\n    global {\n      siteName\n      motto\n      siteDescription\n      contacts\n      legalDescription\n\n      defaultSeo {\n        metaTitle\n        metaDescription\n        shareImage {\n          url\n        }\n        keywords\n      }\n    }\n  }\n"): (typeof documents)["\n  query Global {\n    global {\n      siteName\n      motto\n      siteDescription\n      contacts\n      legalDescription\n\n      defaultSeo {\n        metaTitle\n        metaDescription\n        shareImage {\n          url\n        }\n        keywords\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WebsiteInfo {\n    websiteInfo {\n      bannerTitle\n      bannerText\n      whyChooseUsClockTitle\n      whyChooseUsClockText\n      whyChooseUsThumbsUpTitle\n      whyChooseUsThumbsUpText\n      whyChooseUsZapTitle\n      whyChooseUsZapText\n      faq {\n        title\n        body\n      }\n    }\n  }\n"): (typeof documents)["\n  query WebsiteInfo {\n    websiteInfo {\n      bannerTitle\n      bannerText\n      whyChooseUsClockTitle\n      whyChooseUsClockText\n      whyChooseUsThumbsUpTitle\n      whyChooseUsThumbsUpText\n      whyChooseUsZapTitle\n      whyChooseUsZapText\n      faq {\n        title\n        body\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;