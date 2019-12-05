# BreadCrumb

### Usage

```jsx
import { BreadCrumb } from '@tillersystems/stardust';
```

<!-- STORY -->

### Description

A BreadCrumb helps users keep track of their position on the app.
Each child is separated by _"greater than"_ (or left angle bracket) symbol.
The main use of that component is to display the client's history path.

<!-- PROPS -->

### Properties

| Name       | Required |  Type  | DefaultValue |             Description             |
| ---------- | :------: | :----: | :----------: | :---------------------------------: |
| `children` |    +     | `node` |    `null`    | Array of Breadcrumb.Item components |

### Example

```jsx
import { BreadCrumb } from '@tillersystems/stardust';

render() {
  return (
    <BreadCrumb>
      <BreadCrumb.Item>path</BreadCrumb.Item>
      <BreadCrumb.Item>to</BreadCrumb.Item>
      <BreadCrumb.Item>the</BreadCrumb.Item>
      <BreadCrumb.Item>current</BreadCrumb.Item>
      <BreadCrumb.Item>page</BreadCrumb.Item>
    </BreadCrumb>
  );
}
```
