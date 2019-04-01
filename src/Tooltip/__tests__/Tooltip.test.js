import React from 'react';
import { fireEvent } from 'react-testing-library';

import Tooltip from '..';

describe('<Tooltip />', () => {
  const buttonText = 'Show Tooltip';

  beforeEach(() => {
    // Since tippy.js depending on popper.js, we need to mock createRange.
    // see https://github.com/FezVrasta/popper.js/issues/478
    global.window.document.createRange = function createRange() {
      return {
        setEnd: () => {},
        setStart: () => {},
        getBoundingClientRect: () => {
          return { right: 0 };
        },
        getClientRects: () => [],
        commonAncestorContainer: document.createElement('div'),
      };
    };
  });

  test('should render only the child element', () => {
    const { container } = render(
      <Tooltip content="content">
        <button type="button">{buttonText}</button>
      </Tooltip>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render the Tooltip on click', () => {
    const { getByText, queryByText } = render(
      <Tooltip content="content">
        <button type="button">{buttonText}</button>
      </Tooltip>,
    );

    const button = getByText(buttonText);

    expect(queryByText('content')).not.toBeInTheDocument();

    // Click on button
    fireEvent.click(button);

    expect(queryByText('content')).toBeInTheDocument();
  });
});
