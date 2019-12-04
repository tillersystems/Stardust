import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, optionsKnob } from '@storybook/addon-knobs';
import withDocs from 'storybook-readme/with-docs';

import Wrapper from '../../Wrapper';
import BreadCrumb from '..';
import BreadCrumbReadme from '../README.md';

storiesOf('BreadCrumb', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(BreadCrumbReadme)) // Show readme around story
  .addParameters({
    readme: {
      includePropTables: [BreadCrumb], // won't work right now because of wrapped styled-comp https://github.com/tuchk4/storybook-readme/issues/177
    },
  })
  .add('with customizable properties', () => {
    const paths = { path: 'path', to: 'to', the: 'the', current: 'current', page: 'page' };

    const pathsToDisplay = optionsKnob(
      'Paths to display',
      paths,
      Object.values(paths),
      { display: 'multi-select' },
      'State',
    );

    return (
      <Wrapper>
        <BreadCrumb>
          {pathsToDisplay.map(path => (
            <BreadCrumb.Item key={path}>{path}</BreadCrumb.Item>
          ))}
        </BreadCrumb>
      </Wrapper>
    );
  });
