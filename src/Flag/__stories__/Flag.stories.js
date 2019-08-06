import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';

import Wrapper from '../../Wrapper';
import Flag from '..';
import Data from '../data';
import FlagReadme from '../README.md';

storiesOf('Flag', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: FlagReadme,
    },
  })
  .add('default', () => {
    return (
      <Wrapper>
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
      </Wrapper>
    );
  })
  .add('with size', () => {
    const sizeOptions = { range: true, min: 50, max: 150, step: 10 };
    const sizeValue = number('Size', 30, sizeOptions, 'State');
    return (
      <Wrapper>
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
      </Wrapper>
    );
  })
  .add('with rounded corners', () => {
    const sizeOptions = { range: true, min: 50, max: 150, step: 10 };
    const sizeValue = number('Size', 100, sizeOptions, 'State');
    const rounded = boolean('Rounded', true, 'State');

    return (
      <Wrapper>
        <Grid>
          {Object.keys(Data).map(flagName => (
            <Container key={flagName}>
              <Body>
                <Flag size={sizeValue.toString()} name={flagName} rounded={rounded} />
              </Body>
              <Footer>{flagName}</Footer>
            </Container>
          ))}
        </Grid>
      </Wrapper>
    );
  });

// Elements
const Grid = styled.div`
  display: grid;
  grid-gap: 5rem;
  grid-template-columns: repeat(auto-fill, 10rem);
  text-align: center;
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
