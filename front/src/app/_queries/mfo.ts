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
      is_special

      Logo {
        file {
          url
        }
        svg
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
  const mfos = await cmsGraphQLRequest(mfosQueryDocument);
  // Filter the results to return only those with is_special set to true
  return { ...mfos, mfos: mfos.mfos.filter((mfo) => mfo && mfo.is_special) };
}

export async function getMfos() {
  // Fetch all MFOS without filtering
  return await cmsGraphQLRequest(mfosQueryDocument);
}
