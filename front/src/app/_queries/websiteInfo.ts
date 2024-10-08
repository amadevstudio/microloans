import { graphql } from './gql/gql'
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

const websiteInfoQueryDocument = graphql(`
    query WebsiteInfo {
        websiteInfo {
            name
            motto
            bannerTitle
            bannerText
            whyChooseUsClockTitle
            whyChooseUsClockText
            whyChooseUsThumbsUpTitle
            whyChooseUsThumbsUpText
            whyChooseUsZapTitle
            whyChooseUsZapText
        }
    }
`)

export async function getWebsiteInfo() {
  return await cmsGraphQLRequest(websiteInfoQueryDocument);
}
