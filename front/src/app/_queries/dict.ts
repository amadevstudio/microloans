import { graphql } from './gql/gql'
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

const obtainingMethodsQueryDocument =
graphql(/* GraphQL */ `
    query ObtainingMethods {
        obtainingMethods {
            documentId
            name
        },
#        sort
    }
`);

export async function getObtainingMethods() {
  return await cmsGraphQLRequest(obtainingMethodsQueryDocument);
}
