import styled from '@emotion/styled';
import MainLayout from '../components/Layout';
import PostMeta from '../components/PostMeta';
import ContentArea from '../components/ContentArea';
import breakpoints from '../utils/breakpoints';

export const Layout = styled(MainLayout)({
  margin: '5rem auto 6rem',

  [breakpoints.md]: {
    maxWidth: '100%',
    width: '57ch',
  },
});

export const Body = styled('article')({
  marginBottom: '5rem',

  [breakpoints.lg]: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridColumnGap: '2rem',
    gridTemplate: 'repeat(2, auto) / 170px 1fr',
  },
});

export const Header = styled('header')({
  [breakpoints.lg]: {
    gridColumnStart: 2,
  },
});

export const Content = styled(ContentArea)({
  maxWidth: '90vw',
  width: '56ch',

  [breakpoints.lg]: {
    gridColumnStart: 2,
  },
});

export const Meta = styled(PostMeta)({
  [breakpoints.lg]: {
    gridColumnStart: 1,
    gridRowStart: 2,
    },
});

export const Heading = styled('h1')({
  fontSize: '1.6rem',
  [breakpoints.md]: {
    fontSize: '1.875rem',
  },
});

export default {
  Layout,
  Body,
  Header,
  Content,
  Meta,
  Heading,
};
