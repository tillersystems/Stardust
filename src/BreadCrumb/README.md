# BreadCrumb

### Usage

```jsx
import { BreadCrumb } from '@tillersystems/stardust';
```

<!-- STORY -->

### Description

A BreadCrumb is a component which organise its childrens in row.
Each children is separated with _"greater than"_ symbol.
The main use of that component will be to display the client's history path.

<!-- PROPS -->

### Properties

| Name       | Required |  Type  | DefaultValue |                                     Description                                     |
| ---------- | :------: | :----: | :----------: | :---------------------------------------------------------------------------------: |
| `children` |    +     | `node` |    `null`    | Anything that can be rendered: numbers, strings, elements or an array (or fragment) |

### Example

```jsx
import { BreadCrumb } from '@tillersystems/stardust';

render() {
  return (
    <BreadCrumb>
      <span>path</span>
      <span>to</span>
      <span>the</span>
      <span>current</span>
      <span>page</span>
    </BreadCrumb>
  );
}
```
