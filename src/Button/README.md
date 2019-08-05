# Button

### Usage

```jsx
import { Button } from '@tillersystems/stardust';
```

<!-- STORY -->

### Description

A Button comes in three possible sizes and six visual sizes.  
An Icon component can be displayed next to the text label of the button, left or right side.
For now, instance of the Icon must be passed to the Button so styling is rather free.

Button can be a simple standalone button or part of a form.

<!-- PROPS -->

### Properties

| Name           | Required |                                    Type                                     | DefaultValue |                                        Description                                         |
| -------------- | :------: | :-------------------------------------------------------------------------: | :----------: | :----------------------------------------------------------------------------------------: |
| `appearance`   |    -     | `oneOf(['default', 'primary', 'secondary', 'success', 'danger', 'google'])` |  `default`   |                          The base styling to apply to the button                           |
| `children`     |    -     |                                   `node`                                    |    `null`    |    Anything that can be rendered: numbers, strings, elements or an array (or fragment)     |
| `className`    |    -     |                                  `string`                                   |     `''`     |                           ClassName needed by styled components                            |
| `fluid`        |    -     |                                   `bool`                                    |   `false`    |                             Whether the button is fluid or not                             |
| `disabled`     |    -     |                                   `bool`                                    |   `false`    |                           Whether the button is disabled or not                            |
| `icon`         |    -     |                                   `node`                                    |    `null`    |                     Adds icon next to the text button to illustrate it                     |
| `iconPosition` |    -     |                                  `string`                                   |    `left`    |  Sets the icon position compared to the text. It will be set to the left side by default   |
| `onClick`      |    -     |                                   `func`                                    |  `() = {}`   |                               Handler of click on the button                               |
| `size`         |    -     |                   `oneOf(['small', 'default', 'large'])`                    |  `default`   | Whether the button size is small, default or large. It will be set to `default` by default |
| `type`         |    -     |                        `oneOf(['button', 'submit'])`                        |   `button`   |                        Whether it is a button or a form submission                         |

### Example

```jsx
import { Button } from '@tillersystems/stardust';

render() {
  return (
    <Button appearance="primary">Click me !</Button>
  );
}
```
