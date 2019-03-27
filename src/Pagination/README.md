# Pagination

### Usage

```jsx
import { Pagination } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `pageCount` - total number of page in the pagination.
- `pageRangeDisplayed` - range of page to display.
- `marginPageDisplayed` - number of page to display on the pagination margins.
- `breakLabel` - label to display on break.
- `getRequestedPageNumber` - callback function when a page item or arrow is clicked.
- `align` - chosen alignment for the pagination.

| propName                 | propType | defaultValue | isRequired |
| ------------------------ | :------: | :----------: | :--------: |
| `pageCount`              | `number` |     `1`      |     -      |
| `pageRangeDisplayed`     | `number` |     `2`      |     -      |
| `marginPageDisplayed`    | `number` |     `1`      |     -      |
| `breakLabel`             | `string` |    `...`     |     -      |
| `getRequestedPageNumber` |  `func`  |  `() => {}`  |     -      |
| `align`                  | `string` |   `right`    |     -      |

### Example

```jsx
import { Pagination } from '@tillersystems/stardust';

render() {
  return (
    <Pagination
        pageCount={10}
        pageRangeDisplayed={2}
        marginPageDisplayed={2}
        breakLabel="..."
        getRequestedPageNumber={() => console.log('clicked')}
        align="center"
    />
  );
}
```
