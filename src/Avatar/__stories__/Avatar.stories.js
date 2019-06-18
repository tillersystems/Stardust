import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import { Avatar } from '../..';
import AvatarReadme from '../README.md';

storiesOf('Avatar', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: AvatarReadme,
    },
  })
  .add('default', () => {
    const name1 = text('Name 1', 'Thomas Roux', 'name');
    const name2 = text('Name 2', 'Léopold Houdin', 'name');
    const name3 = text('Name 3', 'Mickey Mouse', 'name');

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 40px)' }}>
        <Avatar name={name1} />
        <Avatar name={name2} />
        <Avatar name={name3} />
      </div>
    );
  })
  .add('with user image', () => {
    const name = text('Name', 'Tony Starck', 'name');
    const imageUrl = text(
      'Image',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9urBbQTr7erOXvN978IfXd5TzG5KYU4BRwTfqixgTPodK32ewfg',
      'image',
    );
    const options = {
      medium: 1.5,
      big: 3.1,
      huge: 4.1,
    };
    const size = select('Size', options, 3.1, 'size');
    return <Avatar name={name} src={imageUrl} size={size} />;
  });
