# Tooltip

### Usage

```jsx
import { Tooltip } from '@tillersystems/stardust';
```

A Tooltip extends the content of another element by providing additional content.
Its position and appearance can be customized.

We use Tippy.js, a highly customizable tooltip and popover library powered by Popper.js https://atomiks.github.io/tippyjs/

To see all props you can use: https://atomiks.github.io/tippyjs/all-options/

<!-- STORY -->

### Properties

All of the native [Tippy.js](https://atomiks.github.io/tippyjs/) options can be passed as props. Visit [the doc](https://atomiks.github.io/tippyjs/all-options/) to view the complete table.

| Name         | Required |           Type           |       Value        |                                                                                       Description                                                                                        |
| ------------ | :------: | :----------------------: | :----------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `appearance` |    -     |         `string`         |       `dark`       |                                                      Appearance is used to set the color of the tooltip which can be dark or light                                                       |
| `arrow`      |    -     |          `bool`          |      `false`       |                                               Determines if an arrow should be added to the tooltip pointing toward the reference element                                                |
| `boundary`   |    -     |         `string`         |   `scrollParent`   |                                     The boundary preventOverflow modifier. Possible values: "scrollParent", "window", "viewport", or an HTMLElement                                      |
| `children`   |    -     |          `node`          |       `null`       |                           Anything that can be rendered: numbers, strings, elements or an array (or fragment). It is the element where a tooltip is hooked to                            |
| `className`  |    -     |         `string`         |        `''`        |                                                                          className needed by styled components                                                                           |
| `content`    |    -     | `node, string, function` |        `''`        |                  The content of the tooltip. Along with a string or element, you can use a function that takes the reference element as an argument and returns content                  |
| `maxWidth`   |    -     |     `string, number`     |       `350`        |                                                                       Determines the maximum width of the tooltip                                                                        |
| `placement`  |    -     |         `string`         |       `top`        |                                                                 Positions the tooltip relative to its reference element                                                                  |
| `trigger`    |    -     |         `string`         | `mouseenter focus` | The events (each separated by a space) which cause a tooltip to show. Possible values: "mouseenter", "focus", "click", "manual". Use "manual" to only trigger the tippy programmatically |

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
