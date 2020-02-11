import styled from '@emotion/styled';

export default styled('div')({
  display: 'grid',
  gridAutoFlow: 'column',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 2,
  gridColumnStart: 3,
})