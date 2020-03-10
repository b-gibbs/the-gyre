/** @jsx jsx */
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import Img from 'gatsby-image';
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
  minHeight: '100vh',
})

const Heading = styled('h1')({
  color: colors.primary,
  fontSize: '1.5rem',
  fontWeight: 500,
  margin: '0px auto 20px 20px',
  paddingTop: '20px',
});

const PageSizing = styled(ContentArea)({
  margin: '20px 20px 0px 20px',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(400px, 1fr))',
  gridGap: '1rem',
  alignContent: 'center',
  justifyContent: 'center',
  [breakpoints.lg]: {
    gridTemplateColumns: 'repeat(1, minmax(85px, 1fr))',
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
  marginBottom: 'auto',
});

const ImageInfoContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '120px 4fr',
  gridColumnGap: '12px',
  marginTop: 10,
  [breakpoints.sm]: {
    gridTemplateColumns: '1fr'
  }
})


const NonStretchImg = props => {
  let normalizedProps = props
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        margin: "0 auto", // Used to center the image
        
      },
      imgStyle:{ objectFit: `contain` },
    }
  }

  return <Img {...normalizedProps} />
}

const StyledImg = styled(NonStretchImg)({
  width: '100%',
  objectFit: 'contain',
  [breakpoints.sm]: {
    visibility: 'hidden',
    opacity: 0,
    width: 0,
    height: 0,
  }
});

const Info = styled('div')({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const TitleYear = styled('h2')({
  color: colors.black,
  fontWeight: 600,
  flex: '1 1 0%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  paddingRight: 24,
  fontSize: '18px',
  lineHeight: 1.3,
  marginBottom: '10px',
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
  whiteSpace: 'normal',
})

const StyledHR = styled('hr')({
  height: '1px',
  backgroundColor: colors.divider,
  marginTop: '24px',
  marginBottom: '24px',
  borderWidth: '0px',
})

const TagLinkContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '4fr 1fr',
})

const StyledButton = styled('a')({
  margin: '0 0 0 auto',
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
    color: colors.white,
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
              <CategoryLink
                category={resource.frontmatter.category}
                linkRoot={linkRoot}
                ct={resource.frontmatter.category}
                >
                {resource.frontmatter.category}
              </CategoryLink>
              <ImageInfoContainer>
                  <StyledImg fluid={{...resource.frontmatter.coverImage.childImageSharp.fluid}} />             
                <Info>
                    {resource.frontmatter.pubYear !== null ?
                      <TitleYear>{resource.frontmatter.title} ({resource.frontmatter.pubYear})</TitleYear> :
                      <TitleYear>{resource.frontmatter.title}</TitleYear>   
                    }
                    {resource.frontmatter.subtitle !== null &&
                    <Subtitle>{resource.frontmatter.subtitle}</Subtitle>}
                  <Author>{resource.frontmatter.author}</Author>
                  <Description>{resource.frontmatter.description}</Description>
                </Info>
              </ImageInfoContainer>
              <StyledHR />
              <TagLinkContainer>
                <div>
                  {resource.frontmatter.tag.map(tag => (
                    <TagLink key={`tag-${tag}`} tag={tag} linkRoot={linkRoot} />
                  ))}
                </div>
                <StyledButton href={resource.frontmatter.url}>
                  {resource.frontmatter.action}
                </StyledButton> 
              </TagLinkContainer>
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
  )
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
