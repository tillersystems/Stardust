import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';

import Wrapper from '../../Wrapper';
import { Button, Tooltip } from '../..';
import TooltipReadme from '../README.md';

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: TooltipReadme,
    },
  })
  .add('default', () => {
    const arrow = boolean('Arrow', true, 'Props');
    const appearance = select(
      'Appearance',
      {
        dark: 'dark',
        light: 'light',
      },
      'dark',
      'Props',
    );

    const boundary = select(
      'Boundary',
      {
        scrollParent: 'scrollParent',
        window: 'window',
        viewport: 'viewport',
      },
      'window',
      'Props',
    );

    const placement = select(
      'Placement',
      {
        top: 'top',
        'top-start': 'top-start',
        'top-end': 'top-end',
        right: 'right',
        'right-start': 'right-start',
        'right-end': 'right-end',
        bottom: 'bottom',
        'bottom-start': 'bottom-start',
        'bottom-end': 'bottom-end',
        left: 'left',
        'left-start': 'left-start',
        'left-end': 'left-end',
      },
      'top',
      'Props',
    );

    const trigger = select(
      'Trigger',
      {
        mouseenter: 'mouseenter',
        focus: 'focus',
        click: 'click',
        manual: 'manual',
      },
      'click',
      'Props',
    );

    const widthValue = number(
      'Width',
      28,
      {
        range: true,
        min: 10,
        max: 60,
        step: 2,
      },
      'Props',
    );

    return (
      <Wrapper>
        <Tooltip
          appearance={appearance}
          arrow={arrow}
          boundary={boundary}
          maxWidth={`${widthValue}rem`}
          content="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
          placement={placement}
          trigger={trigger}
        >
          <Button appearance="primary">Show Tooltip</Button>
        </Tooltip>
      </Wrapper>
    );
  })
  .add('controlled', () => {
    const arrow = boolean('Arrow', true, 'Props');
    const appearance = select(
      'Appearance',
      {
        dark: 'dark',
        light: 'light',
      },
      'dark',
      'Props',
    );

    const boundary = select(
      'Boundary',
      {
        scrollParent: 'scrollParent',
        window: 'window',
        viewport: 'viewport',
      },
      'window',
      'Props',
    );

    const isVisible = boolean('Is visible', true, 'Props');

    const placement = select(
      'Placement',
      {
        top: 'top',
        'top-start': 'top-start',
        'top-end': 'top-end',
        right: 'right',
        'right-start': 'right-start',
        'right-end': 'right-end',
        bottom: 'bottom',
        'bottom-start': 'bottom-start',
        'bottom-end': 'bottom-end',
        left: 'left',
        'left-start': 'left-start',
        'left-end': 'left-end',
      },
      'top',
      'Props',
    );

    const trigger = select(
      'Trigger',
      {
        mouseenter: 'mouseenter',
        focus: 'focus',
        click: 'click',
        manual: 'manual',
      },
      'click',
      'Props',
    );

    const widthValue = number(
      'Width',
      28,
      {
        range: true,
        min: 10,
        max: 60,
        step: 2,
      },
      'Props',
    );

    return (
      <Wrapper>
        <Tooltip
          appearance={appearance}
          arrow={arrow}
          boundary={boundary}
          maxWidth={`${widthValue}rem`}
          content="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
          placement={placement}
          trigger={trigger}
          isVisible={isVisible}
        >
          <Button appearance="primary">Show Tooltip</Button>
        </Tooltip>
      </Wrapper>
    );
  });
