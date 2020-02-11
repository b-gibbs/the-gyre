import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';
import { rgba } from 'polished';

const NavbarBodyMobile = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;

  return (
    <StyledBody open={open} aria-hidden={!isHidden} {...props}>
      <NavbarMenuMobile>
        <StyledLink to='/'open={open}>Home</StyledLink>
        <StyledLink to='/data'open={open}>Data Science</StyledLink>
        <StyledLink to='/product'open={open}>Product Management</StyledLink>
        <StyledLink to='/blog'open={open}>Blog</StyledLink>
      </NavbarMenuMobile>
    </StyledBody>
  )
}

NavbarBodyMobile.propTypes = {
  open: PropTypes.bool.isRequired,
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
  left: '0px',
  right: '0px',
  paddingTop: '10px',
  minHeight: '200px',
  minWidth: '250px',
  transition: 'all 0.25s ease-out',
  '@media (min-width: 576px)': {
    margin: 'auto',
    maxWidth: '580px',
  },
  '@media (min-width: 0)': {
    display: 'flex',
    opacity: props.open ? 1 : 0,
    visibility: props.open ? 'visible' : 'hidden',
    margin: '0 20px',
  },
  '@media (min-width: 620px)': {
    opacity: 0,
    visibility: 'hidden',
  }
})
)

const NavbarMenuMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  color: colors.text2,
  fontSize: '16px',
  fontWeight: 400,
})
 
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
})
)