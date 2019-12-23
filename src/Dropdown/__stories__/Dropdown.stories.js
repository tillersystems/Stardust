import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';

import { Dropdown, ScrollBox } from '../..';
import DropdownReadme from '../README.md';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const store = new Store({
  selectedStores: [],
});

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: DropdownReadme,
      includePropTables: [Dropdown], // won't work right now because of wrapped styled-comp https://github.com/tuchk4/storybook-readme/issues/177
    },
  })
  .add('uncontrolled displayMenu', () => {
    const Title = text('Title', 'All stores', 'Props');
    const usePortal = boolean('UsePortal', false, 'Props');

    return (
      <ScrollBox>
        <Dropdown
          headerStyle={{ width: '25rem' }}
          modifiers={{
            preventOverflow: {
              escapeWithReference: true,
            },
          }}
          title={Title}
          usePortal={usePortal}
        >
          <div>Children</div>
        </Dropdown>
      </ScrollBox>
    );
  })
  .add('controlled displayMenu', () => {
    const Title = text('Title', 'All stores', 'Props');
    const displayMenu = boolean('displayMenu', true, 'Props');

    return (
      <ScrollBox>
        <Dropdown
          displayMenu={displayMenu}
          headerStyle={{ width: '25rem' }}
          modifiers={{
            preventOverflow: {
              escapeWithReference: true,
            },
          }}
          title={Title}
        >
          <div>Children</div>
        </Dropdown>
      </ScrollBox>
    );
  })
  .add('without children (OptionsList)', () => {
    const onChangeAction = action('onChange');
    const NoResultLabel = text('No Result Label', 'No stores found ...', 'Props');
    const SearchBarPlaceholder = text('Search Bar Placholder', 'Search ...', 'Props');
    const Title = text('Title', 'All stores', 'Props');
    const usePortal = boolean('UsePortal', false, 'Props');

    const options = [
      { value: 'street-bangkok-bastille', label: 'Street Bangkok Bastille', disabled: false },
      { value: 'street-bangkok-marais', label: 'Street Bangkok Marais', disabled: false },
      { value: 'street-bangkok-canal', label: 'Street Bangkok Canal', disabled: false },
      { value: 'street-bangkok-montorgeuil', label: 'Street Bangkok Montorgeuil', disabled: false },
      { value: 'street-bangkok-sentier', label: 'Street Bangkok Sentier', disabled: false },
      { value: 'street-bangkok-st-louis', label: 'Street Bangkok St louis', disabled: false },
      { value: 'street-bangkok-st-michel', label: 'Street Bangkok St Michel', disabled: false },
      { value: 'street-bangkok-oberkampf', label: 'Street Bangkok Oberkampf', disabled: false },
    ];

    const searchMethod = ({ options, term }) => {
      return options.filter(option => option.label.toLowerCase().includes(term.toLowerCase()));
    };

    const onChange = selectedStores => {
      onChangeAction(selectedStores);
      store.set({ selectedStores });
    };

    return (
      <ScrollBox>
        <State store={store}>
          {state => (
            <Dropdown
              allowMultiple
              headerStyle={{ width: '25rem' }}
              modifiers={{ preventOverflow: { escapeWithReference: true } }}
              noResultLabel={NoResultLabel}
              onChange={onChange}
              options={options}
              searchBarPlaceholder={SearchBarPlaceholder}
              searchMethod={searchMethod}
              title={Title}
              usePortal={usePortal}
              values={state.selectedStores}
            />
          )}
        </State>
      </ScrollBox>
    );
  });
