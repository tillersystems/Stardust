# ButtonGroup

### Usage

```jsx
import { ButtonGroup } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `primary` - whether the button is a primary button or not.
- `secondary` - whether the button is a secondary button or not.
- `success` - whether the button is a success button or not.
- `failure` - whether the button is a failure button or not.
- `fluid` - whether the button is fluid or not.
- `big` - whether the button is big or not.
- `small` - whether the button is small or not.
- `disabled` - whether the button is disabled or not.
- `onChange` - Callback function called when a button is clicked.
- `defaultActiveButton` - Specifies the initial state: witch button is selected.

| propName              | propType | defaultValue | isRequired |
| --------------------- | :------: | :----------: | :--------: |
| `children`            |  `node`  |    `null`    |     -      |
| `primary`             |  `bool`  |   `false`    |     -      |
| `secondary`           |  `bool`  |   `false`    |     -      |
| `success`             |  `bool`  |   `false`    |     -      |
| `failure`             |  `bool`  |   `false`    |     -      |
| `fluid`               |  `bool`  |   `false`    |     -      |
| `big`                 |  `bool`  |   `false`    |     -      |
| `small`               |  `bool`  |   `false`    |     -      |
| `disabled`            |  `bool`  |   `false`    |     -      |
| `onChange`            |  `func`  |  `() => {}`  |     -      |
| `defaultActiveButton` | `string` |     `''`     |     -      |

### Example

```jsx
import { ButtonGroup } from '@tillersystems/stardust';

render() {
  return (
    <ButtonGroup
      secondary
      onChange={name => onClickAction(name)}
      activeButton="ON"
    >
      <Button name="ON">ON</Button>
      <Button name="OFF">OFF</Button>
    </ButtonGroup>
  )
}
```
