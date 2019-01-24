# Tooltip

### Usage

```jsx
import { Tooltip } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `active` - Boolean set if the Tooltip is showed or not.
- `hover` - Boolean set to use click or hover to show the Tooltip.
- `appearance` - Appearance is used to set the color of the tooltip which can be dark or light.
- `top` - Boolean set to positionate the tooltip above or below the element.
- `arrowPositionX` - Set position of the Tooltip's arrow.
- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment). It is the element where a tooltip is hooked to.
- `width` - Tooltip width.
- `title` - Tooltip main text.

| propName         |          propType          | defaultValue | isRequired |
| ---------------- | :------------------------: | :----------: | :--------: |
| `active`         |           `bool`           |   `false`    |     -      |
| `hover`          |           `bool`           |   `false`    |     -      |
| `appearance`     | `oneOf(['dark', 'light'])` |    `dark`    |     -      |
| `top`            |           `bool`           |   `false`    |     -      |
| `arrowPositionX` |          `string`          |    `50%`     |     -      |
| `children`       |           `node`           |    `null`    |     -      |
| `width`          |          `string`          |    `auto`    |     -      |
| `title`          |          `string`          |    `null`    |     \*     |

### Example

```jsx
import { Tooltip } from '@tillersystems/stardust';

render() {
  return (
    <Tooltip
        top
        width='28rem'
        title='Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée.'
      >
        <button>
          Show Tooltip
        </button>
      </Tooltip>
  )
}
```
