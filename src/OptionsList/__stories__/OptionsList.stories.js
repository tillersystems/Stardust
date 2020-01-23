import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';

import Wrapper from '../../Wrapper';
import Readme from '../README.md';
import OptionsList from '..';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const store = new Store({
  selectedStores: [],
});

const options = Array(200)
  .fill()
  .map((_, index) => ({ value: index, label: `Label ${index}`, disabled: false }));

storiesOf('OptionsList', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: Readme,
      includePropTables: [OptionsList], // won't work right now because of wrapped styled-comp https://github.com/tuchk4/storybook-readme/issues/177
    },
  })
  .add('default', () => {
    const onChangeAction = action('onChange');
    const isSearchable = boolean('Searchable', false, 'Props');
    const allowMultiple = boolean('Multiple', true, 'Props');
    const showSimpleOptions = boolean('Simple Options', false, 'Props');
    const noResultComponent = boolean('Show No Result as component', false, 'Props');
    const noResultLabel = text('No Result Label', 'No stores found ...', 'Props');
    const toggleAllLabel = text('Toggle All Label', 'Toggle all', 'Props');
    const searchPlaceholder = text('Search Bar Placeholder', 'Search ...', 'Props');

    const searchMethod = ({ options, term }) => {
      return options.filter(option => option.label.toLowerCase().includes(term.toLowerCase()));
    };

    const onChange = selectedStores => {
      onChangeAction(selectedStores);
      store.set({ selectedStores });
    };

    const NoResult = noResultComponent
      ? ({ term, setTerm }) => (
          <div
            css={`
              color: white;
              background: red;
              padding: 1.2rem;
            `}
          >
            {term} is not found -
            <button type="button" onClick={() => setTerm('')}>
              Clear search
            </button>
          </div>
        )
      : noResultLabel;

    return (
      <Wrapper>
        <State store={store}>
          {state => (
            <div
              css={`
                max-height: 250px;
                display: flex;
              `}
            >
              <OptionsList
                allowMultiple={allowMultiple}
                NoResult={NoResult}
                onChange={onChange}
                options={options}
                OptionComponent={showSimpleOptions ? OptionsList.SimpleOption : undefined}
                searchPlaceholder={searchPlaceholder}
                searchMethod={isSearchable ? searchMethod : null}
                toggleAllLabel={toggleAllLabel}
                values={state.selectedStores}
              />
            </div>
          )}
        </State>
      </Wrapper>
    );
  });
