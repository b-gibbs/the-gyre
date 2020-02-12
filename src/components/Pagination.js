import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { colors } from 'gatsby-theme-apollo-core';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
});

const PaginationLink = styled(Link)({
  color: colors.text,
  fontSize: '0.75rem',
  margin: '0 0.5rem',
  padding: '0.25rem',

  ':first-of-type': {
    marginLeft: 0,
  },

  ':last-of-type': {
    marginRight: 0,
  },

  '&.moveRight': {
    marginLeft: 'auto',
  }
});

const Pagination = ({
  isFirstPage,
  isLastPage,
  currentPage,
  totalPages,
  linkBase,
}) => (
  <Wrapper>
    {!isFirstPage && currentPage !== 2 && (
      <PaginationLink to={linkBase} title="jump to newest posts">
        « <span className="screen-reader-text">newest posts</span>
      </PaginationLink>
    )}
    {!isFirstPage && (
      <PaginationLink
        to={`${linkBase}${currentPage - 1 === 1 ? '' : currentPage - 1}/`}
      >
        ‹ newer posts
      </PaginationLink>
    )}
    {!isLastPage && (
      <PaginationLink
        className="moveRight"
        to={`${linkBase}${currentPage + 1}/`}
      >
        older posts ›
      </PaginationLink>
    )}
    {!isLastPage && currentPage !== totalPages - 1 && (
      <PaginationLink
        to={`${linkBase}${totalPages}/`}
        title="jump to oldest posts"
      >
        <span className="screen-reader-text">oldest posts</span> »
      </PaginationLink>
    )}
  </Wrapper>
);

Pagination.propTypes = {
  isFirstPage: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  linkBase: PropTypes.string.isRequired,
};

export default Pagination;
