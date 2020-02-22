const path = require('path');
const { template, chunk } = require('lodash');
const fs = require('fs');

const getUnique = (field, posts) =>
  posts.reduce((uniques, post) => {
    const values = post.childMdx.frontmatter[field];

    return uniques.concat(values.filter(val => !uniques.includes(val)));
  }, []);

const groupPostsByUnique = (field, posts) => {
  const uniqueValues = getUnique(field, posts);

  return uniqueValues.reduce(
    (grouped, unique) => ({
      ...grouped,
      [unique]: posts.filter(post =>
        post.childMdx.frontmatter[field].includes(unique),
      ),
    }),
    {},
  );
};

// Add paginated blog preview pages. Here’s how it works:
//
// 1.  Use lodash-chunk to create posts in groups.
// 2.  Finally, we create a new page for each post group.
//
// Adapted from https://github.com/pixelstew/gatsby-paginate
const paginate = (
  { pathTemplate, createPage, component, type, value, linkRoot = 'blog' },
  posts,
) =>
  chunk(posts, 10).forEach((postGroup, index, allGroups) => {
    const isFirstPage = index === 0;
    const currentPage = index + 1;
    const totalPages = allGroups.length;
    const getPath = template(pathTemplate);
    const pagePath = getPath({ pageNumber: isFirstPage ? '' : currentPage });

    createPage({
      path: pagePath.replace('//', '/'),
      component,
      context: {
        postGroup,
        type,
        value,
        currentPage,
        totalPages,
        isFirstPage,
        isLastPage: currentPage === totalPages,
        linkBase: getPath({ pageNumber: '' }),
        linkRoot,
      },
    });
  });

// This is a shortcut so MDX can import components without gross relative paths.
// Example: import { Image } from '$components';
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: { $components: path.resolve(__dirname, 'src/components') },
    },
    node: {
      fs: 'empty'
    }
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};

exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'content/resources';

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath);
  }
}

/* Define the Resource type */
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Resource implements Node @dontInfer {
      id: ID!
      title: String!
      subtitle: String
      priority: Int!
      category: String!
      tags: [String!]
      author: String!
      pubYear: String! @proxy(from:"pub_year")
      type: String!
      image: String!
      url: String!
      description: String!
    }
  `)
};



exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  const result = await graphql(`
    {
      posts: allFile(
        filter: { relativePath: { glob: "posts/**/*.{md,mdx}" } }
        sort: { fields: relativePath, order: DESC }
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
    }
  `);

  const posts = result.data.posts.nodes.filter(
    post => post.childMdx.frontmatter.publish !== false,
  );

  posts.forEach(post => {
    if (
      !post.childMdx ||
      !post.childMdx.frontmatter ||
      !post.childMdx.frontmatter.slug
    ) {
      console.log(post); // eslint-disable-line no-console
      throw Error('All posts require a `slug` field in the frontmatter.');
    }

    const { slug, images } = post.childMdx.frontmatter;

    const image = images && images[0];

    createPage({
      path: `blog/${slug}/`,
      component: require.resolve('./src/templates/post.js'),
      context: {
        imageRegex: `/${image}/`,
        slug,
      },
    });
  });

  const paginationDefaults = {
    createPage,
    component: require.resolve('./src/templates/previews.js'),
  };

  const allPosts = posts.filter(
    post => post.childMdx.frontmatter.publish !== false,
  );

  const createPages = (type, postArray, parent = 'blog') => {
    const groupedPosts = groupPostsByUnique(type, postArray);

    Object.entries(groupedPosts).forEach(([typeValue, postGroup]) => {
      paginate(
        {
          ...paginationDefaults,
          pathTemplate: `/${parent}/${type}/${typeValue}/<%= pageNumber %>/`,
          type,
          value: typeValue,
          linkRoot: parent,
        },
        postGroup,
      );
    });
  };

  createPages('tag', allPosts);
  createPages('category', allPosts);

  paginate(
    {
      ...paginationDefaults,
      pathTemplate: '/blog/<%= pageNumber %>/',
      type: 'all',
      value: null,
    },
    allPosts,
  );

  // Create an alias for the first page of blog listings.
  createRedirect({
    fromPath: '/blog/1',
    toPath: '/blog/',
    isPermanent: true,
    redirectInBrowser: true,
  });
};
