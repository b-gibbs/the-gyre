const siteMdxQuery = `{
  allFile(filter: {relativePath: {glob: "**/**/*.{md,mdx}"}}) {
    edges {
      node {
        childMdx {
          frontmatter {
            slug
            path
            title
            subtitle
            category
            section
            type
            author
            description
          }
          rawBody
        }
      }
    }
  }
}`

const queries = [
  {
    query: siteMdxQuery,
    transformer: ({ data }) =>
      data.allFile.edges.reduce((records, { node }) => {
        const {
          slug,
          path,
          title,
          subtitle,
          author,
          description,
          category,
          section,
          tag,
        } = node.childMdx.frontmatter;
        relativePath = node.relativePath;

        const base = { slug, path, title, subtitle, author, category, section, tag, description };
        const chunks = node.childMdx.rawBody.split('\n\n');

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
    indexName: 'the-gyre',
  },
]

module.exports = queries