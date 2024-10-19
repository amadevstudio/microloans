import { graphql } from "./gql/gql";
import cmsGraphQLRequest from "@/app/_lib/graphQL/cmsGraphQLFetch";

const globalQueryDocument = graphql(`
  query Global {
    global {
      siteName
      motto
      siteDescription
      contacts
      legalDescription

      defaultSeo {
        metaTitle
        metaDescription
        shareImage {
          url
        }
        keywords
      }
    }
  }
`);

export async function getGlobal() {
  return await cmsGraphQLRequest(globalQueryDocument);
}

const landingPageQueryDocument = graphql(`
  query WebsiteInfo {
    websiteInfo {
      bannerTitle
      bannerText
      whyChooseUsClockTitle
      whyChooseUsClockText
      whyChooseUsThumbsUpTitle
      whyChooseUsThumbsUpText
      whyChooseUsZapTitle
      whyChooseUsZapText
      faq {
        title
        body
      }
    }
  }
`);

export async function getLandingPage() {
  return await cmsGraphQLRequest(landingPageQueryDocument);
}
