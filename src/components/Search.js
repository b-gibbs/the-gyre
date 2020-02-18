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
import { FaSearch } from 'react-icons/fa';
import Overlay from './Overlay/Overlay';
import { colors } from 'gatsby-theme-apollo-core';

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const SearchArea = styled('div')`
  height: 100vh;
  margin-top: 0;
  overflow-y: scroll;
  padding: 3rem 5%;
  width: 100%;
`;

const List = styled('ul')`
  list-style: none;
  margin: 0 auto;
  max-width: 650px;
  padding: 0;
`;

const Result = styled('li')({
  padding: 0,
  margin: 0,
  height: '100%',
  borderRadius: 4,
  color: colors.text1,
  textDecoration: 'none',
  backgroundColor: 'transparent',
  transitionProperty: 'color, background-color',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
  '@media (hover: hover)': {
    ':hover': {
      color: 'white',
      backgroundColor: colors.highlight3,
    }
  }
});

const Link = styled('a')({
  fontSize: '0.75rem',
  textDecoration: 'none',
});

const ResultWrapper = styled('div')({
  textDecoration: 'none',
  'mark': {
    color: colors.secondary,
    backgroundColor: 'transparent',
  }
});

const Description = styled('p')({
  paddingLeft: '1rem',
  color: colors.text3,
})

const Heading = styled('h2')({
  fontSize: '1.25rem',
  fontWeight: 500,
  paddingTop: '1rem',
  paddingLeft: '1rem',
  color: colors.text1,

  a: {
    textDecoration: 'none',
    color: colors.text1,
  },
});

const StyledHR = styled('hr')({
  borderColor: colors.divider,
  margin: '0 1rem',
  padding: 0,
});

const Hits = connectHits(({ hits }) => (
  <List>
    {hits.map(hit => (
      <Result key={hit.objectID}>
        <Link href={`https://thegyre.io/${hit.slug}`}>
          <ResultWrapper> 
            <Heading>
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </Heading>
            <Description>
              <Highlight attribute="description" hit={hit} tagName="mark" />
            </Description>
            
          </ResultWrapper>
        </Link>
        <StyledHR />
      </Result>
    ))}
  </List>
));

const OpenSearch = styled('a')`
  align-self: center;
  border: 2px solid transparent;
  color: ${colors.text1};
  height: 100%;
  margin: 0;
  padding: 0 0.625rem;
  width: 2.375rem;

  :active,
  :focus,
  :hover {
    background-color: transparent;
    color: ${colors.primaryDark};
  }

  :focus {
    border: 2px solid ${colors.darkest};
    border-radius: 0;
  }

  @media (max-width: 576px) {
    width: 2.5rem;
  }
`;

const Icon = styled(FaSearch)`
  height: 100%;
  margin: 0;
  position: relative;
  top: -0.125em;
`;

const Label = styled('label')`
  display: block;
  margin: 0 auto;
  max-width: 650px;
`;

const Input = styled('input')`
  border: 2px solid ${colors.text3};
  border-radius: 4px;
  display: block;
  font-size: 1.25rem;
  margin-top: 0;
  padding: 0.5rem 0.75rem;
  width: 100%;
`;

const SearchCredit = styled('p')`
  color: ${colors.text3};
  font-size: 0.75rem;
  margin: 0.25rem auto 0;
  max-width: 650px;
  text-align: right;

  a {
    color: inherit;
  }
`;

const Search = connectSearchBox(({ currentRefinement, refine, setActive }) => (
  <form noValidate action="" role="search">
    <Label htmlFor="search">
      <span>Search Data ∩ Product</span>
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

const SearchContainer = styled('div')`
  display: flex;
  align-items: flex-start;
  margin-left: auto;
  margin-top: 0;
`;

export default () => {
  const [active, setActive] = useState(false);

  return (
    <InstantSearch
      searchClient={client}
      indexName="the-gyre"
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
        <Icon title="Search..." />
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
