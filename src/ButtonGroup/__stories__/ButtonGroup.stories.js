import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Button, Icon, Theme } from '../..';
import ButtonGroup from '..';
import { Data as IconName } from '../../Icon/data';

const getIconName = Object.keys(IconName).map(name => name);

storiesOf('ButtonGroup', module)
  .addDecorator(withKnobs)
  .add('with properties', () => {
    const onClickAction = action('onClick');
    const appearance = select(
      'Appearance',
      {
        default: 'default',
        primary: 'primary',
        secondary: 'secondary',
        success: 'success',
        failure: 'failure',
        google: 'google',
      },
      'default',
      'State',
    );
    const iconPosition = select(
      'Icon Position',
      {
        left: 'left',
        right: 'right',
      },
      'left',
      'Layout',
    );
    const withIcon = boolean('With Icon', false, 'Layout');
    const iconName = select('Icon Name', getIconName, 'calendar', 'Layout');
    return (
      <div>
        <ButtonGroup defaultActiveButton="ON" onChange={name => onClickAction(name)}>
          <Button
            name="ON"
            appearance={appearance}
            icon={withIcon ? <Icon color={Theme.palette.white} name={iconName} /> : undefined}
            iconPosition={withIcon ? iconPosition : undefined}
          >
            ON
          </Button>
          <Button
            name="OFF"
            appearance={appearance}
            icon={withIcon ? <Icon color={Theme.palette.white} name={iconName} /> : undefined}
            iconPosition={withIcon ? iconPosition : undefined}
          >
            OFF
          </Button>
        </ButtonGroup>
      </div>
    );
  });
