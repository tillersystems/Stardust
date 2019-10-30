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

#### Columns definition

| Name          | Required |    Type    | DefaultValue |                                                                                                  Description                                                                                                  |
| ------------- | :------: | :--------: | :----------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `align`       |    -     |  `string`  |   `center`   |                                                                          Alignment of the cell's content (`left`, `center`, `right`)                                                                          |
| `isRowHeader` |    -     | `boolean`  |   `false`    | Define if the column going to be a row header or not. In scrollable mode that column going to stick to the left side of the table. To avoid weird behaviour this parameter should be set on the first column. |
| `filteredBy`  |    -     | `function` |    `null`    |                                                                                        Filters the object by the value                                                                                        |
| `format`      |    -     | `function` |    `null`    |                                                                                         Format the value for display                                                                                          |
| `isSortable`  |    -     | `boolean`  |   `false`    |                                                                                     Whether the column is sortable or not                                                                                     |
| `title`       |    +     |  `string`  |    `null`    |                                                                                              Title of the colum                                                                                               |
| `total`       |    +     | `function` |     `''`     |                                              Function to retrieve the total of a data for a given column. Use this parameter only if the dataTotal props is set.                                              |
| `value`       |    +     | `function` |     `''`     |                                                                          Function to retrieve the value of a data for a given column                                                                          |
| `width`       |    -     |  `string`  |      ``      |                                                               Width of the column (either a relative weight, or a fixed size in `rem` or `px`)                                                                |

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
    width: '20rem',
  },
  {
    title: 'TAX',
    value: d => d.tax,
    format: v => `${v.fr.toFixed(2)} %`,
    filteredBy: v => v.fr,
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
