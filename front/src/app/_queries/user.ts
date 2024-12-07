import { graphql } from "./gql/gql";
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

const userFeedbacksQueryDocument = graphql(`
  query UserFeedbacks {
    userFeedbacks(pagination: { limit: 1000 }, sort: "priority:desc") {
      user_contact {
        name
        photo {
          url
        }
        user_contact_type {
          type
          baseLink
        }
        value
      }
      feedback
    }
  }
`);

export async function getUserFeedbacks() {
  return await cmsGraphQLRequest(userFeedbacksQueryDocument);
}
