# Variation

### Usage

```jsx
import { Variation } from '@tillersystems/stardust';
```

A Variation consists of just an arrow icon being down or up.

<!-- STORY -->

### Properties

| Name      | Required |  Type  | DefaultValue |              Description              |
| --------- | :------: | :----: | :----------: | :-----------------------------------: |
| className |    -     | string |      ''      | className needed by styled-components |
| negative  |    -     |  bool  |    false     |                   -                   |

### Example

```jsx
import { Variation } from '@tillersystems/stardust';

render() {
  return <Variation negative />
}
```
