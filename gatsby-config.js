
const queries = require('./src/utils/algolia');
const jargon = require(`./jargon`);

require('dotenv').config();

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
        I am a product developer, specializing in machine learning products and services.
      `,
    },
    organization: {
      name: '',
      url: 'https://thegyre.io',
      logo: '',
    },
    social: {
      twitter: '@in_the_gyre',
      fbAppID: '',
    },
    categories: [
      {
        slug: 'product',
        name: 'Product',
      },
      {
        slug: 'data',
        name: 'Data',
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
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 10000, // default: 1000
      },
     },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `data-product`,
        short_name: `dp`,
        start_url: `.`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/dp-logo-512.svg`, 
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
          {
            resolve: `gatsby-remark-jargon`,
            options: { jargon },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content`,
        name: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-embedder',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: "gatsby-remark-smartypants",
            options: {
              dashes: "oldschool",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        // your segment write key for your production environment
        // when process.env.NODE_ENV === 'production'
        // required; non-empty string
        prodKey: process.env.GATSBY_SEGMENT_PRODUCTION_WRITE_KEY,
  
        // if you have a development env for your segment account, paste that key here
        // when process.env.NODE_ENV === 'development'
        // optional; non-empty string
        devKey: process.env.GATSBY_SEGMENT_DEV_WRITE_KEY,
  
        // boolean (defaults to false) on whether you want
        // to include analytics.page() automatically
        // if false, see below on how to track pageviews manually
        trackPage: true,
  
        // boolean (defaults to false); whether to delay load Segment
        // ADVANCED FEATURE: only use if you leverage client-side routing (ie, Gatsby <Link>)
        // This feature will force Segment to load _after_ either a page routing change
        // or user scroll, whichever comes first. This delay time is controlled by
        // `delayLoadTime` setting. This feature is used to help improve your website's
        // TTI (for SEO, UX, etc).  See links below for more info.
        // NOTE: But if you are using server-side routing and enable this feature,
        // Segment will never load (because although client-side routing does not do
        // a full page refresh, server-side routing does, thereby preventing Segment
        // from ever loading).
        // See here for more context:
        // GIF: https://github.com/benjaminhoffman/gatsby-plugin-segment-js/pull/19#issuecomment-559569483
        // TTI: https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#performance
        // Problem/solution: https://marketingexamples.com/seo/performance
        delayLoad: false,
  
        // number (default to 1000); time to wait after scroll or route change
        // To be used when `delayLoad` is set to `true`
        delayLoadTime: 1000
      },
    },
    {
      resolve: `gatsby-plugin-amplitude-analytics`,
      options: {
        // Specify the API key for your Amplitude Project (required)
        apiKey: process.env.GATSBY_AMPLITUDE_API_KEY,
        // Puts tracking script in the head instead of the body (optional)
        head: false,
        // Prevents loading Amplitude and logging events if visitors have "Do Not Track" enabled (optional)
        respectDNT: false,
        // Avoids sending pageview hits from custom paths (optional)
        exclude: [],
        // Override the default event types (optional)
        eventTypes: {
          outboundLinkClick: 'OUTBOUND_LINK_CLICK',
          pageView: 'PAGE_VIEW',
        },
        // Amplitude JS SDK configuration options (optional)
        amplitudeConfig: {
          saveEvents: true,
          includeUtm: true,
          includeReferrer: true
        }
      },
    },
  ],
}
