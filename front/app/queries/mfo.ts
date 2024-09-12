import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from './gql/gql'

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
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

