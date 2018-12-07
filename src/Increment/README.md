# Increment

### Usage

```jsx
import { Increment } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `width` - the width of the input.
- `step` - step for increment / decrement value.
- `max` - Maximum value allowed.
- `min` - Minimum value allowed.
- `appearance` - Button appareance.

| propName     | propType | defaultValue | isRequired |
| ------------ | :------: | :----------: | :--------: |
| `width`      | `string` |    `5rem`    |     -      |
| `step`       | `number` |     `1`      |     -      |
| `max`        | `number` |    `100`     |     -      |
| `min`        | `number` |     `0`      |     -      |
| `appareance` | `string` | `secondary`  |     -      |

### Example

#### Standard use case

The following snippet shows how to create a increment component.

```jsx
import { Increment } from '@tillersystems/stardust';

render() {
  return (
    <Increment
        step={myStepValue}
        max={maxValue}
        min={minValue}
        appearance={appearance}
        width={`${widthValue}rem`}
      />
  );
}
```
