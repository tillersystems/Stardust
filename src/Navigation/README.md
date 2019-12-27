# Navigation

### Usage

A Navigation wraps all the logic between navigation items, usually you should pass link as child but Navigation accept all tag's type.

```jsx
import { Navigation } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

#### Items props

| Name       | Required |  Type  | DefaultValue |                                        Description                                        |
| ---------- | :------: | :----: | :----------: | :---------------------------------------------------------------------------------------: |
| `isActive` |    -     | `bool` |    false     | Define which item going to be the activated one. By default the first item is activated.s |

### Example

```jsx
import { Navigation } from '@tillersystems/stardust';

render() {
  <Navigation>
    <div>link</div>
    <span>link2</span>
    <div thePropsYou="wantToPass">link3</div>
    <div>link4</div>
    <div isActive>link5</div>
    <div>link6</div>
    <div>link7</div>
  </Navigation>
}
```
