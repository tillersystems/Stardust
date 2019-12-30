/* eslint-disable react/display-name, jsx-a11y/anchor-is-valid, react/prop-types, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, radios } from '@storybook/addon-knobs';
import styled, { css } from 'styled-components';

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

    const CustomLink = styled(({ className, onClick, children }) => (
      <a className={className} onClick={onClick}>
        {children}
      </a>
    ))`
      color: red;
      ${({ isActive }) => isActive && 'background: lightblue;'}
      ${({ color }) =>
        css`
          color: ${color};
        `}
    `;

    return (
      <Wrapper>
        <div css="background: white; padding: 0 2rem;">
          <Navigation isFluid={fluid} isVertical={vertical}>
            <div>link</div>
            <span isActive>link2</span>
            <div>link3</div>
            <button type="button" disabled>
              link4
            </button>
            <div>link5</div>
            <CustomLink isActive>custom link</CustomLink>
            <CustomLink color="green">custom link green</CustomLink>
            <div>link7</div>
          </Navigation>
        </div>
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

    const activeItem = radios('actived item', options, 'link', 'Props');

    return (
      <Wrapper>
        <div css="background: white; padding: 0 2rem;">
          <Navigation isFluid={fluid} isVertical={vertical}>
            <div isActive={activeItem === 'link'}>link</div>
            <span isActive={activeItem === 'link2'}>link2</span>
            <button type="button" isActive={activeItem === 'link3'} disabled>
              link3
            </button>
          </Navigation>
        </div>
      </Wrapper>
    );
  });
