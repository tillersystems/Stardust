import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import styled from 'styled-components';

import Flag from '..';
import Data from '../data';

storiesOf('Flag', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Grid>
        {Object.keys(Data).map(flagName => (
          <Container key={flagName}>
            <Body>
              <Flag name={flagName} />
            </Body>
            <Footer>{flagName}</Footer>
          </Container>
        ))}
      </Grid>
    );
  })
  .add('with size', () => {
    const sizeOptions = { range: true, min: 50, max: 150, step: 10 };
    const sizeValue = number('Size', 100, sizeOptions, 'Size');
    return (
      <Grid>
        {Object.keys(Data).map(flagName => (
          <Container key={flagName}>
            <Body>
              <Flag size={sizeValue.toString()} name={flagName} />
            </Body>
            <Footer>{flagName}</Footer>
          </Container>
        ))}
      </Grid>
    );
  });

// Elements
const Grid = styled.div`
  display: grid;
  grid-gap: 5rem;
  grid-template-columns: repeat(auto-fill, 10rem);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Body = styled.div`
  display: block;
`;
const Footer = styled.div`
  font-size: 1rem;
`;
