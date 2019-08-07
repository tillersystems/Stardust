import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Wrapper from '../../Wrapper';
import { Button, Icon, Theme } from '../..';
import ButtonGroup from '..';
import { Data as IconName } from '../../Icon/data';
import ButtonGroupReadme from '../README.md';

const getIconName = Object.keys(IconName).map(name => name);

storiesOf('ButtonGroup', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme around story
      content: ButtonGroupReadme,
      includePropTables: [ButtonGroup], // won't work right now because of wrapped styled-comp https://github.com/tuchk4/storybook-readme/issues/177
    },
  })
  .add('with customizable properties', () => {
    const buttonGroupProps = {
      onChange: action('onClick'),
      defaultActiveButtonName: select(
        'defaultActiveButtonName',
        {
          ON: 'ON',
          OFF: 'OFF',
        },
        'ON',
        'Props',
      ),
    };

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
      'Button Props',
    );
    const iconPosition = select(
      'Icon Position',
      {
        left: 'left',
        right: 'right',
      },
      'left',
      'Button Props',
    );
    const withIcon = boolean('With Icon', false, 'Button Props');
    const iconName = select('Icon Name', getIconName, 'calendar', 'Button Props');

    return (
      <Wrapper>
        <ButtonGroup {...buttonGroupProps}>
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
      </Wrapper>
    );
  });
