import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import styled from '@emotion/styled';
import SEO from '../components/SEO/SEO';
import Layout from '../components/Layout';
import PostMeta from '../components/PostMeta';
import ContentArea from '../components/ContentArea';
import { colors } from 'gatsby-theme-apollo-core';
import breakpoints from '../utils/breakpoints';

const getTitle = frontmatter => frontmatter.seo_title || frontmatter.title;

const BlogLayout = styled(Layout)({
  margin: '5rem auto 6rem',
});


const Blog = styled('article')({
  marginBottom: '5rem',
  display: 'grid',
  gridAutoFlow: 'column',
  gridColumnGap: '2rem',
  gridTemplate: 'repeat(2, auto) / 170px 1fr',
})

const Header = styled('header')({
  fontSize: '24px',
  color: colors.text1,
  gridColumnStart: 2,
});


const Content = styled(ContentArea)({
  gridColumnStart: 2,
});

const Meta = styled(PostMeta)({
  gridColumnStart: 1,
  gridRowStart: 2,
});

const BlogHeading = styled('h1')({
  fontSize: '1.6rem',
  color: colors.primary,

  [breakpoints.md]: {
    fontSize: '1.875rem',
  }
});


export default ({ data: { post, image } }) => {
  const content = useMemo(() => <MDXRenderer>{post.body}</MDXRenderer>);

  return (
    <React.Fragment>
      <SEO
        frontmatter={post.frontmatter}
        postImage={image.seo.fluid.src}
        isBlogPost
      />
      <BlogLayout title={post.frontmatter.title}>
        <Blog>
          <Header>
            <BlogHeading>{post.frontmatter.title}</BlogHeading>
          </Header>
          <Meta
            thumb={image.thumb}
            categories={post.frontmatter.category}
            tags={post.frontmatter.tag}
          />
          <Content>{content}</Content>
        </Blog>
      </BlogLayout>
    </React.Fragment>
  )
}

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
