# CheckBox

### Usage

```jsx
import { CheckBox } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `defaultChecked` - Whether the button is checked or not.
- `disabled` - Whether the button is enabled or not.
- `onChange` - Callback whence clicked.
- `textAnnexe` - Text wich be displayed under the main one

| propName         | propType | defaultValue | isRequired |
| ---------------- | :------: | :----------: | :--------: |
| `defaultChecked` |  `bool`  |   `false`    |     -      |
| `disabled`       |  `bool`  |    `true`    |     -      |
| `onChange`       |  `func`  |  `() => {}`  |     -      |
| `textAnnexe`     | `string` |    `null`    |     -      |

### Example

```jsx
import { CheckBox } from '@tillersystems/stardust';

render() {
  return <CheckBox>Add sauce?</CheckBox>
}
```
