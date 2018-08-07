import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import { Button, ButtonGroup } from '../..';

const onClickAction = action('onClick');

storiesOf('ButtonGroup', module)
  .addDecorator(withKnobs)
  .add('with properties', () => {
    const invertedValue = boolean('Inverted', false, 'Appearance');
    const roundedValue = boolean('Rounded', false, 'Appearance');

    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const mediumValue = boolean('Medium', false, 'Layout');
    const smallValue = boolean('Small', false, 'Layout');
    const tinyValue = boolean('Tiny', false, 'Layout');

    const disabledValue = boolean('Disabled', false, 'State');

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto',
          gridTemplateColumns: '20rem',
          rowGap: '1rem',
          justifyItems: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <ButtonGroup>
          <Button
            primary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Left
          </Button>
          <Button
            primary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Right
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            primary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Left
          </Button>
          <Button
            primary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            middle
          </Button>
          <Button
            primary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Right
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            secondary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Left
          </Button>
          <Button
            secondary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Right
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            secondary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Left
          </Button>
          <Button
            secondary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            center
          </Button>
          <Button
            secondary
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Right
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            light
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Left
          </Button>
          <Button
            light
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Right
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            light
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Left
          </Button>
          <Button
            light
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Center
          </Button>
          <Button
            light
            inverted={invertedValue}
            rounded={roundedValue}
            fluid={fluidValue}
            big={bigValue}
            medium={mediumValue}
            small={smallValue}
            tiny={tinyValue}
            disabled={disabledValue}
            onClick={() => onClickAction('primary')}
          >
            Right
          </Button>
        </ButtonGroup>
      </div>
    );
  });
