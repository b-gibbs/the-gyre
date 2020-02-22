import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ResourceList from '../components/ResourceList';

const ResourceTemplate = () => {
  const data = useStaticQuery(graphql`
    query {
      allResource(sort: { fields: priority, order: ASC }) {
        nodes {
          id
          title
          subtitle
          author
          pubYear
          type
          image
          url
          priority
          category
          description
          tags
        }
      }
    }
  `)
  const resources = data.allResource.nodes
  return (
    <ResourceList resources={resources} />
  )
}

export default ResourceTemplate;