import { graphql } from './gql/gql'
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";
import { MfoEntityResponse } from "@/app/_queries/gql/graphql";

export const mfosQueryDocument =
  graphql(/* GraphQL */ `
    query Mfos {
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
