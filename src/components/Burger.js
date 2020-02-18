import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { colors } from 'gatsby-theme-apollo-core'
import breakpoints from '../utils/breakpoints'

const Burger = ({ open, setOpen, ...props }) => {
  
  const isExpanded = open ? true : false;
  
  return (
    <BurgerCloseIcon aria-label="Toggle menu" aria-expanded={isExpanded} open={open} onClick={() => setOpen(!open)} {...props}>
      <span />
      <span />
      <span />
      <span />
    </BurgerCloseIcon>
  )
}

Burger.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Burger;

const BurgerCloseIcon = styled.div(props => ({
  width: '32px',
  height: '32px',
  position: 'relative',
  margin: '13px auto auto',
  lineHeight: '24px',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  ':hover': {
    opacity: colors.hoverOpacity,
  },
  transition: 'all 0.25s ease-in-out',
  transform: 'rotate(0deg)',
  visibility: 'hidden',
  opacity: 0,
  [breakpoints.md]: {
    visibility: 'visible',
    opacity: 1,
  },

  span: {
    display: 'block',
    position: 'absolute',
    height: '3px',
    background: colors.text1,
    borderRadius: '3px',
    opacity: 1,
    transition: 'all 250ms ease-in-out',
    ':first-of-type': {
      width: props.open ? 0 : '100%',
      top: props.open ? '18px' : '0px',
      left: props.open ? '50%' : '0px',
    },

    ':nth-of-type(2)': {
      top: '8px',
      left: '0px',
      width: '100%',
      transform: props.open ? 'rotate(45deg)' : 'rotate(0)',
    },

    ':nth-of-type(3)': {
      top: '8px',
      left: '0px',
      width: '100%',
      transform: props.open ? 'rotate(-45deg)' : 'rotate(0)',
    },

    ':nth-of-type(4)': {
      width: props.open ? 0 : '100%',
      top: props.open ? '18px' : '16px',
      left: props.open ? '50%' : '0px',
    },
  },
}))