/* eslint-disable react/no-danger */
import '../styles.less';
import React from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import Main from './Main';
import config from '../../data/SiteConfig';

export default ({ children, title, className = '' }) => [
  <Helmet
    key="app-head"
    titleTemplate="%s · Data ∩ Product"
    defaultTitle="Data ∩ Product"
  >
    <html lang="en" />

    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>{title}</title>
    <meta name='description' content={config.siteDescription} />
    
    {/* Favicon stuff from realfavicongenerator.net */}
    <meta name="apple-mobile-web-app-title" content="thegyre.io" />
    <meta name="application-name" content="thegyre.io" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />

  </Helmet>,
  <Header key="app-header" />,
  <Main key="app-main" className={className}>
    {children}
  </Main>,
];
