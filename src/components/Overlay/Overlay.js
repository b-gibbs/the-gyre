import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Transition } from 'react-transition-group';
import CloseButton from './CloseButton';
import { colors } from 'gatsby-theme-apollo-core';

const Overlay = styled('div')({
  alignItems: 'center',
  background: colors.white,
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  top: 0,
  left: 0,
  margin: 0,
  opacity: 0,
  overflowY: 'auto',
  position: 'fixed',
  transition: 'opacity 150ms linear',
  width: '100vw',
  zIndex: 1000,

  '&.hidden': {
    display: 'none',
    height: 0,
    left: -1,
    pointerEvents: 'none',
    position: 'absolute',
    top: -1,
    width: 0,
    zIndex: -1
  },
});

const handleOnDirectClick = handlerFn => event => {
  console.log(event.target.classList);
  console.log(Overlay);
  if (event.target.classList.contains(Overlay)) {
    console.log('popover clicked!');
    event.preventDefault();
    handlerFn();
  }
};

export default ({ children, hidePopover, visible, onEntered = () => {} }) => {
  const [hidden, setHidden] = useState(true);

  const handleEnter = () => {
    setHidden(false);
  };

  const handleExited = () => setHidden(true);

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
  };

  return (
    <Transition
      in={visible}
      timeout={150}
      onEnter={handleEnter}
      onEntered={onEntered}
      onExited={handleExited}
    >
      {state => (
        // Adding a “click the background to close” functionality as a convenience
        // to mouse users. The close button is available for screen reader and
        // keyboard users, so I’m ignoring these a11y linter rules.
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <Overlay
          onClick={handleOnDirectClick(hidePopover)}
          style={transitionStyles[state]}
          className={hidden ? 'hidden' : ''}
        >
          {children}
          <CloseButton onClick={hidePopover}>close</CloseButton>
        </Overlay>
      )}
    </Transition>
  );
};
