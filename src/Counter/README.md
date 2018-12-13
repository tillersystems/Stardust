# Counter

### Usage

```jsx
import { Counter } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `appearance` - Button appareance.
- `className` - className needed by styled component.
- `max` - Maximum value allowed.
- `min` - Minimum value allowed.
- `onIncrement` - Callback function called on increment.
- `onDecrement` - Callback function called on decrement.
- `step` - step for increment/decrement value.
- `value` - incremented/decremented value. The value is set to 0 if no value provided.
- `width` - the width of the input.

| propName      | propType | defaultValue | isRequired |
| ------------- | :------: | :----------: | :--------: |
| `appareance`  | `string` | `secondary`  |     -      |
| `className`   | `string` |     `''`     |     -      |
| `max`         | `number` |    `100`     |     -      |
| `min`         | `number` |     `0`      |     -      |
| `onIncrement` |  `func`  |  `() => {}`  |     -      |
| `onDecrement` |  `func`  |  `() => {}`  |     -      |
| `step`        | `number` |     `1`      |     -      |
| `value`       | `number` |     `0`      |     -      |
| `width`       | `string` |    `5rem`    |     -      |

### Example

#### Standard use case

The following snippet shows how to create a increment component.

```jsx
import { Counter } from '@tillersystems/stardust';

render() {
  return (
    <Counter
        step={myStepValue}
        max={maxValue}
        min={minValue}
        onIncrement={() => {}}
        onDecrement={() => {}}
        appearance={appearance}
        width={`${widthValue}rem`}
      />
  );
}
```
