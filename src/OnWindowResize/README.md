# Popover

### Usage

```jsx
import { OnWindowResize } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `breakpoint` - Define the size where the component gonna change bool.

| propName     |             propType              | defaultValue | isRequired |
| ------------ | :-------------------------------: | :----------: | :--------: |
| `children`   |              `node`               |    `null`    |     -      |
| `breakpoint` | `oneOf(['sm', 'md', 'lg', 'xl'])` |     `sm`     |     -      |

### Example

```jsx
import { OnWindowResize } from '@tillersystems/stardust';

render() {
  return <OnWindowResize>{isResponsive => isResponsive && <div>Show me!</div>}</OnWindowResize >
}
```
