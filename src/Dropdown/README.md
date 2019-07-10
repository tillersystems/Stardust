# Dropdown

### Usage

```jsx
import { Dropdown } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - Add a text aside in the select next the selected value.
- `itemCss` - Css provided to each item of the dropdown. Must use `css` method from styled-components.
- `noResultLabel` - Label to display when no result found.
- `onToggle` - Callback called when Dropdown is toggled.
- `searchable` - A Dropdown may be searchable.
- `searchBarPlacholder` - SearchBar input placeholder.
- `title` - Dropdown title.

| propName              |  propType  | defaultValue | isRequired |
| --------------------- | :--------: | :----------: | :--------: |
| `children`            |   `node`   |              |     \*     |
| `className`           |  `string`  |    `null`    |     -      |
| `itemCss`             |  `array`   |    `null`    |     -      |
| `noResultLabel`       |   `node`   |    `null`    |     -      |
| `onToggle`            | `function` |  `() => {}`  |     -      |
| `searchable`          |   `bool`   |   `false`    |     -      |
| `searchBarPlacholder` |  `string`  |     `''`     |     -      |
| `title`               |   `node`   |              |     \*     |

### Example

```jsx
import { Dropdown } from '@tillersystems/stardust';

render() {
  return (
    <Dropdown title="Filter by" itemCss={css`padding: 0.9rem 1.2rem;`}>
      <CheckBox
        checked={state.color}
        id="color"
        onChange={this.onChange}
      >
        Color
      </CheckBox>
      <CheckBox
        checked={state.name}
        id="mame"
        onChange={this.onChange}
      >
        Name
      </CheckBox>
      <CheckBox
        checked={state.size}
        id="size"
        onChange={this.onChange}
      >
        Size
      </CheckBox>
    </Dropdown>
  );
}
```
