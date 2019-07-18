import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import EventListener from '..';

describe('<EventListener />', () => {
  afterEach(cleanup);

  test('should add event listener on specified elements', () => {
    const wrapper = document.createElement('div');
    const text = document.createTextNode('I am a text node');
    wrapper.appendChild(text);
    document.body.appendChild(wrapper);

    const handleDocumentClick = jest.fn();

    const listeners = [
      {
        target: 'document',
        event: 'click',
        handler: handleDocumentClick,
      },
    ];
    const { getByText } = render(<EventListener listeners={listeners} />);

    const textNode = getByText(/text node/);

    fireEvent.click(textNode);
    expect(handleDocumentClick).toHaveBeenCalledTimes(1);
  });
});
