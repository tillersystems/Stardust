import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { Tag, Theme } from '../..';

storiesOf('Tag', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <>
        <Tag color={Theme.palette.success.default} style={{ marginRight: '1.2rem' }}>
          Success
        </Tag>
        <Tag color={Theme.palette.failure.default} style={{ marginRight: '1.2rem' }}>
          Error
        </Tag>
        <Tag color={Theme.palette.warning.default} style={{ marginRight: '1.2rem' }}>
          warning
        </Tag>
        <Tag color={Theme.palette.primary.default} style={{ marginRight: '1.2rem' }}>
          info
        </Tag>
      </>
    );
  });