import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Wrapper from '../../Wrapper';
import Card from '..';
import CardReadme from '../README.md';

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: CardReadme,
    },
  })
  .add('with properties', () => {
    const hasHeader = boolean('With Header', true, 'Layout');
    const hasFooter = boolean('With Footer', true, 'Layout');
    const isSmallHeader = boolean('Is header small', true, 'Props');

    return (
      <Wrapper>
        <Card height="350px" width="350px">
          {hasHeader && <Card.Header small={isSmallHeader}>Header</Card.Header>}
          <Card.Body>Hey, this is my content!</Card.Body>
          {hasFooter && <Card.Footer>Footer</Card.Footer>}
        </Card>
      </Wrapper>
    );
  });
