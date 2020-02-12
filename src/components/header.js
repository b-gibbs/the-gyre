import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import logo from "../images/hrz-logo.png";
import { colors } from "gatsby-theme-apollo-core";
import breakpoints from '../utils/breakpoints';
import Burger from './Burger';
import NavbarBodyMobile from './NavbarBodyMobile';

const NavbarContainer = styled.nav({
  position: 'sticky',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  backgroundColor: [colors.background],
  zIndex: 990,
  height: '80px',
  width: '100%',
  margin: '0 auto',
  padding: '0 20px',
})

const NavbarBody = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: '80px',
  width: '100%',
  padding: '0 15px',
  margin: '0 auto',
})

const LogoLink = styled(Link)({
  width: '180px',
  minWidth: '180px',
  marginRight: '0.5rem',
})

const Logo = styled.img({
  width: '180px',
  pointerEvents: 'none',
})

const NavbarMenu = styled.nav({
  display: 'flex',
  zIndex: 999,
  paddingLeft: '20px',
  [breakpoints.nm]: {
    visibility: 'hidden',
    opacity: 0,
    display: 'none',
  },
})

const NavbarItem = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 300,
  color: [colors.text1],
  textDecoration: 'none',
  border: '2px solid transparent',
  borderRight: 'none',
  borderLeft: 'none',
  marginRight: '16px',
  transition: 'all 250ms ease-out',
  ':hover': {
    opacity: colors.hoverOpacity,
    color: colors.primary,
  }
})

const NavbarA = styled('a')({
  display: 'flex',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 300,
  color: [colors.text1],
  textDecoration: 'none',
  border: '2px solid transparent',
  borderRight: 'none',
  borderLeft: 'none',
  marginRight: '16px',
  transition: 'all 250ms ease-out',
  ':hover': {
    opacity: colors.hoverOpacity,
    color: colors.primary,
  }
})


const NavbarBurger = styled.div({
  display: 'flex',
  margin: '0 0 0 auto',
  zIndex: 1000,
  boxSizing: 'border-box',
})





const topLevelNav = [
  {
    href: "/blog/",
    label: "Blog",
  },
]

const Header = () => {

  const [open, setOpen] = useState(false);

  return (
    <NavbarContainer className='navbar-container' role="banner" >
      <NavbarBody className='navbar-body'>
        <LogoLink to="/" className='navbar-logo'>
          <Logo
            src={logo}
            alt="Data ∩ Product"
            // This keeps the logo from flashing at full-width on fresh loads.
            style={{ maxWidth: "180px" }}
          />
        </LogoLink>
        <NavbarMenu className='navbar-menu'>
          <NavbarA href='https://thegyre.io/data/'>Data Science</NavbarA>
          <NavbarA href='https://thegyre.io/product/'>Product Management</NavbarA>
          {topLevelNav.map(({ href, label, extraClass = "" }) => (
            <NavbarItem
              key={label}
              to={href}
              className={`${extraClass} text-sharp`}
              activeClassName="active"
            >
              {label}
            </NavbarItem>
          ))}
        </NavbarMenu>
        <NavbarBurger className='navbar-burger'>
          <Burger open={open} setOpen={setOpen} />
        </NavbarBurger>
      </NavbarBody>
      <NavbarBodyMobile className='navbar-body-mobile' open={open} setOpen={setOpen} />
    </NavbarContainer>
  )
};


export default Header;
