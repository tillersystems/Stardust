import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import Wrapper from '../../Wrapper';
import { Button, Form, TextInput } from '../..';
import FormReadme from '../README.md';

storiesOf('Form', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: FormReadme,
      includePropTables: [Form, Form.Group, Form.Field],
    },
  })
  .add('with different group and field properties', () => {
    const rowValue = boolean('Is Row', false, 'Group Props');
    const inlineLabelsValue = boolean('Are labels inline', false, 'Group Props');

    const labelsWidth = number(
      'Labels width',
      10,
      {
        range: true,
        min: 5,
        max: 15,
        step: 0.5,
      },
      'Group Props',
    );
    const labelWidth = number(
      'Label width (rem)',
      10,
      {
        range: true,
        min: 5,
        max: 15,
        step: 0.5,
      },
      'Field Props',
    );
    const nameSizeValue = number(
      'Name size (rem)',
      1,
      {
        range: true,
        min: 1,
        max: 5,
        step: 1,
      },
      'Field Props',
    );
    const surnameSizeValue = number(
      'Surname size (rem)',
      1,
      {
        range: true,
        min: 1,
        max: 5,
        step: 1,
      },
      'Field Props',
    );

    return (
      <Wrapper>
        <Form onSubmit={() => {}} name="form">
          <Form.Group
            row={rowValue}
            inlineLabels={inlineLabelsValue}
            labelsWidth={`${labelsWidth}rem`}
          >
            <Form.Field
              label="Name"
              size={nameSizeValue.toString()}
              labelWidth={`${labelWidth}rem`}
            >
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
            <Form.Field
              label="Name"
              size={nameSizeValue.toString()}
              labelWidth={`${labelWidth}rem`}
            >
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
      </Wrapper>
    );
  });
