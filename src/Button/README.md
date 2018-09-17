# Button

### Usage

```jsx
import { Button } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `onClick` - handler of click on the button.
- `ghost` - whether the button is a ghost button or not (a ghost button is a button that is not styled).
- `primary` - whether the button is a primary button or not.
- `secondary` - whether the button is a secondary button or not.
- `success` - whether the button is a success button or not.
- `failure` - whether the button is a failure button or not.
- `fluid` - whether the button is fluid or not.
- `big` - whether the button is big or not.
- `small` - whether the button is small or not.
- `disabled` - whether the button is disabled or not.
- `isGoogle` - whether the button is a Google button or not.
- `icon` - add icon node here to illustrate the text aside.
- `iconPosition` - set the icon position compared to the text. It will be set to the left side byt default.

| propName       | propType | defaultValue | isRequired |
| -------------- | :------: | :----------: | :--------: |
| `children`     |  `node`  |    `null`    |     -      |
| `ghost`        |  `bool`  |   `false`    |     -      |
| `primary`      |  `bool`  |   `false`    |     -      |
| `secondary`    |  `bool`  |   `false`    |     -      |
| `success`      |  `bool`  |   `false`    |     -      |
| `failure`      |  `bool`  |   `false`    |     -      |
| `fluid`        |  `bool`  |   `false`    |     -      |
| `big`          |  `bool`  |   `false`    |     -      |
| `small`        |  `bool`  |   `false`    |     -      |
| `disabled`     |  `bool`  |   `false`    |     -      |
| `isGoogle`     |  `bool`  |   `false`    |     -      |
| `icon`         |  `node`  |    `null`    |     -      |
| `iconPosition` | `string` |    `left`    |     -      |

### Example

```jsx
import {Button} from '@tillersystems/stardust';

render() {
  return (
    <Button primary>Click me !</Button>
  );
}
```
