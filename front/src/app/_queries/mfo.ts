import { graphql } from "./gql/gql";
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

const mfosQueryDocument = graphql(/* GraphQL */ `
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
      partner_link
      rich_description
      full_credit_price_to

      Logo {
        file {
          url
        }
      }
      additional_filters {
        documentId
        code
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
