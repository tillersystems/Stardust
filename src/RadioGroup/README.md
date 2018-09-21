# RadioGroup

### Usage

```jsx
import { RadioGroup } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `groupName` - Name the groupe of radio button.
- `selectedValue` - Value which pre-select the radio button.
- `isRow` - Change the radio button direction.

| propName        | propType | defaultValue | isRequired |
| --------------- | :------: | :----------: | :--------: |
| `groupName`     | `string` |    `null`    |     \*     |
| `selectedValue` | `string` |    `null`    |     -      |
| `isRow`         |  `bool`  |   `false`    |     -      |

### Example

```jsx
import { RadioGroup } from '@tillersystems/stardust';

render() {
  return (
    <RadioGroup groupName="vegetable">
      <RadioButton value="artichoke" id="artichoke" textAnnexe="A really tasty green vegetable">artichoke</RadioButton>
      <RadioButton value="beetroot" id="beetroot">beetroot</RadioButton>
      <RadioButton value="pumpkin" id="pumpkin">pumpkin</RadioButton>
    </RadioGroup>
  );
}
```
