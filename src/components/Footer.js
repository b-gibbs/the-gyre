import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';
import breakpoints from '../utils/breakpoints';

const FooterDiv = styled('div')({
  height: '8rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: colors.background2,
})

const Copy = styled('p')({
  fontSize: '11px',
  color: colors.text2,

  a: {
    textDecoration: 'none',
    color: colors.primary,

    ':focus, :hover, :active, :visited': {
      color: colors.primary,
    }
  }
});

const Pages = styled('p')({
  marginTop: '20px',
  fontSize: '16px',
  color: colors.text1,
})

const StyledLink = styled(Link)({
  color: colors.text2,
  textDecoration: 'none',
  margin: '10px 10px 0 10px',
});

const LinkA = styled('a')({
  color: colors.text2,
  textDecoration: 'none',
  margin: '10px 10px 0 10px',
});

export default () => (
  <FooterDiv>
    <Pages>
      <StyledLink to='/'>Home</StyledLink>
      <LinkA href='https://thegyre.io/data'>Data Science</LinkA>
      <LinkA href='https://thegyre.io/product'>Product Management</LinkA>
      <StyledLink to='/blog'>Blog</StyledLink>
      <StyledLink to='/about'>About</StyledLink>
    </Pages>
    <Copy>All content &copy;
      <a href='https://www.linkedin.com/in/bradley-gibbs/'> Bradley Gibbs</a>
    </Copy>
  </FooterDiv>

);

