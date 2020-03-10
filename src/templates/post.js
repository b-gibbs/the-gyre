import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import styled from '@emotion/styled';
import SEO from '../components/SEO/SEO';
import Layout from '../components/Layout';
import { PageBody } from '$styles';
import { colors } from 'gatsby-theme-apollo-core';



const Title = styled('h2')({
  color: colors.primary,
  width: '100%',
  textAlign: 'center',
})

const Subtitle = styled('h4')({
  color: colors.text1,
  width: '100%',
  textAlign: 'center',
  marginBottom: '30px',
})

export default ({ data: { post, image } }) => {
  const content = useMemo(() => <MDXRenderer>{post.body}</MDXRenderer>);

  return (
    <React.Fragment>
      <SEO
        frontmatter={post.frontmatter}
        isBlogPost
      />
      <Layout>
        <PageBody>
          <Title>{post.frontmatter.title}</Title>
          <Subtitle>{post.frontmatter.subtitle}</Subtitle>
          {content}
        </PageBody>
      </Layout>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $imageRegex: String!) {
    post: mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        subtitle
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
