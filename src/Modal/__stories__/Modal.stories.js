import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { withKnobs, select, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Wrapper from '../../Wrapper';
import { Modal, Button, Icon } from '../..';
import ModalReadme from '../README.md';

const range = count => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
};

const onOverlayClickAction = action('onOverlayClick');

const store = new Store({
  active: false,
});

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: ModalReadme,
    },
  })
  .add('default', () => {
    const widthValue = number(
      'Width',
      50,
      {
        range: true,
        min: 10,
        max: 100,
        step: 2,
      },
      'Props',
    );
    const heightValue = number(
      'Height',
      40,
      {
        range: true,
        min: 10,
        max: 80,
        step: 2,
      },
      'Props',
    );
    const paddingValue = number(
      'Padding',
      2,
      {
        range: true,
        min: 1,
        max: 10,
        step: 1,
      },
      'Props',
    );

    return (
      <Wrapper>
        <Button appearance="primary" onClick={() => store.set({ active: !store.get('active') })}>
          Open modal
        </Button>
        <State store={store}>
          <Modal
            active={store.get('active')}
            width={`${widthValue}rem`}
            height={`${heightValue}rem`}
            padding={`${paddingValue}rem`}
            onOverlayClick={() => {
              onOverlayClickAction();
              store.set({ active: !store.get('active') });
            }}
          >
            <Modal.Body>Click on overlay to close me :-)</Modal.Body>
          </Modal>
        </State>
      </Wrapper>
    );
  })
  .add('controlled', () => {
    const activeValue = boolean('Active', false, 'Props');

    const widthValue = number(
      'Width',
      50,
      {
        range: true,
        min: 10,
        max: 100,
        step: 2,
      },
      'Props',
    );
    const heightValue = number(
      'Height',
      40,
      {
        range: true,
        min: 10,
        max: 80,
        step: 2,
      },
      'Props',
    );
    const paddingValue = number(
      'Padding',
      2,
      {
        range: true,
        min: 1,
        max: 10,
        step: 1,
      },
      'Props',
    );

    return (
      <Wrapper>
        <span>Control modal from knobs!</span>
        <Modal
          active={activeValue}
          width={`${widthValue}rem`}
          height={`${heightValue}rem`}
          padding={`${paddingValue}rem`}
        >
          <Modal.Body>Click on overlay to close me :-)</Modal.Body>
        </Modal>
      </Wrapper>
    );
  })

  .add('with children', () => {
    const widthValue = number(
      'Width',
      50,
      {
        range: true,
        min: 10,
        max: 100,
        step: 2,
      },
      'Props',
    );
    const heightValue = number(
      'Height',
      40,
      {
        range: true,
        min: 10,
        max: 80,
        step: 2,
      },
      'Props',
    );
    const paddingValue = number(
      'Padding',
      2,
      {
        range: true,
        min: 1,
        max: 10,
        step: 1,
      },
      'Props',
    );

    const withHeader = boolean('With header', true, 'Header');
    const populatedHeader = boolean('With button', false, 'Header');

    const withFooter = boolean('With footer', true, 'Footer');
    const populatedFooter = number(
      'Number of buttons',
      1,
      {
        range: true,
        min: 1,
        max: 3,
        step: 1,
      },
      'Footer',
    );
    const alignmentFooter = select(
      'Alignment',
      ['left', 'right', 'center', 'spaced'],
      'right',
      'Footer',
    );

    return (
      <Wrapper>
        <Button appearance="primary" onClick={() => store.set({ active: !store.get('active') })}>
          Open modal
        </Button>
        <State store={store}>
          <Modal
            active={store.get('active')}
            width={`${widthValue}rem`}
            height={`${heightValue}rem`}
            padding={`${paddingValue}rem`}
            onOverlayClick={() => {
              onOverlayClickAction();
              store.set({ active: !store.get('active') });
            }}
          >
            {withHeader && (
              <Modal.Header>
                <Modal.Title>My title</Modal.Title>
                {populatedHeader && (
                  <Button size="small" onClick={() => store.set({ active: !store.get('active') })}>
                    <Icon color="#2B333D" name="cross" />
                  </Button>
                )}
              </Modal.Header>
            )}

            <Modal.Body>Modal body</Modal.Body>

            {withFooter && (
              <Modal.Footer alignment={alignmentFooter}>
                {range(populatedFooter).map(p => (
                  <Button
                    key={p}
                    appearance="primary"
                    onClick={() => store.set({ active: !store.get('active') })}
                  >
                    Close modal
                  </Button>
                ))}
              </Modal.Footer>
            )}
          </Modal>
        </State>
      </Wrapper>
    );
  });
