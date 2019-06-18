import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import { Button, Form, TextInput } from '../..';
import FormReadme from '../README.md';

storiesOf('Form', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: FormReadme,
    },
  })
  .add('default', () => {
    return (
      <Form onSubmit={() => {}} name="form">
        <Form.Group>
          <Form.Field label="Label">
            <TextInput placeholder="tape inside me" />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  })
  .add('with different group properties', () => {
    const rowValue = boolean('Is Row', false, 'Layout');
    const inlineLabelsValue = boolean('Are labels inline', false, 'Layout');

    const labelsWidth = number(
      'Labels width',
      10,
      {
        range: true,
        min: 5,
        max: 15,
        step: 0.5,
      },
      'Sizes',
    );
    const labelWidth = number(
      'Label width',
      10,
      {
        range: true,
        min: 5,
        max: 15,
        step: 0.5,
      },
      'Sizes',
    );
    const nameSizeValue = number(
      'Name size',
      1,
      {
        range: true,
        min: 1,
        max: 5,
        step: 1,
      },
      'Sizes',
    );
    const surnameSizeValue = number(
      'Surname size',
      1,
      {
        range: true,
        min: 1,
        max: 5,
        step: 1,
      },
      'Sizes',
    );

    return (
      <Form onSubmit={() => {}} name="form">
        <Form.Group
          row={rowValue}
          inlineLabels={inlineLabelsValue}
          labelsWidth={`${labelsWidth}rem`}
        >
          <Form.Field label="Name" size={nameSizeValue.toString()} labelWidth={`${labelWidth}rem`}>
            <TextInput fluid placeholder="Name" />
          </Form.Field>
          <Form.Field label="Surname" size={surnameSizeValue.toString()}>
            <TextInput fluid placeholder="Surname" />
          </Form.Field>
        </Form.Group>
        <Form.Group
          row={rowValue}
          inlineLabels={inlineLabelsValue}
          labelsWidth={`${labelsWidth}rem`}
        >
          <Form.Field label="Name" size={nameSizeValue.toString()} labelWidth={`${labelWidth}rem`}>
            <TextInput fluid placeholder="Name" />
          </Form.Field>
          <Form.Field label="Surname" size={surnameSizeValue.toString()}>
            <TextInput fluid placeholder="Surname" />
          </Form.Field>
          <Form.Field size="20rem">
            <Button fluid appearance="primary">
              Validate
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    );
  });
