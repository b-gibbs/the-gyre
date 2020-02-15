const pageQuery = `{
  posts: allFile(filter: {absolutePath: {regex: "/pages/"}}) {
    nodes {
      id
      childMdx {
        body
        frontmatter {
          slug
          title
          description
        }
      }
    }
  }
}`

const postQuery = `{
  posts: allFile(
    filter: { relativePath: { glob: "posts/**/*.{md,mdx}" } }
  ) {
    nodes {
      id
      childMdx {
        frontmatter {
          publish
          title
          description
          slug
          images
          category
          tag
        }
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `Pages`,
    settings,
  },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
]

module.exports = queries