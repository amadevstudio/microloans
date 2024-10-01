import { graphql } from './gql/gql'
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

const obtainingMethodsQueryDocument =
graphql(/* GraphQL */ `
    query ObtainingMethods {
        obtainingMethods(sort: "name:asc") {
            documentId
            name
        },
    }
`);

export async function getObtainingMethods() {
  return await cmsGraphQLRequest(obtainingMethodsQueryDocument);
}

const additionalFiltersQueryDocument =
graphql(`
    query AdditionalFilters {
        additionalFilters(sort: "name:asc") {
            documentId
            name
        }
    }
`)

export async function getAdditionalFilters() {
  return await cmsGraphQLRequest(additionalFiltersQueryDocument);
}
