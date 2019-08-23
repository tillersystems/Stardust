# Card

### Usage

```jsx
import { Card } from '@tillersystems/stardust';
```

### Description

A Card is a simple rectangular container that can be used to display content through its children.  
It can have a Header and a Footer. The Header can be smaller through a boolean prop.

<!-- STORY -->

### Card Properties

| Name     | Required |   Type   | DefaultValue |                                      Description                                      |
| -------- | :------: | :------: | :----------: | :-----------------------------------------------------------------------------------: |
| `height` |    -     | `string` |    `auto`    | Defines the card height that can be any size units (ex: "100px", "10rem", "100%" ...) |
| `width`  |    -     | `string` |    `auto`    | Defines the card width that can be any size units (ex: "100px", "10rem", "100%" ...)  |

### Card.Header Properties

| Name    | Required |   Type    | DefaultValue |                Description                 |
| ------- | :------: | :-------: | :----------: | :----------------------------------------: |
| `small` |    -     | `boolean` |   `false`    | If the header should have a smaller height |

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
