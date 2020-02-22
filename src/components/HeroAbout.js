import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import BackgroundImage from 'gatsby-background-image';
import breakpoints from '../utils/breakpoints';
import colors from 'gatsby-theme-apollo-core';

const HeroAbout = ({ className, ...props }) => (
  <StaticQuery
    query={graphql`
      query {
        image: file(relativePath: { eq: "gyre.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.image.childImageSharp.fluid
      return (
        <ImageContainer>
          <StyledBackgroundImage
            Tag="section"
            className={className}
            fluid={imageData}
            backgroundColor={"#083c88"}
          >
            <TextContainer>
              <Title>About Gyres</Title>
              <Subtitle>"Turning and turning in the widening gyre"</Subtitle>
            </TextContainer>
        
          </StyledBackgroundImage>
        </ImageContainer>
      )
    }}
  />
)

const ImageContainer = styled('div')({
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const StyledBackgroundImage = styled(BackgroundImage)({
  minWidth: '700px',
  maxWidth: '800px',
  height: '400px',
  backgroundPosition: 'bottom center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'center',
  borderRadius: '15px',
  overflow: 'hidden',
});

const TextContainer = styled('div')({
  position: 'absolute',
  left: '40px',
  bottom: '20px',
  padding: '20px',
  backgroundColor: `${transparentize(0.5, '#1d4969')}`,
  borderRadius: '10px',
});

const Title = styled('h1')({
  color: '#fff',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontWeight: 300,
  [breakpoints.md]: {
    fontSize: '1.75rem',
    marginBottom: '1.2rem',
  },
});

const Subtitle = styled('h2')({
  color: '#fff',
  opacity: 0.9,
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontStyle: "italic",
  fontWeight: 300,
  [breakpoints.md]: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
});

export default HeroAbout;
