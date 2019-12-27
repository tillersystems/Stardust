/* eslint-disable react/display-name */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, radios } from '@storybook/addon-knobs';

import Navigation from '..';
import Wrapper from '../../Wrapper';
import NavigationReadme from '../README.md';

storiesOf('Navigation', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: NavigationReadme,
    },
  })
  .add('default', () => {
    const fluid = boolean('Fluid', false, 'Props');
    const vertical = boolean('Vertical', false, 'Props');

    /* eslint-disable jsx-a11y/anchor-is-valid */
    // eslint-disable-next-line react/prop-types
    const CustomLink = ({ children }) => <a href="">{children}</a>;
    /* eslint-enable jsx-a11y/anchor-is-valid */

    return (
      <Wrapper>
        <Navigation isFluid={fluid} isVertical={vertical}>
          <div>link</div>
          <span>link2</span>
          <div thePropsYou="wantToPass">link3</div>
          <div>link4</div>
          <div isActive>link5</div>
          <CustomLink>custom link</CustomLink>
          <div>link7</div>
        </Navigation>
      </Wrapper>
    );
  })
  .add('controlled', () => {
    const fluid = boolean('Fluid', false, 'Props');
    const vertical = boolean('Vertical', false, 'Props');

    const options = {
      link: 'link',
      link2: 'link2',
      link3: 'link3',
    };
    const activedItem = radios('actived item', options, 'link', 'Props');

    return (
      <Wrapper>
        <Navigation isFluid={fluid} isVertical={vertical}>
          <div isActive={activedItem === 'link'}>link</div>
          <span isActive={activedItem === 'link2'}>link2</span>
          <div isActive={activedItem === 'link3'}>link3</div>
        </Navigation>
      </Wrapper>
    );
  });
