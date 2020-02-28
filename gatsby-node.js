const path = require('path');
const { template, chunk } = require('lodash');
const fs = require('fs');

/* POSTS */
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

/* RESOURCES */
const getUniqueResources = (field, resources) =>
  resources.reduce((uniques, resource) => {
    const values = resource.childMdx.frontmatter[field];

    return uniques.concat(values.filter(val => !uniques.includes(val)));
  }, []);

const groupResourcesByUnique = (field, resources) => {
  const uniqueValues = getUniqueResources(field, resources);

  return uniqueValues.reduce(
    (grouped, unique) => ({
      ...grouped,
      [unique]: resources.filter(resource =>
        resource.childMdx.frontmatter[field].includes(unique),
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
const paginateResources = (
  { pathTemplate, createPage, component, type, value, linkRoot = "resources" },
  resources
) =>
  chunk(resources, 10).forEach((resourceGroup, index, allResourceGroups) => {
    const isFirstPage = index === 0
    const currentPage = index + 1
    const totalPages = allResourceGroups.length
    const getPath = template(pathTemplate)
    const pagePath = getPath({ pageNumber: isFirstPage ? "" : currentPage })

    createPage({
      path: pagePath.replace("//", "/"),
      component,
      context: {
        resourceGroup,
        type,
        value,
        currentPage,
        totalPages,
        isFirstPage,
        isLastPage: currentPage === totalPages,
        linkBase: getPath({ pageNumber: "" }),
        linkRoot,
      },
    })
  })



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
              date
              title
              description
              slug
              path
              category
              section
              tag
              images 
              publish
            }
          }
        }
      }
      resources: allFile(
        filter: {relativePath: {glob: "resources/**/*.{md,mdx}"}}, 
        sort: {fields: childMdx___frontmatter___priority, order: ASC}
        ) {
        nodes {
          id
          childMdx {
            frontmatter {
              title
              subtitle
              author
              pubYear
              type
              action
              category
              section
              slug
              path
              tag
              description
              priority
              url
              publish
              coverImage {
                childImageSharp {
                  fluid(maxWidth: 120) {
                    aspectRatio
                    originalImg
                    originalName
                    presentationHeight
                    presentationWidth
                    sizes
                    srcSetWebp
                    srcSet
                    srcWebp
                    tracedSVG
                    src
                    base64
                  }
                }
              }
            }
          }
          relativePath
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
    reporter.info('Created post')
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
  reporter.info('Created post previews page')

  // Create an alias for the first page of blog listings.
  createRedirect({
    fromPath: '/blog/1',
    toPath: '/blog/',
    isPermanent: true,
    redirectInBrowser: true,
  });
/* END POSTS */

/* START RESOURCES */
  const resources = result.data.resources.nodes.filter(
    resource => resource.childMdx.frontmatter.publish !== false,
  );

  resources.forEach(resource => {
    if (
      !resource.childMdx ||
      !resource.childMdx.frontmatter ||
      !resource.childMdx.frontmatter.slug
    ) {
      console.log(resource); // eslint-disable-line no-console
      throw Error('All resources require a `slug` field in the frontmatter.');
    }

    const { slug } = resource.childMdx.frontmatter;

    createPage({
      path: `resources/${slug}/`,
      component: require.resolve('./src/templates/resource.js'),
      context: {
        slug,
      },
    });
    reporter.info('Created resource page')
  });
  
  const resourcePaginationDefaults = {
    createPage,
    component: require.resolve('./src/templates/resources.js'),
  };

  const allResources = resources.filter(
    resource => resource.childMdx.frontmatter.publish !== false,
  );

  const createResourcePages = (type, resourceArray, parent = 'resources') => {
    const groupedResources = groupResourcesByUnique(type, resourceArray);

    Object.entries(groupedResources).forEach(([typeValue, resourceGroup]) => {
      paginateResources(
        {
          ...resourcePaginationDefaults,
          pathTemplate: `/${parent}/${type}/${typeValue}/<%= pageNumber %>/`,
          type,
          value: typeValue,
          linkRoot: parent,
        },
        resourceGroup,
      );
    });
  };

  createResourcePages('tag', allResources);
  createResourcePages('category', allResources);

  paginateResources(
    {
      ...resourcePaginationDefaults,
      pathTemplate: '/resources/<%= pageNumber %>/',
      type: 'all',
      value: null,
    },
    allResources,
  );

  // Create an alias for the first page of blog listings.
  createRedirect({
    fromPath: '/resources/1',
    toPath: '/resources/',
    isPermanent: true,
    redirectInBrowser: true,
  });
};
