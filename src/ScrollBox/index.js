import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Recenter, Root, ScrollArea, ScrollContent } from './elements';

/**
 * Scrollbox is just an element with scrollbars allowing us to test the behaviour of
 * our components wrapped in it.
 *
 */
const Scrollbox = ({ children, height }) => {
  const scrollAreaRef = useRef(null);
  const scrollTargetRef = useRef(null);

  const scrollToCenter = () => {
    const scrollArea = scrollAreaRef.current;
    const scrollTarget = scrollTargetRef.current;

    scrollArea.scrollTop =
      scrollTarget.offsetTop + scrollTarget.clientHeight / 2 - scrollArea.clientHeight / 2;

    scrollArea.scrollLeft =
      scrollTarget.offsetLeft + scrollTarget.clientWidth / 2 - scrollArea.clientWidth / 2;
  };

  /**
   * Hook triggered on first render to scroll to center its content
   *
   */
  useEffect(() => {
    scrollToCenter();
  }, []);

  return (
    <Root>
      <ScrollArea ref={scrollAreaRef} height={height}>
        <ScrollContent height={height}>
          <span ref={scrollTargetRef}>{children}</span>
        </ScrollContent>
      </ScrollArea>
      <Recenter onClick={scrollToCenter}>Re-center</Recenter>
    </Root>
  );
};

/**
 * PropTypes Validation.
 */
const { node, number } = PropTypes;
Scrollbox.propTypes = {
  /**
   * Anything that can be rendered (string, HTML element, React component)
   */
  children: node.isRequired,

  /**
   * Height of the box area
   */
  height: number,
};

/**
 * Default props
 */
Scrollbox.defaultProps = {
  height: 400,
};

export default Scrollbox;
