import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, number } from '@storybook/addon-knobs';
import styled from 'styled-components';

import { Icon, Theme } from '../..';
import { Data } from '../data';

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const colorValue = color('Color', Theme.palette.darkBlue, 'Color');
    const sizeOptions = { range: true, min: 10, max: 100, step: 10 };
    const sizeValue = number('Size', 20, sizeOptions, 'Size');
    return (
      <Grid>
        {Object.keys(Data).map(iconName => (
          <IconCard key={iconName} name={iconName} color={colorValue} size={sizeValue} />
        ))}
      </Grid>
    );
  });

// Component
const IconCard = ({ name, color, size }) => (
  <Container>
    <Body>
      <Icon name={name} color={color} height={size.toString()} width={size.toString()} />
    </Body>
    <Footer>{name}</Footer>
  </Container>
);

// Elements
const Grid = styled.div`
  display: grid;
  grid-gap: 3rem;
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

/**
 * PropTypes Validation.
 */
const { string } = PropTypes;
IconCard.propTypes = {
  name: string.isRequired,
  color: string,
  size: string,
};

/**
 * Default props.
 */
IconCard.defaultProps = {
  color: 'white',
  size: '20',
};
