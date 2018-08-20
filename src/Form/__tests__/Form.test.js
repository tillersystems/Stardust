import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';

import Form from '..';
import Theme from '../../Theme';
import { Button, TextInput } from '../..';

describe('<Form />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Form onSubmit={() => {}} name="form">
          <Form.Group>
            <Form.Field label="my label">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
            <Form.Field>
              <Button primary>Hello</Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render form block without a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Form onSubmit={() => {}} name="form">
          <Form.Group>
            <Form.Field label="my label 1">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
            <Form.Field hasLabel labelContent="my label 2">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
          </Form.Group>
        </Form>
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render form without label without a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Form onSubmit={() => {}} name="form">
          <Form.Group>
            <Form.Field>
              <TextInput placeholder="tape inside me" />
            </Form.Field>
            <Form.Field>
              <TextInput placeholder="tape inside me" />
            </Form.Field>
          </Form.Group>
        </Form>
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render form row without a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Form onSubmit={() => {}} name="form">
          <Form.Group row>
            <Form.Field label="my label 1">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
            <Form.Field hasLabel labelContent="my label 2">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
          </Form.Group>
        </Form>
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render form label inline without a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Form onSubmit={() => {}} name="form">
          <Form.Group inlineLabels>
            <Form.Field label="my label 1">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
            <Form.Field hasLabel labelContent="my label 2">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
          </Form.Group>
        </Form>
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render form row label inline without a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Form onSubmit={() => {}} name="form">
          <Form.Group row inlineLabels>
            <Form.Field label="my label 1">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
            <Form.Field label="my label 2">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
          </Form.Group>
        </Form>
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render form with labelWidth value', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Form onSubmit={() => {}} name="form">
          <Form.Group inlineLabels labelsWidth="10rem">
            <Form.Field label="my label 1">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
            <Form.Field label="my label 2">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
          </Form.Group>
        </Form>
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render form with highlighted label when has focus', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Form onSubmit={() => {}} name="form">
          <Form.Group inlineLabels labelsWidth="10rem">
            <Form.Field label="my label 1">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
          </Form.Group>
        </Form>
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();

    render.find('input').simulate('focus');

    expect(render.find('input').exists()).toBeTruthy();

    expect(render).toMatchSnapshot();

    render.find('input').simulate('blur');
    expect(render).toMatchSnapshot();
  });

  it('should render form with size value', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Form onSubmit={() => {}} name="form">
          <Form.Group inlineLabels labelsWidth="10rem">
            <Form.Field label="my label 1" size="3">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
            <Form.Field label="my label 2" size="2">
              <TextInput placeholder="tape inside me" />
            </Form.Field>
          </Form.Group>
        </Form>
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();
  });
});
