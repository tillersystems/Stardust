# ButtonRefactor

### Usage

```jsx
import ButtonRefactor from 'components/ButtonRefactor';

// or

import { ButtonRefactor } from 'components';
```

<!-- STORY -->

### Properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `onClick` - handler of click on the button.
- `ghost` - whether the button is a ghost button or not (a ghost button is a button that is not styled).
- `primary` - whether the button is a primary button or not.
- `light` - whether the button is a light button or not.
- `success` - whether the button is a success button or not.
- `failure` - whether the button is a failure button or not.
- `fluid` - whether the button is fluid or not.
- `big` - whether the button is big or not.
- `small` - whether the button is small or not.
- `disabled` - whether the button is disabled or not.
- `isGoogle` - whether the button is a Google button or not.

| propName   | propType | defaultValue | isRequired |
| ---------- | :------: | :----------: | :--------: |
| `children` |  `node`  |    `null`    |     -      |
| `ghost`    |  `bool`  |   `false`    |     -      |
| `primary`  |  `bool`  |   `false`    |     -      |
| `light`    |  `bool`  |   `false`    |     -      |
| `success`  |  `bool`  |   `false`    |     -      |
| `failure`  |  `bool`  |   `false`    |     -      |
| `fluid`    |  `bool`  |   `false`    |     -      |
| `big`      |  `bool`  |   `false`    |     -      |
| `small`    |  `bool`  |   `false`    |     -      |
| `disabled` |  `bool`  |   `false`    |     -      |
| `isGoogle` |  `bool`  |   `false`    |     -      |

### Example

```jsx
import ButtonRefactor from 'component/ButtonRefactor';

render() {
  return (
    <ButtonRefactor primary>Click me !</ButtonRefactor>
  );
}
```
