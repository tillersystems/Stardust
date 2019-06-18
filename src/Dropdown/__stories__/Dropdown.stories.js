import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';

import { Dropdown, CheckBox } from '../..';
import DropdownReadme from '../README.md';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

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
    },
  })
  .add('default', () => {
    const onClickAction = action('onChange');
    const Searchable = boolean('Searchable', false, 'State');
    const NoresultLabel = text('No Result Label', 'No stores found ...', 'State');
    const SearchBarPlacholder = text('Search Bar Placholder', 'Search ...', 'State');
    const Title = text('Title', 'All stores', 'State');

    return (
      <State store={store}>
        {state => (
          <div style={{ width: '25rem' }}>
            <Dropdown
              title={Title}
              searchable={Searchable}
              noResultLabel={NoresultLabel}
              searchBarPlacholder={SearchBarPlacholder}
            >
              <CheckBox
                defaultChecked={state.streetBangkokBastille}
                value="Street Bangkok Bastille"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokBastille: !store.get('streetBangkokBastille') })
                }
              >
                Street Bangkok Bastille
              </CheckBox>
              <CheckBox
                defaultChecked={state.streetBangkokMarais}
                value="Street Bangkok Marais"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokMarais: !store.get('streetBangkokMarais') })
                }
              >
                Street Bangkok Marais
              </CheckBox>
              <CheckBox
                defaultChecked={state.streetBangkokCanal}
                value="Street Bangkok Canal"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokCanal: !store.get('streetBangkokCanal') })
                }
              >
                Street Bangkok Canal
              </CheckBox>
              <CheckBox
                defaultChecked={state.streetBangkokMontorgeuil}
                value="Street Bangkok Montorgeuil"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokMontorgeuil: !store.get('streetBangkokMontorgeuil') })
                }
              >
                Street Bangkok Montorgeuil
              </CheckBox>
              <CheckBox
                defaultChecked={state.streetBangkokSentier}
                value="Street Bangkok Sentier"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokSentier: !store.get('streetBangkokSentier') })
                }
              >
                Street Bangkok Sentier
              </CheckBox>
              <CheckBox
                defaultChecked={state.streetBangkokStlouis}
                value="Street Bangkok St louis"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokStlouis: !store.get('streetBangkokStlouis') })
                }
              >
                Street Bangkok St louis
              </CheckBox>
              <CheckBox
                defaultChecked={state.streetBangkokStMichel}
                value="Street Bangkok St Michel"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokStMichel: !store.get('streetBangkokStMichel') })
                }
              >
                Street Bangkok St Michel
              </CheckBox>
              <CheckBox
                defaultChecked={state.streetBangkokOberkampf}
                value="Street Bangkok Oberkampf"
                onChange={event =>
                  onClickAction(event.target.value, event.target.checked) ||
                  store.set({ streetBangkokOberkampf: !store.get('streetBangkokOberkampf') })
                }
              >
                Street Bangkok Oberkampf
              </CheckBox>
            </Dropdown>
          </div>
        )}
      </State>
    );
  });
