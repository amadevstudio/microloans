import { graphql } from './gql/gql'
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

const allMfosWithVariablesQueryDocument =
  graphql(/* GraphQL */ `
    query MFO {
      mfos {
        data {
          id
          attributes {
            name
          }
        }
      }
    }
  `);

export const getMfos = async () =>
  cmsGraphQLRequest(allMfosWithVariablesQueryDocument,
    // {
    //   first: 10
    // }
  );
