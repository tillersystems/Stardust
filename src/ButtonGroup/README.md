# ButtonGroup

### Usage

```jsx
import ButtonGroup from 'components/ButtonGroup';

// or

import { ButtonGroup } from 'components';
```

<!-- STORY -->

### Properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `onClick` - handler of click on the button.
- `ghost` - whether the button is a ghost button or not (a ghost button is a button that is not styled).
- `primary` - whether the button is a primary button or not.
- `secondary` - whether the button is a secondary button or not.
- `light` - whether the button is a light button or not.
- `success` - whether the button is a success button or not.
- `failure` - whether the button is a failure button or not.
- `inverted` - whether the button has inverted colors or not.
- `fluid` - whether the button is fluid or not.
- `big` - whether the button is big or not.
- `tiny` - whether the button is tiny (no padding) or not.
- `small` - whether the button is small or not.
- `rounded` - whether the button has rounded corners or not.
- `disabled` - whether the button is disabled or not.
- `isGoogle` - whether the button is a Google button or not.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `children`  |  `node`  |    `null`    |     -      |
| `ghost`     |  `bool`  |   `false`    |     -      |
| `primary`   |  `bool`  |   `false`    |     -      |
| `secondary` |  `bool`  |   `false`    |     -      |
| `light`     |  `bool`  |   `false`    |     -      |
| `success`   |  `bool`  |   `false`    |     -      |
| `failure`   |  `bool`  |   `false`    |     -      |
| `inverted`  |  `bool`  |   `false`    |     -      |
| `fluid`     |  `bool`  |   `false`    |     -      |
| `big`       |  `bool`  |   `false`    |     -      |
| `tiny`      |  `bool`  |   `false`    |     -      |
| `small`     |  `bool`  |   `false`    |     -      |
| `rounded`   |  `bool`  |   `false`    |     -      |
| `disabled`  |  `bool`  |   `false`    |     -      |
| `isGoogle`  |  `bool`  |   `false`    |     -      |

### Example

```jsx
import ButtonGroup from 'component/ButtonGroup';

render() {
  return (
    <ButtonGroup>
      <Button primary>Click me !</Button>
      <Button primary>Click me !</Button>
    </ButtonGroup>
  );
}
```
