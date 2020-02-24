import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import logo from "../images/hrz-logo.png";
import { colors } from "gatsby-theme-apollo-core";
import breakpoints from '../utils/breakpoints';
import Burger from './Burger';
import NavbarBodyMobile from './NavbarBodyMobile';
import Search from './Search';

const NavbarContainer = styled.nav({
  position: 'sticky',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  backgroundColor: colors.background,
  zIndex: 990,
  height: '80px',
  width: '100%',
  margin: '0 auto',
  padding: '0 20px',
})

const NavbarBody = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '80px',
  padding: '0 15px',
  margin: '0 0 0 1rem',
  [breakpoints.md]: {
    width: '30%',
  }
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
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  zIndex: 999,
  paddingLeft: '20px',
  [breakpoints.md]: {
    visibility: 'hidden',
    opacity: 0,
    display: 'none',
  },
})

const Navleft = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const NavbarItem = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 300,
  color: colors.text1,
  textDecoration: 'none',
  marginRight: '16px',
  transition: 'all 250ms ease-out',
  ':hover': {
    opacity: colors.hoverOpacity,
    color: colors.primary,
  },
  '&.active': {
    color: colors.primary,
  },
  [breakpoints.lg]: {
    fontSize: '18px',
    marginRight: '12px',
  },
})

const NavbarA = styled('a')({
  display: 'flex',
  alignItems: 'center',
  fontSize: '20px',
  fontWeight: 300,
  color: colors.text1,
  textDecoration: 'none',
  marginRight: '16px',
  transition: 'all 250ms ease-out',
  ':hover': {
    opacity: colors.hoverOpacity,
    color: colors.primary,
  },
  [breakpoints.lg]: {
    fontSize: '18px',
    marginRight: '12px',
  },
})

const NavbarSearchMobile = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const NavbarBurger = styled.div({
  display: 'flex',
  margin: '0 0 0 2rem',
  zIndex: 1000,
  boxSizing: 'border-box',
});

const topLevelNav = [
  {
    href: "/blog/",
    label: "Blog",
  },
  {
    href: "/resources/",
    label: "Resources",
  },
];

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
          <Navleft className='nav-left'>
            <NavbarA href='https://thegyre.io/data/'>Data Science</NavbarA>
            <NavbarA href='https://thegyre.io/product/'>Product Management</NavbarA>
            {topLevelNav.map(({ href, label, extraClass = "" }) => (
              <NavbarItem
                key={label}
                to={href}
                className={`${extraClass} text-sharp`}
                activeClassName="active"
                partiallyActive={true}
              >
                {label}
              </NavbarItem>
            ))}
          </Navleft>
          <Search />
        </NavbarMenu>
       
      </NavbarBody>
      <NavbarSearchMobile>
        <NavbarBurger> 
          <Burger open={open} setOpen={setOpen} />
        </NavbarBurger>
      </NavbarSearchMobile>
      <NavbarBodyMobile className='navbar-body-mobile' open={open} setOpen={setOpen} />
    </NavbarContainer>
  )
};


export default Header;
