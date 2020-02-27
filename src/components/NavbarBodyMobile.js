import React, { useRef } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';
import { rgba } from 'polished';
import Search from './Search';
import breakpoints from '../utils/breakpoints';

const NavbarBodyMobile = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;

  return (
    <>
      <NavbarMenuMobile>
        <StyledLink to='/'open={open}>Home</StyledLink>
        <StyledLinkA href='https://thegyre.io/data'open={open}>Data Science</StyledLinkA>
        <StyledLinkA href='https://thegyre.io/product'open={open}>Product Management</StyledLinkA>
        <StyledLink to='/blog' open={open}>Blog</StyledLink>
        <StyledLink to='/resources' open={open}>Resources</StyledLink>
        <StyledLink to='/search' open={open}>Search</StyledLink>
      </NavbarMenuMobile>
    </>
  )
}


export default NavbarBodyMobile;


const StyledBody = styled.div(props => ({
  backgroundColor: '#fff',
  borderRadius: '3px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  color: colors.text2,
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '17px',
  right: '8px',
  width: '300px',
  marginLeft: 'auto',
  minHeight: '200px',
  minWidth: '250px',
  transition: 'all 0.25s ease-out',
  opacity: props.open ? 1 : 0,
  visibility: props.open ? 'visible' : 'hidden',
  [breakpoints.sm]: {
    maxWidth: '546px',
  },
  [breakpoints.md]: {
    maxWidth: '580px',
  },
}));

const NavbarMenuMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  color: colors.text2,
  fontSize: '16px',
  fontWeight: 400,
  padding: '20px',
});
 
const StyledLink = styled(Link)(props => ({
  backgroundColor: rgba(0, 0, 0, 0, 0),
  color: colors.text2,
  display: 'block',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '30px',
  padding: '10px 20px',
  textDecorationColor: colors.text2,
  textDecorationLine: 'none',
  textDecorationStyle: 'solid',
  transition: 'all 0.25s ease-out',
  visibility: props.open ? 'visible' : 'hidden',
  '&:hover': {
    color: colors.primary,
  }
}));

const StyledLinkA = styled('a')(props => ({
  backgroundColor: rgba(0, 0, 0, 0, 0),
  color: colors.text2,
  display: 'block',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '30px',
  padding: '10px 20px',
  textDecorationColor: colors.text2,
  textDecorationLine: 'none',
  textDecorationStyle: 'solid',
  transition: 'all 0.25s ease-out',
  visibility: props.open ? 'visible' : 'hidden',
  '&:hover': {
    color: colors.primary,
  }
}));