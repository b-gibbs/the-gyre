const postQuery = `{
  posts: allMdx(filter: {frontmatter: {slug: {ne: null}}}) {
    edges {
      node {
        frontmatter {
          slug
          title
          seo_title
          description
          images
        }
        rawBody
      }
    }
  }
}`

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) =>
      data.posts.edges.reduce((records, { node }) => {
        const {
          slug,
          title,
          seo_title: alt,
          description,
        } = node.frontmatter;

        const base = { slug, title, alt, description };
        const chunks = node.rawBody.split('\n\n');

        return [
          ...records,
          ...chunks.map((text, index) => ({
            ...base,
            objectID: `${slug}-${index}`,
            text,
          })),
        ];
      },
    []),
  },
]

module.exports = queries