import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';

const CatLink = styled(Link)({
  textTransform: 'lowercase',
  fontFamily: "'SFMono', 'Source Code Pro', monospace",
  fontWeight: 500,
  textDecoration: 'none',
  letterSpacing: '0.09em',
  margin: 'auto',
  padding: '0px 5px',
  backgroundColor: '#1d1e1c',
  border: '1px solid',
  borderRadius: '1em',
  display: 'inline-block',
  '&.data': {
    color: '#9cdcfe',
  },
  '&.product': {
    color: '#c685c0'
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
        <CatLink 
          className={category}
          to={`/${linkRoot}/category/${category}/`}>
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
