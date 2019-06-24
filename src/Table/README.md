# Table

### Usage

```jsx
import { Table } from '@tillersystems/stardust';
```

<!-- STORY -->

### Properties

- `colsDef` - columns definition.
- `rowsDef` - rows definition.
- `data` - data to display.
- `width` - width of the table.
- `striped` - whether rows should alternate color or not.

| propName  | propType | defaultValue | isRequired |
| --------- | :------: | :----------: | :--------: |
| `colsDef` | `array`  |      -       |     \*     |
| `rowsDef` | `object` |     `{}`     |     -      |
| `data`    | `array`  |      -       |     \*     |
| `width`   | `string` |    `100%`    |     -      |
| `striped` |  `bool`  |   `false`    |     -      |

#### Columns definition

- `title` - **required** - title of the column, can be either a `string` or a `Component`.
- `value` - **required** - function to get the value from a column.
- `format` - _optional_ - function to format the value for display.
- `filteredBy` - _optional_ - Filters the object by the value.
- `width` - _optional_ - width of the column (either a relative weight, or a fixed size in `rem` or `px`).
- `align` - _optional_ - alignment of the cell's content (`left`, `center`, `right`, by default `center`).
- `sortable` - _optional_ - whether the column is sortable or not (default `false`).

The difference between `value` and `format` mostly resides in the fact that `value` is the actual
value used by the sorting. `format` is "only" used to display the given value to the user (it
actually takes as argument the returned value from `value`).

`value` is a function that takes in the current row, and optionally its index (sorted), and returns
the `value` to display or to sort. If no `format` is given the returned value is the one used in
display.

```js
value(d, i);
```

`format` is a function that takes in the returned value from `value`, and optionally its index
(sorted) and returns either a string or a component to display.

```js
format(v, i);
```

#### Rows definition

- `selectable` - _optional_ - whether the rows are selectable or not (default to `false`).
- `onSelect` - _optional_ - handler on row selection.

The `onSelect` callback is actually called only if `selectable` is set to `true` explicitely. It is
given the object of the row and its index in the original array.

```js
onSelect(item, key);
```

### Example

```jsx
import { Table } from '@tillersystems/stardust';

const data = [
  {
    name: 'Tartare de boeuf',
    price: 15.0,
    tax: {
      fr: 9.0,
      en: 10.0,
    },
  },
  {
    name: 'Oeuf cocotte',
    price: 13.0,
    tax: {
      fr: 7.0,
      en: 6.0,
    },
  },
  {
    name: 'Salade caesar',
    price: 16.0,
    tax: {
      fr: 10.0,
      en: 3.0,
    },
  },
];

const colsDef = [
  {
    title: 'DISH',
    value: d => d.name,
    format: v => <span style={{ color: 'hsl(213, 17%, 20%)', fontWeight: 600 }}>{v}</span>,
    sortable: dishRowSortable,
    align: 'left',
    sortable: true,
  },
  {
    title: 'PRICE',
    value: d => d.price,
    format: v => `${v.toFixed(2)} €`,
    align: 'right',
    sortable: priceRowSortable,
    width: '20rem',
    sortable: true,
  },
  {
    title: 'TAX',
    value: d => d.tax,
    format: v => `${v.fr.toFixed(2)} %`,
    filteredBy: v => v.fr,
    align: 'right',
    sortable: titleRowSortable,
    width: '20rem',
  },
];

const rowsDef = {
  selectable: true,
  onSelect: (item, key) => doSomething(item, key),
}

render() {
  return <Table data={data} colsDef={colsDef} rowsDef={rowsDef} />;
}
```
