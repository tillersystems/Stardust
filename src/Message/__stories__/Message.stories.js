import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { withKnobs, select, boolean, text, button } from '@storybook/addon-knobs';
import MessageReadme from '../README.md';

import Wrapper from '../../Wrapper';
import { Message } from '../..';

const store = new Store({
  active: true,
});

storiesOf('Message', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: MessageReadme,
    },
  })
  .add('default', () => {
    const options = {
      Success: 'success',
      Info: 'info',
      Warning: 'warning',
      Error: 'error',
    };
    const type = select('Type', options, 'info', 'Props');
    const closable = boolean('Closable', false, 'Props');
    const description = text('Description', 'this a simple message', 'Props');
    button('Reset message', () => store.set({ active: true }), 'Button');

    return (
      <Wrapper>
        <State store={store}>
          {closable ? (
            ({ active }) =>
              active && (
                <Message
                  description={description}
                  type={type}
                  onClose={() => store.set({ active: false })}
                />
              )
          ) : (
            <Message description={description} type={type} />
          )}
        </State>
      </Wrapper>
    );
  });
