import React from 'react';
import styled from '@emotion/styled';

const List = styled('ul')({
  listStyleType: 'none',
});

const Item = styled('li')({

});

const ResourceList = ({ resources }) => {
  
  return (
    <>
      <List>
        {resources.map(resource => (
          <Item key={resource.id}>
            <p>{resource.image}</p>
            <div>
              <h2>{resource.title}
                {resource.subtitle ? ': ' + resource.subtitle : ''} ({resource.pubYear})
              </h2>
              <h4>{resource.author}</h4>
              <p>{resource.description}</p>
              <p>{resource.category}-{resource.priority}</p>
              <a href={resource.url}>Link</a>
            </div>
          </Item>
        ))}
      </List>
    </>
  )
};

export default ResourceList;
