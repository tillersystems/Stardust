# Table

### Usage

A Table displays structured data through rows and columns.
It can be sorted by column (asc, desc). An object of data array can contain its own array of data through a `children` prop
that must follow the same object structure as an object of `data`.

```jsx
import { Table } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

#### Table props

| Name           | Required |   Type   |    DefaultValue     |                                  Description                                  |
| -------------- | :------: | :------: | :-----------------: | :---------------------------------------------------------------------------: |
| `sort`         |    -     | `object` |       `null`        |     The sort to use. Must include `column` and `order` (`asc` or `desc`)      |
| `data`         |    +     | `array`  |          -          |                               The data of table                               |
| `colsDef`      |    +     | `array`  |          -          |   List of columns to display. Must respect Columns definition given below.    |
| `dataTotal`    |    -     | `object` |       `null`        | Optional object of the same shape as data, to use as the total row in footer. |
| `height`       |    -     | `string` |       `null`        |                        The table height in CSS value.                         |
| `isScrollable` |    -     |  `bool`  |       `false`       |           If table can scroll horizontally, of be fluid if `false`.           |
| `isHoverable`  |    -     |  `bool`  |       `false`       |                          If rows can be highlighted.                          |
| `onSortChange` |    -     |  `func`  |       `null`        |                  Callback when sort column or order changes.                  |
| `rowsDef`      |    -     | `object` | `{ onClick: null }` |      An object defining rows. Must respect Rows definition given below.       |
| `striped`      |    -     |  `bool`  |       `false`       |                         If the table must be striped.                         |
| `width`        |    -     | `string` |       `null`        |                  The table width. Ignored if `isScrollable`.                  |

```js
onSortChange(sort);
```

`onSortChange` receives a `sort` object in the form of `{ column: 'column-name', order: 'desc' }` when user changes the sort of table.
If function is defined, sort must be controlled and passed from parent.
If not, table control sort internally with its state.

#### Columns definition

| Name               | Required |    Type    | DefaultValue |                                                                                                  Description                                                                                                  |
| ------------------ | :------: | :--------: | :----------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `align`            |    -     |  `string`  |   `center`   |                                                                          Alignment of the cell's content (`left`, `center`, `right`)                                                                          |
| `isRowHeader`      |    -     | `boolean`  |   `false`    | Define if the column going to be a row header or not. In scrollable mode that column going to stick to the left side of the table. To avoid weird behaviour this parameter should be set on the first column. |
| `format`           |    -     | `function` |    `null`    |                                                                                         Format the value for display                                                                                          |
| `isSortable`       |    -     | `boolean`  |   `false`    |                                                                                     Whether the column is sortable or not                                                                                     |
| `sort`             |    -     |  `object`  |    `null`    |                                                                     The sort to use. Must include `column` and `order` (`asc` or `desc`)                                                                      |
| `sortBy`           |    -     | `function` |    `null`    |                                                                          The value to use as sorting. Defaults use `value` function                                                                           |
| `defaultSortOrder` |    -     | `function` |    `asc`     |                                       The default sort order. If asc, first sort will be `asc` -> `desc` -> reset. If `desc`, sorting will be `desc` -> `asc` -> reset.                                       |
| `name`             |    +     |  `string`  |              |                                                                                               Column identifier                                                                                               |
| `title`            |    +     |  `string`  |    `null`    |                                                                                              Title of the colum                                                                                               |
| `total`            |    +     | `function` |     `''`     |                                              Function to retrieve the total of a data for a given column. Use this parameter only if the dataTotal props is set.                                              |
| `value`            |    +     | `function` |     `''`     |                                                                          Function to retrieve the value of a data for a given column                                                                          |
| `width`            |    -     |  `string`  |    `null`    |                                                               Width of the column (either a relative weight, or a fixed size in `rem` or `px`)                                                                |

Each column must be identified by an unique `name`.

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

| Name         | Required |   Type    | DefaultValue |                         Description                         |
| ------------ | :------: | :-------: | :----------: | :---------------------------------------------------------: |
| `onSelect`   |    -     |  `func`   |  `() => {}`  |                  Handler on row selection                   |
| `selectable` |    -     | `boolean` |   `false`    | Whether the rows are selectable or not (default to `false`) |

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
    children: [
      {
        name: 'Oeufs pochés',
        price: 11.0,
        tax: {
          fr: 9.0,
          en: 7.0,
        },
      }
    ]
  },
];

const colsDef = [
  {
    title: 'DISH',
    value: d => d.name,
    format: v => <span style={{ color: 'hsl(213, 17%, 20%)', fontWeight: 600 }}>{v}</span>,
    isSortable: dishRowSortable,
    align: 'left',
  },
  {
    title: 'PRICE',
    value: d => d.price,
    format: v => `${v.toFixed(2)} €`,
    align: 'right',
    isSortable: priceRowSortable,
    defaultSortOrder: 'desc',
    width: '20rem',
  },
  {
    title: 'TAX',
    value: d => d.tax,
    format: v => `${v.fr.toFixed(2)} %`,
    sortBy: d => d.tax.fr,
    align: 'right',
    isSortable: titleRowSortable,
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
