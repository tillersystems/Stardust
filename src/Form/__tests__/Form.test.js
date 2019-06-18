import React from 'react';
import { fireEvent } from '@testing-library/react';

import Form from '..';
import { Button, TextInput } from '../..';

describe('<Form />', () => {
  test('should render without a problem', () => {
    const { container } = render(
      <Form onSubmit={() => {}} name="form">
        <Form.Group>
          <Form.Field label="my label">
            <TextInput placeholder="tape inside me" />
          </Form.Field>
          <Form.Field>
            <Button primary>Hello</Button>
          </Form.Field>
        </Form.Group>
      </Form>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render form without label without a problem', () => {
    const { container } = render(
      <Form onSubmit={() => {}} name="form">
        <Form.Group>
          <Form.Field>
            <TextInput placeholder="tape inside me" />
          </Form.Field>
          <Form.Field>
            <TextInput placeholder="tape inside me" />
          </Form.Field>
        </Form.Group>
      </Form>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render row form without a problem', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}} name="form">
        <Form.Group row>
          <Form.Field label="my label 1">
            <TextInput placeholder="tape inside me" />
          </Form.Field>
          <Form.Field hasLabel labelContent="my label 2">
            <TextInput placeholder="tape inside me" />
          </Form.Field>
        </Form.Group>
      </Form>,
    );

    const groupNode = getByTestId('form-group');
    expect(groupNode).toHaveStyleRule('flex-direction', 'row');
  });

  test('should render form with inline labels without a problem', () => {
    const { getByText } = render(
      <Form onSubmit={() => {}} name="form">
        <Form.Group inlineLabels>
          <Form.Field label="my label 1">
            <TextInput />
          </Form.Field>
          <Form.Field label="my label 2">
            <TextInput />
          </Form.Field>
        </Form.Group>
      </Form>,
    );

    const labelNode = getByText('my label 1');
    expect(labelNode).toHaveStyleRule('margin-right', '0.5rem');
    expect(labelNode).toHaveStyleRule('margin-left', '0');
  });

  test('should render row form with inline labels without a problem', () => {
    const { container } = render(
      <Form onSubmit={() => {}} name="form">
        <Form.Group row inlineLabels>
          <Form.Field label="my label 1">
            <TextInput />
          </Form.Field>
          <Form.Field label="my label 2">
            <TextInput />
          </Form.Field>
        </Form.Group>
      </Form>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render form with labelsWidth value', () => {
    const { queryAllByText } = render(
      <Form onSubmit={() => {}} name="form">
        <Form.Group inlineLabels labelsWidth="10rem">
          <Form.Field label="my label">
            <TextInput placeholder="tape inside me" />
          </Form.Field>
          <Form.Field label="my label">
            <TextInput placeholder="tape inside me" />
          </Form.Field>
        </Form.Group>
      </Form>,
    );

    const fieldNodes = queryAllByText('my label');
    expect(fieldNodes[0]).toHaveStyleRule('width', '10rem');
    expect(fieldNodes[1]).toHaveStyleRule('width', '10rem');
  });

  test('should render form with highlighted label when has focus', () => {
    const { container, getByTestId } = render(
      <Form onSubmit={() => {}} name="form">
        <Form.Group inlineLabels>
          <Form.Field label="my label 1">
            <TextInput placeholder="tape inside me" />
          </Form.Field>
        </Form.Group>
      </Form>,
    );

    const fieldNode = getByTestId('input');
    fireEvent.focus(fieldNode);
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.blur(fieldNode);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render form with size value', () => {
    const { queryAllByTestId } = render(
      <Form onSubmit={() => {}} name="form">
        <Form.Group inlineLabels labelsWidth="10rem">
          <Form.Field label="my label 1" size="3">
            <TextInput />
          </Form.Field>
          <Form.Field label="my label 2" size="2">
            <TextInput />
          </Form.Field>
        </Form.Group>
      </Form>,
    );

    const fieldNodes = queryAllByTestId('form-field');

    expect(fieldNodes[0]).toHaveStyleRule('flex', '3');
    expect(fieldNodes[1]).toHaveStyleRule('flex', '2');
  });

  test('should render form with custom width on field level', () => {
    const { getByText } = render(
      <Form onSubmit={() => {}} name="form">
        <Form.Group inlineLabels labelsWidth="10rem">
          <Form.Field label="I am customized" size="3" labelWidth="15rem">
            <TextInput />
          </Form.Field>
          <Form.Field label="I am not" size="2">
            <TextInput />
          </Form.Field>
        </Form.Group>
      </Form>,
    );

    const customFieldNode = getByText('I am customized');
    const nonCustomFieldNode = getByText('I am not');
    expect(customFieldNode).toHaveStyleRule('width', '15rem');
    expect(nonCustomFieldNode).toHaveStyleRule('width', '10rem');
  });
});
