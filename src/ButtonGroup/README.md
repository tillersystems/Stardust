# ButtonGroup

### Usage

```jsx
import { ButtonGroup } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - Add a text aside in the select next the selected value.
- `onChange` - Callback function called when a button is clicked.
- `defaultActiveButton` - Specifies the initial state: witch button is selected.

| propName              | propType | defaultValue | isRequired |
| --------------------- | :------: | :----------: | :--------: |
| `children`            |  `node`  |    `null`    |     -      |
| `className`           | `string` |     `''`     |     -      |
| `onChange`            |  `func`  |  `() => {}`  |     -      |
| `defaultActiveButton` | `string` |     `''`     |     -      |

### Example

```jsx
import { ButtonGroup } from '@tillersystems/stardust';

render() {
  return (
    <ButtonGroup defaultActiveButton="ON" onChange={name => onClickAction(name)}>
      <Button
        name="ON"
        appearance="secondary"
      >
        ON
      </Button>
      <Button
        name="OFF"
        appearance="secondary"
      >
        OFF
      </Button>
    </ButtonGroup>
  )
}
```
