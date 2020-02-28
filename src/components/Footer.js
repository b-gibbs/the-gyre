import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';
import breakpoints from '../utils/breakpoints';

const Footer = styled('footer')({
  fontSize: '1rem',
  paddingBottom: '2rem',
  textAlign: 'center',
  width: '100%',
  backgroundColor: colors.background2,
  [breakpoints.md]: {
    fontSize: '0.75rem'
  }
})

const Copyright = styled('div')({
  color: colors.text2,
  display: 'inline-block',
  margin: '0 0.25rem',
  padding: '0.25rem',
  display: 'block',
  marginTop: '0.5rem',

  a: {
    textDecoration: 'none',
    color: colors.primary,
    ':active, :hover, :focus, :visited': {
      color: colors.primary,
    }
  }
});

const FooterLink = styled(Link)({
  color: colors.text2,
  display: 'inline-block',
  margin: '0 0.25rem',
  padding: '0.25rem',
  textDecoration: 'none',

  ':active, :hover, :focus': {
    color: colors.secondary,
  },

  [breakpoints.md]: {
    order: 2,

    ':&:last-of-type': {
      marginRight: 0,
    }
  }
});

const FooterLinkA = styled(Link)({
  color: colors.text2,
  display: 'inline-block',
  margin: '0 0.25rem',
  padding: '0.25rem',
  textDecoration: 'none',

  ':active, :hover, :focus': {
    color: colors.secondary,
  },

  [breakpoints.md]: {
    order: 2,

    ':&:last-of-type': {
      marginRight: 0,
    }
  }
});

export default () => (
  <Footer>
    <FooterLink to='/'>Home</FooterLink>
    <FooterLinkA href='https://thegyre.io/data'>Data</FooterLinkA>
    <FooterLinkA href='https://thegyre.io/product'>Product</FooterLinkA>
    <FooterLink to='/blog'>Blog</FooterLink>
    <FooterLink to='/resources'>Resources</FooterLink>
    <FooterLink to='/about'>About</FooterLink>
    <br />
    <Copyright>All content &copy;
      <a href='https://linkedin.com/in/bradleygibbs'> Bradley Gibbs</a></Copyright>
  </Footer>
);

