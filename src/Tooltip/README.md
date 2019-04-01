# Tooltip

### Usage

```jsx
import { Tooltip } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `appearance` - Appearance is used to set the color of the tooltip which can be dark or light.
- `arrow` - Determines if an arrow should be added to the tooltip pointing toward the reference element.
- `boundary` - The boundary preventOverflow modifier. Possible values: "scrollParent", "window", "viewport", or an HTMLElement.
- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment). It is the element where a tooltip is hooked to.
- `className` - Class needed by styled components.
- `content` - The content of the tooltip. Along with a string or element, you can use a function that takes the reference element as an argument and returns content.
- `maxWidth` - Determines the maximum width of the tooltip.
- `placement` - Positions the tooltip relative to its reference element.
- `trigger` - The events (each separated by a space) which cause a tooltip to show. Possible values: "mouseenter", "focus", "click", "manual". Use "manual" to only trigger the tippy programmatically.

All of the native [Tippy.js](https://atomiks.github.io/tippyjs/) options can be passed as props. Visit [All Options](https://atomiks.github.io/tippyjs/all-options/) to view the complete table.

| propName     |     propType     |    defaultValue    | isRequired |
| ------------ | :--------------: | :----------------: | :--------: |
| `appearance` |     `string`     |       `dark`       |     -      |
| `arrow`      |      `bool`      |      `false`       |     -      |
| `boundary`   |     `string`     |   `scrollParent`   |     -      |
| `children`   |      `node`      |       `null`       |     -      |
| `className`  |     `string`     |        `''`        |     -      |
| `content`    |     `string`     |        `''`        |     -      |
| `maxWidth`   | `string, number` |       `350`        |     -      |
| `placement`  |     `string`     |       `top`        |     -      |
| `trigger`    |     `string`     | `mouseenter focus` |     -      |

### Example

```jsx
import { Tooltip } from '@tillersystems/stardust';

render() {
  return (
    <Tooltip
      appearance="light"
      arrow
      content="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes sur la période séléctionnée."
      maxWidth={400}
      placement="bottom"
      trigger="click"
      >
        <button>
          Show Tooltip
        </button>
      </Tooltip>
  )
}
```
