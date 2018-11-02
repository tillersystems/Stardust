import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import { Button, Tooltip } from '../..';

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const topValue = boolean('Top', false, 'State');
    const hoverValue = boolean('Hover', false, 'State');

    const widthValue = number(
      'Width',
      28,
      {
        range: true,
        min: 10,
        max: 60,
        step: 2,
      },
      'Dimensions',
    );

    const arrowPositionXValue = number(
      'arrowPositionX',
      50,
      {
        range: true,
        min: 5,
        max: 90,
        step: 1,
      },
      'Dimensions',
    );

    return (
      <Tooltip
        top={topValue}
        hover={hoverValue}
        width={`${widthValue}rem`}
        arrowPositionX={`${(widthValue * arrowPositionXValue) / 100}rem`}
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <Button primary>Show Tooltip</Button>
      </Tooltip>
    );
  })
  .add('controlled', () => {
    const topValue = boolean('Top', false, 'State');
    const activeValue = boolean('Show', false, 'State');

    const widthValue = number(
      'Width',
      60,
      {
        range: true,
        min: 10,
        max: 60,
        step: 2,
      },
      'Dimensions',
    );

    const arrowPositionXValue = number(
      'arrowPositionX',
      50,
      {
        range: true,
        min: 5,
        max: 90,
        step: 1,
      },
      'Dimensions',
    );
    return (
      <Tooltip
        active={activeValue}
        top={topValue}
        width={`${widthValue}rem`}
        arrowPositionX={`${(widthValue * arrowPositionXValue) / 100}rem`}
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <span>Control modal from knobs!</span>
      </Tooltip>
    );
  });
