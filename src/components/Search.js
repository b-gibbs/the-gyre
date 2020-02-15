import React, { useState } from 'react';
import styled from '@emotion/styled';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  connectHits,
  connectSearchBox,
  InstantSearch,
  Highlight,
} from 'react-instantsearch-dom';
import { MdSearch } from 'react-icons/md';
import Overlay from './Overlay/Overlay';
import { colors } from 'gatsby-theme-apollo-core';
import breakpoints from '../utils/breakpoints';

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const SearchArea = styled('div')({
  height: '100vh',
  marginTop: 0,
  overflowY: 'scroll',
  padding: '3rem 5%',
  width: '100%',
});

const List = styled('ul')({
  listStyle: 'none',
  margin: '0 auto',
  maxWidth: '650px',
  padding: 0,
});

const Result = styled('li')({
  marginTop: '2rem',
});

const Heading = styled('h2')({
  fontSize: '1.25rem',
  fontWeight: 600,

  'a': {
    color: colors.heading,
    textDecoration: 'none',
    
    ':active, :hover, :focus': {
      color: colors.primaryLight,
    },
  },
});

const Link = styled('a')({
  display: 'inline-block',
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
  marginTop: '0.5rem',
  textDecoration: 'none',
  textTransform: 'uppercase',
});

const Hits = connectHits(({ hits }) => (
  <List>
    {hits.map(hit => (
      <Result key={hit.objectID}>
        <Heading>
          <a href={`/${hit.slug}`}>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </a>
        </Heading>
        <p>
          <Highlight attribute="description" hit={hit} tagName="mark" />
        </p>
        <Link href={`/${hit.slug}`}>Read this post &rsaquo;</Link>
      </Result>
    ))}
  </List>
));

const OpenSearch = styled('a')({
  alignSelf: 'center',
  border: '2px solid transparent',
  color: colors.heading,
  height: '100%',
  margin: 0,
  padding: '0 0.625rem',
  width: '2.375rem',

  ':active, :focus, :hover': {
    backgroundColor: 'transparent',
    color: colors.primary,
  },

  ':focus': {
    border: '2px solid',
    borderColor: colors.text1,
    borderRadius: 0,
  },

  [breakpoints.sm]: {
    width: '2.5rem',
  },
});

const Icon = styled(MdSearch)({
  height: '100%',
  margin: 0,
  position: 'relative',
  top: '-0.125em',
});

const Label = styled('label')({
  diplay: 'block',
  margin: '0 auto',
  maxWidth: '650px',
});

const Input = styled('input')({
  border: '2px solid',
  borderColor: colors.text4,
  borderRadius: '4px',
  display: 'block',
  fontSize: '1.25rem',
  marginTop: 0,
  padding: '0.5rem 0.75rem',
  width: '100%',
});

const SearchCredit = styled('p')({
  color: colors.text4,
  fontSize: '0.75rem',
  margin: '0.25rem auto 0',
  maxWidth: '650px',
  textAlign: 'right',

  'a': {
    color: 'inherit',
  },
});

const Search = connectSearchBox(({ currentRefinement, refine, setActive }) => (
  <form noValidate action="" role="search">
    <Label htmlFor="search">
      <span>Search the Blog</span>
      <Input
        type="search"
        id="search"
        value={currentRefinement}
        onBlur={() => {
          if (currentRefinement === '') {
            setActive(false);
          }
        }}
        onChange={event => {
          setActive(true);
          refine(event.currentTarget.value);
        }}
      />
    </Label>
    <SearchCredit>
      Search powered by <a href="https://www.algolia.com">Algolia</a>
    </SearchCredit>
  </form>
));

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  marginLeft: 'auto',
  marginTop: 0,
})

export default () => {
  const [active, setActive] = useState(false);

  return (
    <InstantSearch
      searchClient={client}
      indexName="lengstorf-blog"
      root={{ Root: SearchContainer }}
    >
      <Configure distinct={1} />

      <OpenSearch
        href="/search"
        onClick={event => {
          event.preventDefault();
          setActive(true);
        }}
      >
        <Icon title="Search the blog" />
      </OpenSearch>

      <Overlay hidePopover={() => setActive(false)} visible={active}>
        {active && (
          <SearchArea>
            <Search setActive={setActive} />

            <Hits />
          </SearchArea>
        )}
      </Overlay>
    </InstantSearch>
  );
};
