import { graphql } from './gql/gql'
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

const mfosQueryDocument =
graphql(/* GraphQL */ `
    query Mfos {
        mfos {
            documentId
            name
            amount_from
            amount_to
            term_from
            term_to
            interest_rate
            interest_free_term
            additional_filters {
                documentId
                name
            }
            obtaining_methods {
                documentId
                name
            }
        }
    }
`);

export async function getSpecialOfferMfos() {
  return await cmsGraphQLRequest(mfosQueryDocument);
}

export async function getMfos() {
  return await cmsGraphQLRequest(mfosQueryDocument);
}
