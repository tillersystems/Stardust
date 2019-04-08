import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, color, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Icon, Theme } from '../..';
import Button from '..';
import { Data as IconName } from '../../Icon/data';

const getIconName = Object.keys(IconName).map(name => name);

storiesOf('Button', module)
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
    const size = select(
      'Size',
      {
        small: 'small',
        default: 'default',
        large: 'large',
      },
      'default',
      'Layout',
    );
    const fluid = boolean('Fluid', false, 'Layout');
    const iconPosition = select(
      'Icon Position',
      {
        left: 'left',
        right: 'right',
      },
      'left',
      'Layout',
    );
    const iconName = select('Icon Name', getIconName, 'calendar', 'Layout');
    const disabled = boolean('Disabled', false, 'State');
    const withIcon = boolean('With Icon', false, 'Layout');
    const colorValue = color('Icon Color', Theme.palette.darkBlue, 'Layout');

    return (
      <Button
        appearance={appearance}
        disabled={disabled}
        fluid={fluid}
        icon={withIcon ? <Icon color={colorValue} name={iconName} /> : undefined}
        iconPosition={withIcon ? iconPosition : undefined}
        onClick={() => onClickAction(appearance)}
        size={size}
      >
        Default
      </Button>
    );
  });
