import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';

export const Blockquote = styled('blockquote')({
  display: 'block',
  borderWidth: '2px 0',
  borderStyle: 'solid',
  borderColor: colors.divider,
  padding: '1.5em 0 0.5em',
  margin: '1.5em 0',
  position: 'relative',
  
  '::before': {
    content: 'open-quote',
    position: 'absolute',
    top: '0em',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: colors.white,
    width: '3rem',
    height: '2rem',
    font: '6em/1.08em sans-serif',
    color: '#666',
    textAlign: 'center',
  },

  '::after': {
    content: '"—" attr(cite)',
    display: 'block',
    textAlign: 'right',
    fontSize: '0.875em',
    color: colors.secondary,
  },
});

