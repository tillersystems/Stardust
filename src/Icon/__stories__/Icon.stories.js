import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, number } from '@storybook/addon-knobs';
import styled from 'styled-components';

import Wrapper from '../../Wrapper';
import { Icon, Theme } from '../..';
import { Data } from '../data';
import IconReadme from '../README.md';

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      /**
       * Show readme before story
       */
      content: IconReadme,
    },
  })
  .add('default', () => {
    const colorValue = color('Color', Theme.palette.darkBlue, 'Props');
    const sizeOptions = { range: true, min: 10, max: 100, step: 10 };
    const sizeValue = number('Size', 20, sizeOptions, 'Props');

    return (
      <Wrapper>
        <Grid>
          {Object.keys(Data).map(iconName => (
            <IconCard key={iconName} name={iconName} color={colorValue} size={sizeValue} />
          ))}
        </Grid>
      </Wrapper>
    );
  });

// Component
const IconCard = ({ color, name, size, title }) => (
  <Container>
    <Body>
      <Icon name={name} color={color} size={size.toString()} title={title} />
    </Body>
    <Footer>{name}</Footer>
  </Container>
);

// Elements
const Grid = styled.div`
  display: grid;
  grid-gap: 3rem;
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

/**
 * PropTypes Validation.
 */
const { number: numberProp, string } = PropTypes;
IconCard.propTypes = {
  color: string,
  name: string.isRequired,
  size: numberProp,
  title: string,
};

/**
 * Default props.
 */
IconCard.defaultProps = {
  color: 'white',
  size: '20',
  title: null,
};
