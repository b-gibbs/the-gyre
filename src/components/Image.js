import React from "react";
import styled from '@emotion/styled';

const CaptionCredit = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
});

const Caption = styled('figcaption')({
  marginTop: '2px',
  gridColumn: 1,
  justifyContent: 'left',
});

const Credit = styled('small')({
  marginTop: '2px',
  gridColumn: 3,
  justifyContent: 'right',
  alignItems: 'right',
});

export default ({
  align = "center",
  border = true,
  caption,
  children,
  className = false,
  credit,
}) => (
  <figure
    className={
      className ||
      `figure figure--${align} ${border ? "" : "figure--no-border"}`
    }
  >
      {children}
      <CaptionCredit>
        <Caption>{caption}</Caption>
        <Credit>{credit}</Credit>
      </CaptionCredit>
  </figure>
)
