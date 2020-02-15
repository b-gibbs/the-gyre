import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';

const CloseButton = styled('button')({
  background: 'transparent',
  border: 'none',
  color: colors.text4,
  cursor: 'pointer',
  fontSize: '0.75rem',
  fontWeight: 300,
  letterSpacing: '0.1em',
  margin: 0,
  position: 'absolute',
  textTransform: 'uppercase',
  top: '0.5rem',
  right: '0.5rem',

  '::after': {
    content: 'x',
    fontSize: '115%',
    marginLeft: '4px',
  }
});

export default CloseButton;
