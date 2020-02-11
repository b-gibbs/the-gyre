module.exports = {
  siteMetadata: {
    title: `Data ∩ Product`,
    siteName: `Data ∩ Product`,
    description: `The intersection of data science and product management.`,
    siteUrl: 'https://thegyre.io',
    image: '',
    author: {
      name: 'Bradley Gibbs',
      minibio: `
        Bradley is a product consultant who specializes in machine learning products and services.
      `,
    },
    organization: {
      name: '',
      url: 'https://thegyre.io',
      logo: '',
    },
    social: {
      twitter: '@',
      fbAppID: '',
    },
    categories: [
      {
        slug: 'career',
        name: 'Career',
      },
      {
        slug: 'machine-learning',
        name: 'Machine Learning',
      },
      {
        slug: 'deep-learning',
        name: 'Deep Learning',
      },
      {
        slug: 'lifecycle',
        name: 'Lifecycle',
      },
    ],
  },
  plugins: [
    `gatsby-theme-apollo-core`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `data-product`,
        short_name: `dp`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/dp-logo-16x16.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/templates/page.js'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1380,
            },
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
