# CheckBox

### Usage

```jsx
import CheckBox from 'components/CheckBox';

// or

import { CheckBox } from 'components';
```

<!-- STORY -->

### Properties

- `checked` - Whether the button is checked or not.
- `disabled` - Whether the button is enabled or not.
- `onChange` - Callback whence clicked.

| propName   | propType | defaultValue | isRequired |
| ---------- | :------: | :----------: | :--------: |
| `checked`  |  `bool`  |   `false`    |     -      |
| `disabled` |  `bool`  |    `true`    |     -      |
| `onChange` |  `func`  |  `() => {}`  |     -      |

### Example

```jsx
import CheckBox from 'components/CheckBox';

render() {
  return <CheckBox>Add sauce?</CheckBox>
}
```
