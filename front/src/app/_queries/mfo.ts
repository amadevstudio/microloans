import {graphql} from './gql/gql'

export const allFilmsWithVariablesQueryDocument =
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
