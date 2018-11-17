# Button

### Usage

```jsx
import { Button } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `appearance` - The base styling to apply to the button.
- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - ClassName needed by styled components.
- `fluid` - Whether the button is fluid or not.
- `disabled` - Whether the button is disabled or not.
- `icon` - Add icon node here to illustrate the text aside.
- `iconPosition` - Set the icon position compared to the text. It will be set to the left side by default.
- `onClick` - Handler of click on the button.
- `size` - Whether the button size is small, default or large. It will be set to default by default.
- `type` - Whether it is a button or a form submission.

| propName       |                                  propType                                   | defaultValue | isRequired |
| -------------- | :-------------------------------------------------------------------------: | :----------: | :--------: |
| `appearance`   | `oneOf(['default', 'primary', 'secondary', 'success', 'danger', 'google'])` |  `default`   |     -      |
| `children`     |                                   `node`                                    |    `null`    |     -      |
| `className`    |                                  `string`                                   |     `''`     |     -      |
| `fluid`        |                                   `bool`                                    |   `false`    |     -      |
| `disabled`     |                                   `bool`                                    |   `false`    |     -      |
| `icon`         |                                   `node`                                    |    `null`    |     -      |
| `iconPosition` |                                  `string`                                   |    `left`    |     -      |
| `onClick`      |                                   `func`                                    |  `() = {}`   |     -      |
| `size`         |                   `oneOf(['small', 'default', 'large'])`                    |  `default`   |     -      |
| `type`         |                        `oneOf(['button', 'submit'])`                        |   `button`   |     -      |

### Example

```jsx
import { Button } from '@tillersystems/stardust';

render() {
  return (
    <Button appearance="primary">Click me !</Button>
  );
}
```
