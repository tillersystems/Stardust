import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { withKnobs, select, boolean, text, button } from '@storybook/addon-knobs';

import { Message } from '../..';

const store = new Store({
  active: true,
});

storiesOf('Message', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const options = {
      Success: 'success',
      Info: 'info',
      Warning: 'warning',
      Error: 'error',
    };
    const type = select('Type', options, 'info', 'States');
    const closable = boolean('Closable', false, 'Button');
    const description = text('Description', 'this a simple message', 'Description');
    button('Reset message', () => store.set({ active: true }), 'Button');

    return (
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
    );
  });
