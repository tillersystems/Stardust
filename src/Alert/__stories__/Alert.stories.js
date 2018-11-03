import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';

import { Alert, Button } from '../..';

const store = new Store({
  active: false,
});

storiesOf('Alert', module)
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

    return (
      <>
        <Button primary onClick={() => store.set({ active: !store.get('active') })}>
          Open alert
        </Button>
        <State store={store}>
          <Alert
            message="this a simple message"
            type={type}
            closable={closable}
            active={store.get('active')}
          />
        </State>
      </>
    );
  });
