/** @jsx jsx */
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import Layout from '../components/Layout';
import CategoryLink from '../components/CategoryLink';
import TagLink from '../components/TagLink';
import Pagination from '../components/Pagination';
import ContentArea from '../components/ContentArea';
import { colors } from 'gatsby-theme-apollo-core';
import breakpoints from '../utils/breakpoints';
import useSiteMetadata from '../hooks/use-site-metadata';

const getHeading = ({
  isFirstPage,
  currentPage,
  totalPages,
  type,
  value,
  categories,
}) => {
  if (type === 'category' && value) {
    const category = categories.find(c => c.slug === value);
    const displayName = category ? category.name : value;
    return `${displayName} Resources`;
  }

  if (type === 'tag' && value) {
    return `Resources tagged with “${value}”`;
  }

  if (type === 'all' && isFirstPage) {
    return 'Top Resources';
  }

  return `Resources, page ${currentPage} of ${totalPages}`;
};

const StyledWrapper = styled('div')({
  backgroundColor: '#f9fafd',
  height: '100vh',
})

const Heading = styled('h1')({
  color: colors.primary,
  fontSize: '1.5rem',
  fontWeight: 500,
  margin: '0px auto 20px 20px',
  paddingTop: '20px',
});

const PageSizing = styled(ContentArea)({
  margin: '20px',
  listStyle: 'none',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(400px, 1fr))',
  gridGap: '1rem',
  alignContent: 'center',
  justifyContent: 'center',
  [breakpoints.lg]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(400px, 1fr))',
    alignContent: 'center',
    justifyContent: 'center', 
  }
});

const StyledCard = styled('section')({
  backgroundColor: colors.white,
  color: colors.black,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, .04)",
  borderStyle: "solid",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.divider,
  paddingLeft: 24,
  paddingRight: 24,
  padding: 16,
});

const Title = styled('h2')({
  color: colors.black,
  fontWeight: 600,
  flex: '1 1 0%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  paddingRight: 24,
  fontSize: '18px',
  lineHeight: 1.3,
  marginBottom: '5px',
});

const Subtitle = styled('h4')({
  color: colors.black,
  fontWeight: 400,
  flex: '1 1 0%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  paddingRight: 24,
  fontSize: '16px',
  lineHeight: 1.3,
  marginBottom: '10px',
});

const Author = styled(Subtitle)({
  marginBottom: '16px',
});

const Description = styled('div')({
  color: colors.text3,
  fontSize: '15px',
  lineHeight: '1.53em',
  fontFamily: "'Source Sans Pro', sans-serif",
})

const StyledHR = styled('hr')({
  height: '1px',
  backgroundColor: colors.divider,
  marginTop: '24px',
  marginBottom: '24px',
  borderWidth: '0px',
})

const StyledButton = styled('a')({
  backgroundColor: colors.primaryLight,
  color: colors.white,
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '36px',
  minWidth: '100px',
  fontWeight: 600,
  whiteSpace: 'no-wrap',
  borderRadius: '5px',
  borderWidth: '0px',
  padding: '0px 12px',
  outline: '0px',
  textDecoration: 'none',
  textTransform: 'capitalize',

  ':hover, :active': {
    backgroundColor: colors.secondary,
  },
})

const Resources = ({
  pageContext: {
    resourceGroup,
    isFirstPage,
    isLastPage,
    currentPage,
    totalPages,
    linkBase,
    linkRoot,
    type,
    value,
  },
}) => {
  const { categories } = useSiteMetadata();
  const category = categories.find(cat => cat.slug === value);
  const title = {
    all: 'All Resources',
    tag: `Resources Tagged with “${value}”`,
    category: `Resources About ${category ? category.name : value}`,
  };
  const page = !isFirstPage ? ` (page ${currentPage} of ${totalPages})` : '';

  return (
    <Layout title={`${title[type]}${page}`}>
      <StyledWrapper>
        <hr
          css={css`
          margin: 0;
        `}
        />
        <Heading>
          {getHeading({
            isFirstPage,
            currentPage,
            totalPages,
            type,
            value,
            categories,
          })}
        </Heading>
        <PageSizing>
        {resourceGroup.map(({ id, childMdx: resource }) => (
          <StyledCard key={id}>
            <div
              css={css`
              display: flex;
              margin-bottom: 24px;
            `}
            >
              <div
                css={css`
                flex: 1 1 0%;
                overflow: hidden;
              `}
              >
                <div
                  css={css`
                  font-size: 15px;
                  line-height: 1.53em;
                  font-family: 'Source Sans Pro', sans-serif;  
                `}
                >
                  <CategoryLink
                    category={resource.frontmatter.category}
                    linkRoot={linkRoot}
                    ct={resource.frontmatter.category}
                  >{resource.frontmatter.category}</CategoryLink>
                  <Title>{resource.frontmatter.title} ({resource.frontmatter.pubYear})</Title>
                  <Subtitle>{resource.frontmatter.subtitle}</Subtitle>
                  <Author>{resource.frontmatter.author}</Author>
                  <Description>{resource.frontmatter.description}</Description>
                </div>
              </div>
            </div>
            <StyledHR />
            <section
              css={css`
              display: flex;
              marginTop: 24px;
            `}
            >
              <div
                css={css`
                flex: 1 1 0%;
                margin-right: auto;
                display: block;
              `}
              >
                {resource.frontmatter.tag.map(tag => (
                  <TagLink key={`tag-${tag}`} tag={tag} linkRoot={linkRoot} />
                ))}
              </div>
              <div
                css={css`
                margin-left: 16px;
                box-sizing: inherit;
                display: block;
                line-height: 1.533em;
              `}
              >
                <StyledButton href={resource.frontmatter.url}>{resource.frontmatter.action}</StyledButton>
              </div>
            </section>
                  
                
          </StyledCard>
        ))}

        <Pagination
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          currentPage={currentPage}
          totalPages={totalPages}
          linkBase={linkBase}
          />
      </PageSizing>
      </StyledWrapper>
    </Layout>
  );
};

Resources.propTypes = {
  pageContext: PropTypes.shape({
    resourceGroup: PropTypes.any,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    currentPage: PropTypes.number,
  }).isRequired,
};

export default Resources;
