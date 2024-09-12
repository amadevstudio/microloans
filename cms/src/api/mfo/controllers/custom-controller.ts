// import {Context} from 'koa';
// import {graphql} from 'graphql';
//
// const {createCoreController} = require('@strapi/strapi').factories;
//
// const modelUid = "api::mfo.mfo";
//
// module.exports = createCoreController(modelUid, ({strapi}) => ({
//   async getSchema(ctx: Context) {
//     console.log("HERE");
//     console.log(strapi.plugin('graphql'));
//     const schema = strapi.plugin('graphql').service('graphql').getSchema();
//     const introspectionQuery = `
//       {
//         __schema {
//           types {
//             name
//             fields {
//               name
//               type {
//                 name
//                 kind
//               }
//             }
//           }
//         }
//       }
//     `;
//
//     const result = await graphql(schema, introspectionQuery);
//     ctx.send(result);
//   },
// }));
