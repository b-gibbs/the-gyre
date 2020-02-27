import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import styled from '@emotion/styled';
import SEO from '../components/SEO/SEO';
import Layout from '../components/Layout';
import ContentArea from '../components/ContentArea';
import { colors } from 'gatsby-theme-apollo-core';
import breakpoints from '../utils/breakpoints';

const BlogLayout = styled(Layout)({
  margin: '5rem auto 6rem',
  maxWidth: '1000px',
});


const Blog = styled('div')({
  marginBottom: '5rem',
})

const Header = styled('header')({
  fontSize: '24px',
  color: colors.text1,
  margin: '40px',

  [breakpoints.sm]: {
    margin: '10px 20px',
  }
});


const Content = styled(ContentArea)({
  margin: '40px',

  [breakpoints.sm]: {
    margin: '10px 20px',
  }
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
        isBlogPost
      />
      <BlogLayout title={post.frontmatter.title}>
        <Blog>
          <Header>
            <BlogHeading>{post.frontmatter.title}</BlogHeading>
          </Header>
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
