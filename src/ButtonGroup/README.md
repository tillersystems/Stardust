# ButtonGroup

### Usage

```jsx
import { ButtonGroup } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Description

A ButtonGroup wraps as much Buttons as it is given as children.  
Only one Button is active at a time. Each Button is cloned as is, meaning you could provide Buttons with different styles.

### Properties

| Name                      | Required |   Type   | DefaultValue |                                     Description                                     |
| ------------------------- | :------: | :------: | :----------: | :---------------------------------------------------------------------------------: |
| `children`                |    -     |  `node`  |    `null`    | Anything that can be rendered: numbers, strings, elements or an array (or fragment) |
| `className`               |    -     | `string` |     `''`     |                        ClassName needed by styled components                        |
| `defaultActiveButtonName` |    -     | `string` |     `''`     |                    Specifies which button is initially selected                     |
| `onChange`                |    -     | `string` |     `''`     |                  Callback function called when a button is clicked                  |

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
