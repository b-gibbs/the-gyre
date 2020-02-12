import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import styled from '@emotion/styled';
import SEO from '../components/SEO/SEO';
import Layout from '../components/Layout';
import PostMeta from '../components/PostMeta';
import ContentArea from '../components/ContentArea';
import breakpoints from '../utils/breakpoints';

const getTitle = frontmatter => frontmatter.seo_title || frontmatter.title;

const BlogLayout = styled(Layout)({
  margin: '5rem auto 6rem',

  [breakpoints.md]: {
    maxWidth: '100%',
    width: '57ch',
  },

  [breakpoints.lg]: {
    width: 'calc(160px + 2rem + 57ch)',
  }
});

const Blog = styled('article')({
  marginBottom: '5rem',

  [breakpoints.lg]: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridColumnGap: '2rem',
    gridTemplate: 'repeat(2, auto) / 170px 1fr',
  }
});

const Header = styled('header')({
  [breakpoints.lg]: {
    gridColumnStart: 2,
  }
});
 
const Content = styled(ContentArea)({
  [breakpoints.lg]: {
    gridColumnStart: 2,
  }
});

const Meta = styled(PostMeta)({
  [breakpoints.lg]: {
    gridColumnStart: 1,
    gridRowStart: 2,
  }
});

const BlogHeading = styled('h1')({
  fontSize: '1.6rem',

  [breakpoints.md]: {
    fontSize: '1.875rem',
  }
});

export default ({ data: { post, image } }) => {
  // Prevent rerenders when footnotes/popovers change.
  const content = useMemo(() => <MDXRenderer>{post.body}</MDXRenderer>);

  return (
    <React.Fragment>
      <SEO
        frontmatter={post.frontmatter}
        postImage={image.seo.fluid.src}
        isBlogPost
      />
      <div
        source={`/${post.frontmatter.slug}/`}
        render={() => (
          <BlogLayout title={getTitle(post.frontmatter)}>
            <Blog>
              <Header>
                <BlogHeading>{post.frontmatter.title}</BlogHeading>
              </Header>
              <Meta
                thumb={image.thumb}
                categories={post.frontmatter.category}
                tags={post.frontmatter.tag}
              />
              <Content render={() => <ContentArea>{content}</ContentArea>} />
            </Blog>
          </BlogLayout>
        )}
      />
    </React.Fragment>
  );
};

export const pageQuery = graphql`
  query($slug: String!, $imageRegex: String!) {
    post: mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        category
        tag
        datePublished: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        seo_title
        slug
      }
    }
    image: file(relativePath: { regex: $imageRegex }) {
      seo: childImageSharp {
        fluid(maxWidth: 1380) {
          src
        }
      }
      thumb: childImageSharp {
        fluid(maxWidth: 690, traceSVG: { color: "#e7e3e8" }) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`;
