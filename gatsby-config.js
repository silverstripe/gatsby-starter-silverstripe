const path = require('path');
require(`dotenv`).config();

module.exports = {
  siteMetadata: {
    title: `Gatsby/Silverstripe CMS POC`,
    description: `Gatsby + Silverstripe CMS using GraphQL 4`,
    author: `Uncle Cheese`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: path.resolve(__dirname, `../gatsby-source-silverstripe`),
      options: {
        baseUrl: process.env.SILVERSTRIPE_CMS_BASE_URL,
        apiKey: process.env.SILVERSTRIPE_CMS_API_KEY,
        concurrentRequests: 5,
        batchSize: 300,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-gatsby-cloud`,
  ],
}
