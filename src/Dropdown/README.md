# Dropdown

### Usage

```jsx
import { Dropdown } from '@tillersystems/stardust';
```

<!-- STORY -->

### Description

A Dropdown displays content through its children prop that must be components wrapping text.  
The trigger is a button displaying text provided by the prop `title`.

### Properties

| Name                   | Required |    Type    | DefaultValue |                                                             Description                                                              |
| ---------------------- | :------: | :--------: | :----------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| `children`             |    \*    |   `node`   |              |                         Anything that can be rendered: numbers, strings, elements or an array (or fragment)                          |
| `className`            |    -     |  `string`  |    `null`    |                                       Adds a text aside in the select next the selected value                                        |
| `contentRef`           |    -     | `function` | `undefined`  |                                                   Callback ref of content element                                                    |
| `displayMenu`          |    -     |   `bool`   | `undefined`  | If the dropdown is open or not. If it is in a controlled state, this prop should be passed, otherwise it will rely on internal state |
| `headerStyle`          |    -     |  `Object`  |    `null`    |                                                      Style for header component                                                      |
| `itemCss`              |    -     |  `array`   |    `null`    |                       CSS provided to each item of the dropdown. Must use `css` method from styled-components                        |
| `modifiers`            |    -     |  `object`  |    `null`    |    Customize popper behaviour. Plugins to alter the behaviour of the popper. See https://popper.js.org/popper-documentation.html     |
| `noResultLabel`        |    -     |   `node`   |    `null`    |                                               Label to display when no result is found                                               |
| `onToggle`             |    -     | `function` |  `() => {}`  |                                               Callback called when Dropdown is toggled                                               |
| `searchable`           |    -     |   `bool`   |   `false`    |                                                  Whether the dropdown is searchable                                                  |
| `searchBarPlaceholder` |    -     |  `string`  |     `''`     |                                                     SearchBar input placeholder                                                      |
| `title`                |    \*    |   `node`   |              |                                                            Dropdown title                                                            |
| `usePortal`            |    -     |   `bool`   |   `false`    |                                                   Display the content on a portal                                                    |
| `...listProps`         |    -     |  `object`  |   `false`    |                               Dropdown accept `OptionsList` props to render a list instead of children                               |

### Example

```jsx
import { Dropdown } from '@tillersystems/stardust';

render() {
  // using children
  return (
    <Dropdown title="Filter by">
      <div>
        children
      </div>
    </Dropdown>
  );

  // passing OptionsList props without children
  return (
    <Dropdown
      title="Filter by"
      // OptionsList props below...
      allowMultiple
      searchMethod={searchMethod}
      onChange={onChange}
      options={options}
      searchBarPlaceholder={SearchBarPlaceholder}
      noResultLabel={NoResultLabel}
      values={state.selectedStores}
      />
  );
}
```
