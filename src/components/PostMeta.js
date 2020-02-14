import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import CategoryLink from './CategoryLink';
import TagLink from './TagLink';
import { colors } from 'gatsby-theme-apollo-core';
import breakpoints from '../utils/breakpoints';

const Wrapper = styled('aside')({
  color: colors.text3,
  display: 'none',
  fontSize: '0.625rem',
  textAlign: 'center',

  [breakpoints.lg]: {
    display: 'block',
  }
});

const StickyContainer = styled('div')({
  [breakpoints.lg]: {
    position: 'sticky',
    top: '5rem',
  },
});

const Image = styled(Img)({
  display: 'block',
  border: '1px solid rgba(214, 209, 230, 0.5)'
});

const Text = styled('p')({
  marginTop: '0.75rem',
});

const PostMeta = ({
  thumb,
  categories,
  tags,
  className,
  linkRoot = 'blog',
}) => (
  <Wrapper className={className}>
    <StickyContainer>
      <Image
        style={{ display: 'inherit' }}
        alt="Jason Lengstorf."
        fluid={thumb.fluid}
      />
      <Text>Posted in:</Text>
      {categories.map(category => (
        <CategoryLink
          key={`category-${category}`}
          category={category}
          linkRoot={linkRoot}
          block
        />
      ))}
      <Text>Tags:</Text>
      {tags.map(tag => (
        <TagLink key={`tag-${tag}`} linkRoot={linkRoot} tag={tag} />
      ))}
      <Text>
        If you want to get more posts like this,{' '}
        <Link to="/newsletter/">join my newsletter</Link>.
      </Text>
    </StickyContainer>
  </Wrapper>
);

PostMeta.propTypes = {
  className: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumb: PropTypes.shape({
    fluid: PropTypes.any,
  }).isRequired,
};

export default PostMeta;
