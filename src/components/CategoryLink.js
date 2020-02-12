import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';

const CatLink = styled(Link)({
  backgroundColor: colors.text2,
  borderRadius: '1em',
  color: colors.primaryLight,
  lineHeight: 1,
  margin: '({ block }) => (block ? 0.25rem : 0) 0.125rem 0',
  padding: '0.125rem 0.5rem 0.2rem',
  textDecoration: 'none',
  transition: 'background-color 150ms linear',
  display: 'inline-block',

  '& + &': {
    marginTop: '0.125rem',
  },

  ':focus, :hover, :active': {
    backgroundColor: colors.primary,
    borderRadius: '1em',
  }
});

const CategoryLink = React.memo(({ category, block = false, linkRoot }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            categories {
              slug
              name
            }
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { categories },
      },
    }) => {
      const cat = categories.find(c => c.slug === category) || {};

      return (
        <CatLink to={`/${linkRoot}/category/${category}/`}>
          {cat.name ? cat.name : category}
        </CatLink>
      );
    }}
  />
));

CategoryLink.propTypes = {
  category: PropTypes.string.isRequired,
  block: PropTypes.bool,
};

export default CategoryLink;
