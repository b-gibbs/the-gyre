import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import BackgroundImage from 'gatsby-background-image';
import breakpoints from '../utils/breakpoints';
import { colors } from 'gatsby-theme-apollo-core';

const BackgroundSection = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        image: file(relativePath: { eq: "gyre.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1000) {
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
        <>
          <BackgroundImage
            Tag="section"
            className={className}
            fluid={imageData}
            backgroundColor={`#fff`}
            objectFit='cover'
            objectPosition='50% 50%'
          >
            <TextContainer>
              <Title>About Gyres</Title>
            </TextContainer>
          </BackgroundImage>
          <PhotoCredit>
            <PhotoDesc>
              Viking Gyre, a spiral of icebergs in the Arctic North Atlantic.
            </PhotoDesc>
            <Credit>
              Credit: Nia Power via National Geographic
            </Credit>
          </PhotoCredit>
        </>
      )
    }}
  />
)

const HeroAbout = styled(BackgroundSection)({
  width: '100vw',
  height: '400px',
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
  margin: 0,
  [breakpoints.md]: {
    fontSize: '1.75rem',
  },
});

const PhotoCredit = styled('div')({
  width: '90vw',
  position: '50%',
  margin: '0 auto',
  fontSize: '12px',
  color: colors.text4,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  
  [breakpoints.sm]: {
    gridTemplateColumns: '100%',
  },
})

const PhotoDesc = styled('p')({
  fontSize: 'inherit',
  justifySelf: 'start',
  marginBottom: '4px',
});

const Credit = styled('p')({
  fontSize: 'inherit',
  marginBottom: '4px',
  justifySelf: 'end',
  [breakpoints.sm]: {
    justifySelf: 'start',
  }
});

export default HeroAbout;