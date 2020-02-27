import algoliasearch from 'algoliasearch/lite';
import React, { useMemo, useState, createRef } from 'react';
import Layout from '../components/Layout';
import styled from '@emotion/styled';
import { FaAlgolia } from 'react-icons/fa';
import { useOnClickOutside } from '../hooks';
import {
  InstantSearch,
  Index,
  Configure,
  Hits,
  SearchBox,
  Highlight,
  connectSearchBox,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import { colors, smallCaps } from 'gatsby-theme-apollo-core';
import breakpoints from '../utils/breakpoints';



const PageLayout = styled('div')({
  position: 'relative',
  display: 'grid',
  gridGap: '1em',
})

const SearchArea = styled('div')({
  height: 'calc(100vh-90px)',
  width: '100%',
  maxWidth: '650px',
  margin: '20px auto',
})

const ResultsContainer = styled('div')(props => ({
  visibility: props.visible ? 'visible' : 'hidden',
  opacity: props.visible ? 1 : 0,
  flexGrow: 1,
  marginRight: 40,
  padding: '12px',
  border: 'none',
  borderRadius: '4px',
  color: colors.text2,
  position: "relative",
  overflowY: 'auto',
  overflowX: 'hidden',
  zIndex: 1,
  'mark': {
    color: colors.secondary,
    background: 'transparent',
  },

  [breakpoints.md]: {
    marginRight: 0,
  },
  ".ais-Hits": {
    color: colors.primaryLight,
  },
  ".ais-Hits-list": {
    listStyle: 'none',
    textDecoration: 'none',
    margin: '0 auto',
  },
  '.ais-Hits-item': {
    margin: '0 auto 0 12px',
    height: '100%',
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
        borderRadius: 4,
      },
    },
  },
  '.hit-category': {
    marginTop: 0,
    marginBottom: 2,
    headerBottom: 0,
    marginLeft: 10,
    fontSize: 14,
    color: colors.text2,
    ...smallCaps,
  },
  '.hit-section': {
    marginTop: 0,
    marginBottom: 2,
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
    textTransform: 'capitalize',
  },
  '.hit-title': {
    marginTop: 0,
    marginBottom: 0,
    headerBottom: 0,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text2,
  },
  '.hit-description': {
    marginTop: 0,
    marginBottom: 10,
    headerBottom: 0,
    marginLeft: 10,
    fontSize: 14,
    color: colors.text3,
  },
}));

const Input = styled('input')({
  border: '2px solid',
  borderColor: colors.text4,
  borderRadius: '5px',
  display: 'block',
  fontSize: '1.25rem',
  marginTop: 0,
  padding: '0.5rem 0.75rem',
  width: '100%',
});

const SearchCredit = styled('p')({
  color: colors.text3,
  fontSize: '0.75rem',
  margin: '0.25rem auto 0',
  maxWidth: '650px',
  textAlign: 'right',
  textDecoration: 'none',

  a: {
    textDecoration: 'none',
  }
});

const SearchInput = connectSearchBox(({ currentRefinement, refine, setActive }) => (
  <form noValidate action="" role="search">
    <Input
      type="text"
      placeholder="Search Data ∩ Product"
      autoComplete='off'
      value={currentRefinement}
      aria-label="Search"
      onFocus={e => {
        if (currentRefinement !== '') {
          setActive(true);
        } else {
          setActive(false)
        }
      }}
      onBlur={() => {
        if (currentRefinement === '') {
          setActive(false);
        }
      }}
      onChange={e => {
        refine(e.currentTarget.value);
        if (e.currentTarget.value === '') {
          setActive(false)
        } else {
          setActive(true)
        }
      }}
      // iOS Safari doesn't blur input automatically on tap outside.
      // onMouseLeave={setActive(false)}
    />
    <SearchCredit>
      Search powered by <a href="https://www.algolia.com"><FaAlgolia size="1em" /> Algolia</a>
    </SearchCredit>
  </form>
));

export default function Search() {
  const ref = createRef()
  const [active, setActive] = useState(false)
  const appId = process.env.GATSBY_ALGOLIA_APP_ID
  const apiKey = process.env.GATSBY_ALGOLIA_API_KEY

  const searchClient = useMemo(() => algoliasearch(appId, apiKey), [
    appId,
    apiKey,
  ])
  useOnClickOutside(ref, () => setActive(false))
  console.log('setActive is: ', { setActive });
  console.log('active is: ', { active });
  return (
    <Layout>
      <PageLayout ref={ref}>
        <InstantSearch 
          searchClient={searchClient}
          indexName="the-gyre"
        >
          
          
            <SearchArea>
              <SearchInput setActive = {setActive} />
              
              <ResultsContainer visible={active}>

                <Index indexName="the-gyre">
                  <Configure hitsPerPage={4} />
                  <Hits hitComponent={Hit} />
                </Index>
              
                <Index indexName="the-gyre-product">
                  <Configure hitsPerPage={4} />
                  <Hits hitComponent={Hit} />
                </Index>

                <Index indexName="the-gyre-data">
                  <Configure hitsPerPage={4} />
                  <Hits hitComponent={Hit} />
                </Index>
              </ResultsContainer>
              
            </SearchArea>
          
        </InstantSearch>
      </PageLayout>
    </Layout>
  )
}

const StyledHR = styled('hr')({
  borderColor: colors.divider,
  margin: 0,
  padding: 0,
});

const Link = styled('a')({
  fontSize: '0.75rem',
  textDecoration: 'none',
});

function Hit(props) {
  return (
    <div key={props.hit.objectID}>
      <Link href={`https://thegyre.io/${props.hit.path}`}>
        <div className="hit-category">
          <Highlight attribute="category" hit={props.hit} tagName='mark' />
        </div>
        <div className='hit-section'>
          <Highlight attribute="section" hit={props.hit} tagName='mark' />
        </div>
        <div className="hit-title">
          <Highlight attribute="title" hit={props.hit} tagName='mark' />
        </div>
        <div className="hit-description">
          <Highlight attribute="description" hit={props.hit} tagName='mark' />
        </div>
        <StyledHR />
      </Link>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

