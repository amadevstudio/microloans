import { graphql } from './gql/gql'
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

const mfosQueryDocument =
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

export async function getMfos() {
  return await cmsGraphQLRequest(mfosQueryDocument);
}
