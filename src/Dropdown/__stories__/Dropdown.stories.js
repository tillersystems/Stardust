import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { css } from 'styled-components';

import { Dropdown, CheckBox, ScrollBox } from '../..';
import DropdownReadme from '../README.md';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const itemCss = css`
  padding: 0.9rem 1.2rem;
  &:first-child {
    padding-top: 1.2rem;
  }
  ${({ searchable }) =>
    searchable &&
    css`
      &:nth-child(2) {
        padding-top: 1.2rem;
      }
    `}
  &:last-child {
    padding-bottom: 1.2rem;
  }

  :hover {
    background: ${({ theme: { palette } }) => palette.veryLightGrey};
  }
`;

const store = new Store({
  streetBangkokBastille: false,
  streetBangkokMarais: false,
  streetBangkokCanal: false,
  streetBangkokMontorgeuil: false,
  streetBangkokSentier: false,
  streetBangkokStlouis: false,
  streetBangkokStMichel: false,
  streetBangkokOberkampf: false,
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
    const onClickAction = action('onChange');
    const Searchable = boolean('Searchable', false, 'Props');
    const NoResultLabel = text('No Result Label', 'No stores found ...', 'Props');
    const SearchBarPlaceholder = text('Search Bar Placholder', 'Search ...', 'Props');
    const Title = text('Title', 'All stores', 'Props');
    const usePortal = boolean('UsePortal', false, 'Props');

    return (
      <ScrollBox>
        <State store={store}>
          {state => (
            <Dropdown
              headerStyle={{ width: '25rem' }}
              itemCss={itemCss}
              modifiers={{
                preventOverflow: {
                  escapeWithReference: true,
                },
              }}
              noResultLabel={NoResultLabel}
              title={Title}
              searchable={Searchable}
              searchBarPlaceholder={SearchBarPlaceholder}
              usePortal={usePortal}
            >
              <CheckBox
                checked={state.streetBangkokBastille}
                value="Street Bangkok Bastille"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokBastille: !store.get('streetBangkokBastille') })
                }
              >
                Street Bangkok Bastille
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokMarais}
                value="Street Bangkok Marais"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokMarais: !store.get('streetBangkokMarais') })
                }
              >
                Street Bangkok Marais
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokCanal}
                value="Street Bangkok Canal"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokCanal: !store.get('streetBangkokCanal') })
                }
              >
                Street Bangkok Canal
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokMontorgeuil}
                value="Street Bangkok Montorgeuil"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokMontorgeuil: !store.get('streetBangkokMontorgeuil') })
                }
              >
                Street Bangkok Montorgeuil
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokSentier}
                value="Street Bangkok Sentier"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokSentier: !store.get('streetBangkokSentier') })
                }
              >
                Street Bangkok Sentier
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokStlouis}
                value="Street Bangkok St louis"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokStlouis: !store.get('streetBangkokStlouis') })
                }
              >
                Street Bangkok St louis
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokStMichel}
                value="Street Bangkok St Michel"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokStMichel: !store.get('streetBangkokStMichel') })
                }
              >
                Street Bangkok St Michel
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokOberkampf}
                value="Street Bangkok Oberkampf"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokOberkampf: !store.get('streetBangkokOberkampf') })
                }
              >
                Street Bangkok Oberkampf
              </CheckBox>
            </Dropdown>
          )}
        </State>
      </ScrollBox>
    );
  })
  .add('controlled displayMenu', () => {
    const onClickAction = action('onChange');
    const Title = text('Title', 'All stores', 'Props');
    const displayMenu = boolean('displayMenu', true, 'Props');

    return (
      <ScrollBox>
        <State store={store}>
          {state => (
            <Dropdown
              displayMenu={displayMenu}
              headerStyle={{ width: '25rem' }}
              itemCss={itemCss}
              modifiers={{
                preventOverflow: {
                  escapeWithReference: true,
                },
              }}
              title={Title}
            >
              <CheckBox
                checked={state.streetBangkokBastille}
                value="Street Bangkok Bastille"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokBastille: !store.get('streetBangkokBastille') })
                }
              >
                Street Bangkok Bastille
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokMarais}
                value="Street Bangkok Marais"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokMarais: !store.get('streetBangkokMarais') })
                }
              >
                Street Bangkok Marais
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokCanal}
                value="Street Bangkok Canal"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokCanal: !store.get('streetBangkokCanal') })
                }
              >
                Street Bangkok Canal
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokMontorgeuil}
                value="Street Bangkok Montorgeuil"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokMontorgeuil: !store.get('streetBangkokMontorgeuil') })
                }
              >
                Street Bangkok Montorgeuil
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokSentier}
                value="Street Bangkok Sentier"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokSentier: !store.get('streetBangkokSentier') })
                }
              >
                Street Bangkok Sentier
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokStlouis}
                value="Street Bangkok St louis"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokStlouis: !store.get('streetBangkokStlouis') })
                }
              >
                Street Bangkok St louis
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokStMichel}
                value="Street Bangkok St Michel"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokStMichel: !store.get('streetBangkokStMichel') })
                }
              >
                Street Bangkok St Michel
              </CheckBox>
              <CheckBox
                checked={state.streetBangkokOberkampf}
                value="Street Bangkok Oberkampf"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokOberkampf: !store.get('streetBangkokOberkampf') })
                }
              >
                Street Bangkok Oberkampf
              </CheckBox>
            </Dropdown>
          )}
        </State>
      </ScrollBox>
    );
  });
