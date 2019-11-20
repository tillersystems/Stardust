import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';

import { Theme } from '../..';
import Wrapper from '../../Wrapper';
import ThemeReadme from '../README.md';

storiesOf('Theme', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: ThemeReadme,
    },
  })
  .add('Palette', () => {
    return (
      <Wrapper>
        <Grid>
          {Object.entries(Theme.palette).map(palette => {
            const colorName = palette[0];
            const colorValue = palette[1];
            if (typeof colorValue == 'function') {
              return null;
            }
            if (typeof colorValue == 'object') {
              return Object.entries(colorValue).map(subPalette => {
                const subColorName = subPalette[0];
                const subColorValue = subPalette[1];
                return (
                  <PaletteCard
                    key={subColorName}
                    name={`${colorName} - ${subColorName}`}
                    color={subColorValue}
                  />
                );
              });
            }
            return <PaletteCard key={colorName} name={colorName} color={colorValue} />;
          })}
        </Grid>
      </Wrapper>
    );
  });

interface PaletteCardProps {
  name: string;
  color: string;
}
// Component
const PaletteCard: React.FC<PaletteCardProps> = ({ name, color }) => (
  <Container>
    <Body color={color} />
    <Footer>
      <span>{color}</span>
      <Name>{name}</Name>
    </Footer>
  </Container>
);

// Elements
const Grid = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fill, 10rem);
  grid-auto-rows: 10rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Body = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
  background: ${({ color }) => color};
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  padding: 0.5rem 0;
`;

const Name = styled.div`
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
`;

/**
 * PropTypes Validation.
 */
const { func, object, oneOfType, string } = PropTypes;
PaletteCard.propTypes = {
  name: string.isRequired,
  color: oneOfType([string, object, func]),
};

/**
 * Default props.
 */
PaletteCard.defaultProps = {
  color: 'white',
};
