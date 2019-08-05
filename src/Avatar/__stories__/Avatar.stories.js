import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, withKnobs } from '@storybook/addon-knobs';

import { Avatar } from '../..';
import AvatarReadme from '../README.md';

storiesOf('Avatar', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      includePropTables: [Avatar], // won't work right now because of wrapped styled-comp https://github.com/tuchk4/storybook-readme/issues/177
      // Show readme before story
      content: AvatarReadme,
    },
  })
  .add('default with initials', () => {
    const name1 = text('Name 1', 'Thomas Roux', 'Props');
    const name2 = text('Name 2', 'Léopold Houdin', 'Props');
    const name3 = text('Name 3', 'Mickey Mouse', 'Props');

    const size = number(
      'Size',
      3,
      {
        range: true,
        min: 1.5,
        max: 10,
        step: 0.5,
      },
      'Props',
    );

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 120px)' }}>
        <Avatar name={name1} size={size} />
        <Avatar name={name2} size={size} />
        <Avatar name={name3} size={size} />
      </div>
    );
  })
  .add('with an user image', () => {
    const name = text('Name', 'Tony Starck', 'Props');
    const imageUrl = text(
      'Image',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9urBbQTr7erOXvN978IfXd5TzG5KYU4BRwTfqixgTPodK32ewfg',
      'Props',
    );

    const size = number(
      'Size',
      3,
      {
        range: true,
        min: 1.5,
        max: 10,
        step: 0.5,
      },
      'Props',
    );

    return <Avatar name={name} src={imageUrl} size={size} />;
  });
