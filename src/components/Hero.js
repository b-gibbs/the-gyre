import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import BackgroundImage from 'gatsby-background-image';
import breakpoints from '../utils/breakpoints';

const BackgroundSection = ({ className, ...props }) => (
  <StaticQuery
    query={graphql`
      query {
        image: file(relativePath: { eq: "circuits-bkd.png" }) {
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
        <BackgroundImage
          Tag="section"
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
        >
          <TextContainer>
            <Title>{props.title}</Title>
            <Subtitle>{props.subtitle}</Subtitle>
          </TextContainer>
        
        </BackgroundImage>
      )
    }}
  />
)

const Hero = styled(BackgroundSection)({
  width: '100%',
  height: '240px',
  backgroundPosition: 'bottom center',
  backgroundRepeat: 'repeat-y',
  backgroundSize: 'cover',
});

const TextContainer = styled('div')({
  position: 'absolute',
  left: '40px',
  bottom: '20px',
  margin: '20px',
  backgroundColor: `${transparentize(0.5, '#080d0d')}`,
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
  fontWeight: 300,
  [breakpoints.md]: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
});

export default Hero;