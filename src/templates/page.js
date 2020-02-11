import React from 'react';
import Layout from '../components/Layout';
import ContentArea from '../components/ContentArea';

export default ({ children, pageContext, data, location }) => {
  const postImage =
    data &&
    data.file &&
    data.file.childImageSharp &&
    data.file.childImageSharp.resize &&
    data.file.childImageSharp.resize.src
      ? data.file.childImageSharp.resize.src
      : null;

  return (
    <Layout title={pageContext.frontmatter.title}>
      <h1>{pageContext.frontmatter.title}</h1>
      <ContentArea>{children}</ContentArea>
    </Layout>
  );
};
