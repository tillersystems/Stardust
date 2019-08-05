# Card

### Usage

```jsx
import { Card } from '@tillersystems/stardust';
```

<!-- STORY -->

### Card properties

- `width` - define the width of the card, that can be any size units (ex: "100px", "10rem", "100%" ...)
- `height` - define the height of the card, that can be any size units (ex: "100px", "10rem", "100%" ...)

| propName | propType | defaultValue | isRequired |
| -------- | :------: | :----------: | :--------: |
| `width`  | `string` |    `auto`    |     -      |
| `height` | `string` |    `auto`    |     -      |

### Card.Header properties

- `small` - change header size

| propName | propType  | defaultValue | isRequired |
| -------- | :-------: | :----------: | :--------: |
| `small`  | `boolean` |   `false`    |     -      |

### Example

```jsx
import { Card } from '@tillersystems/stardust';

render() {
  return (
    <Card height="350px" width="350px">
      {isHeader && <Card.Header small>Header</Card.Header>}
      <Card.Body>Hey, this is my content!</Card.Body>
      {isFooter && <Card.Footer>Footer</Card.Footer>}
    </Card>
  )
}
```
