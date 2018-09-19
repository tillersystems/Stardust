import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import { UserInfo, Theme } from '../..';

storiesOf('UserInfo', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const nameValue = text('Name', 'Tony Starck', 'Name');
    const pictureValue = boolean('HasPiture', true, 'Picture');
    return (
      <div style={{ width: '18rem', background: Theme.palette.darkBlue }}>
        <UserInfo
          name={nameValue}
          pictureSrc={
            pictureValue
              ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9urBbQTr7erOXvN978IfXd5TzG5KYU4BRwTfqixgTPodK32ewfg'
              : null
          }
          onClick={action('button-clicked')}
        />
      </div>
    );
  });
