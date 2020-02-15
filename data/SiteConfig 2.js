const config = {
  siteTitle: "Data ∩ Product", // Site title.
  siteTitleShort: "Data-Product", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Data ∩ Product: The intersection of data science and product management.", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://thegyre.io", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "The intersection of data science and product management.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteRssTitle: "Data ∩ Product RSS feed", // Title of the RSS feed
  dateFromFormat: "MM-DD-YYY", // Date format used in the frontmatter.
  dateFormat: "MM/DD/YYYY", // Date format for display.
  postsPerPage: 10, // Amount of posts displayed per listing page.
  userName: "Bradley Gibbs", // Username to display in the author segment.
  userEmail: "bradley@thegyre.io", // Email used for RSS feed's author segment
  userTwitter: "@thegyre", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription:
    "Product consultant for machine learning and deep learning products and services.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/b-gibbs",
      iconClassName: "fa fa-github"
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/bradley-gibbs/",
      iconClassName: "fa fa-linkedin"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/in_the_gyre",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:bradley@thegyre.io",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2020. Bradley Gibbs", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#569cd6", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
