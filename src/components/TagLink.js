import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { colors } from 'gatsby-theme-apollo-core';

const TagLink = styled(Link)`
  color: ${colors.gray};
  display: inline-block;
  text-decoration: none;
  font-size: 0.825rem;
  line-height: 1.75;
  margin: 0 0.25rem;
  color: ${colors.primary};

  ::before {
    content: '#';
  }

  :visited {
    color: ${colors.primary};
  }

  :hover,
  :active {
    background: transparent;
    color: ${colors.secondary};
  }
`;

const Tag = ({ tag, linkRoot }) => (
  <TagLink to={`/${linkRoot}/tag/${tag}/`}>{tag}</TagLink>
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default Tag;
