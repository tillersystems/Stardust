import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, color, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withDocs from 'storybook-readme/with-docs';

import Wrapper from '../../Wrapper';
import { Icon, Theme } from '../..';
import Button from '..';
import { Data as IconName } from '../../Icon/data';
import ButtonReadme from '../README.md';

const getIconName = Object.keys(IconName).map(name => name);

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(ButtonReadme)) // Show readme around story
  .addParameters({
    readme: {
      includePropTables: [Button], // won't work right now because of wrapped styled-comp https://github.com/tuchk4/storybook-readme/issues/177
    },
  })
  .add('with customizable properties', () => {
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
      'secondary',
      'Props',
    );
    const size = select(
      'Size',
      {
        small: 'small',
        default: 'default',
        large: 'large',
      },
      'default',
      'Props',
    );
    const fluid = boolean('Fluid', false, 'Props');
    const iconPosition = select(
      'Icon Position',
      {
        left: 'left',
        right: 'right',
      },
      'left',
      'Props',
    );
    const iconName = select('Icon Name', getIconName, 'calendar', 'Props');
    const disabled = boolean('Disabled', false, 'Props');
    const type = select(
      'Type',
      {
        button: 'button',
        submit: 'submit',
      },
      'button',
      'Props',
    );
    const withIcon = boolean('With Icon', false, 'Layout');
    const colorValue = color('Icon Color', Theme.palette.darkBlue, 'Layout');

    return (
      <Wrapper>
        <Button
          appearance={appearance}
          disabled={disabled}
          fluid={fluid}
          icon={withIcon ? <Icon color={colorValue} name={iconName} /> : undefined}
          iconPosition={withIcon ? iconPosition : undefined}
          onClick={() => onClickAction(appearance)}
          size={size}
          type={type}
        >
          Default
        </Button>
      </Wrapper>
    );
  });
