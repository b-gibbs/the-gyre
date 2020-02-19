import React from 'react';
import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';


  
const CloseButton = styled('button')({
  width: '32px',
  height: '32px',
  position: 'relative',
  margin: '31px 20px auto auto',
  height: '30px',
  lineHeight: '24px',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  ':hover': {
    opacity: colors.hoverOpacity,
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
      top: '8px',
      left: '0px',
      width: '100%',
      transform: 'rotate(45deg)',
    },

    ':nth-of-type(2)': {
      top: '8px',
      left: '0px',
      width: '100%',
      transform: 'rotate(-45deg)',
    },
  },
});

export default CloseButton;

