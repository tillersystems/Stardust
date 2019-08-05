# Counter

### Usage

```jsx
import { Counter } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Description

A Counter is a number value that can be updated by two Buttons surrounding the displayed value.

### Properties

| Name          | Required |   Type   | DefaultValue |                               Description                               |
| ------------- | :------: | :------: | :----------: | :---------------------------------------------------------------------: |
| `appareance`  |    -     | `string` | `secondary`  |              Buttons appearance prop customizing the style              |
| `className`   |    -     | `string` |     `''`     |                  ClassName needed by styled components                  |
| `max`         |    -     | `number` |    `100`     |                          Maximum value allowed                          |
| `min`         |    -     | `number` |     `0`      |                          Minimum value allowed                          |
| `onIncrement` |    -     |  `func`  |  `() => {}`  |                  Callback function called on increment                  |
| `onDecrement` |    -     |  `func`  |  `() => {}`  |                  Callback function called on decrement                  |
| `step`        |    -     | `number` |     `1`      |                Step for incrementing/decrementing value                 |
| `value`       |    -     | `number` |     `0`      | Value of counter. The value is set to 0 if no value is provided by prop |
| `width`       |    -     | `string` |    `5rem`    |                         The width of the input                          |

### Example

#### Standard use case

The following snippet shows how to create a counter component.

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
        value={0}
        width={`${widthValue}rem`}
      />
  );
}
```
