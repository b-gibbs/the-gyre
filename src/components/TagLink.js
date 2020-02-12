import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { colors } from 'gatsby-theme-apollo-core';

const TagLink = styled(Link)({
  color: colors.text4,
  display: 'inline-block',
  fontSize: '0.625rem',
  lineHeight: 1.75,
  margin: '0 0.125rem',
  transition: 'color 150ms linear',

  ':before': {
    content: '#',
  },

  ':hover, :active': {
    background: 'transparent',
    color: 'colors.primary',
  }
});

const Tag = ({ tag, linkRoot }) => (
  <TagLink to={`/${linkRoot}/tag/${tag}/`}>{tag}</TagLink>
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};



export default Tag;
