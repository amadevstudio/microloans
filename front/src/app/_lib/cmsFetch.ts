// export default async function cmsFetch(url: string, options: RequestInit = {}): Promise<{ [key: string]: any }> {
//   const headers = {
//     'Content-Type': 'application/json',
//     ...tokenHeaders,
//     ...options.headers
//   };
//
//   const respose = await fetch(url, {
//     ...options,
//     headers
//   });
//
//   if (!respose.ok) {
//     console.error(`Could not fetch ${url}, response status is ${respose.status}, options: ${options}`);
//     throw new Error(`Could not fetch ${url}, response status is ${respose.status}`);
//   }
//
//   return respose.json();
// }
