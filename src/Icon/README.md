# Icon

Icons use graphical symbols to represent an object or concept in your UI. They can be used to aid comprehension of core actions in your app, and to provide feedback for user input.
Stardust provides a large number of pre-built Icon components.

### Icon Props

| Name    | Required |       Type       | DefaultValue |                   Description                   |
| ------- | :------: | :--------------: | :----------: | :---------------------------------------------: |
| `name`  |    +     |      string      |      -       |                    Icon name                    |
| `color` |    -     |      string      |    white     |                   Fill color                    |
| `size`  |    -     | [string, number] |     20px     | Available sizes, including custom - e.g. '20px' |
| `title` |    -     |      string      |     null     |                Alternative text                 |

### Usage

```jsx
import { Icon } from '@tillersystems/stardust';

render() {
  return <Icon name="chevron-left" color="hsl(213,17%,20%)" size="small" title="icon title" />
}
```

<!-- STORY -->
