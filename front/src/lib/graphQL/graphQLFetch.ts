import { request } from 'graphql-request'

export default async function graphQLRequest(
  ...args: Parameters<typeof request>
): Promise<ReturnType<typeof request>> {
  const [ url, document, variables, headers ] = args;

  return await request(url, document, variables, headers);
}
