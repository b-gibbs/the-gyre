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
import breakpoints from '../utils/breakpoints';
import { rgba } from 'polished';

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


const OpenSearch = styled('a')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'left',
  color: colors.text1,
  lineHeight: '29px', 
  fontSize: '20px',
  fontWeight: 300,
  textDecoration: 'none',

  [breakpoints.md]: {
    backgroundColor: rgba(0, 0, 0, 0, 0),
    color: colors.text2,

    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '30px',
    padding: '10px 20px',
    marginBottom: '10px',
    textDecorationColor: colors.text2,
    textDecorationLine: 'none',
    textDecorationStyle: 'solid',
    transition: 'all 0.25s ease-out',
    '&:hover': {
      color: colors.primary,
    }
  }
});

const SearchIcon = styled(FaSearch)({
  height: '60%',
  position: 'relative',
  margin: 0,
  [breakpoints.md]: {
    visibility: 'hidden',
    opacity: 0,
  }
});

const SearchText = styled('p')({
  paddingRight: '6px',
  fontSize: '20px',
  margin: 0,
  [breakpoints.md]: {
    fontSize: '16px',
  }
});

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



export default () => {
  const [active, setActive] = useState(false);

  return (
    <InstantSearch
      searchClient={client}
      indexName="the-gyre"
    >
      <Configure distinct={1} />
        <OpenSearch
          href="/search"
          onClick={event => {
            event.preventDefault();
            setActive(true);
          }}
        >
          <SearchText>Search</SearchText>
          <SearchIcon />
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
