# TableVirtualized

### Usage

TableVirtualized displays tabular data through a fixed header, a fixed first column and a fixed footer.
It uses ScrollSync and Grids from react-virtualized.

```jsx
import { TableVirtualized } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

#### Columns definition

| Name         | Required |    Type    | DefaultValue |                         Description                         |
| ------------ | :------: | :--------: | :----------: | :---------------------------------------------------------: |
| `align`      |    -     |  `string`  |   `center`   | Alignment of the cell's content (`left`, `center`, `right`) |
| `filteredBy` |    -     | `function` |    `null`    |               Filters the object by the value               |
| `format`     |    -     | `function` |    `null`    |                Format the value for display                 |
| `isSortable` |    -     | `boolean`  |   `false`    |            Whether the column is sortable or not            |
| `title`      |    +     |  `string`  |    `null`    |                     Title of the colum                      |
| `value`      |    +     | `function` |     `''`     | Function to retrieve the value of a data for a given column |

The difference between `value` and `format` mostly resides in the fact that `value` is the raw
value used for sorting. When provided, `format` is used to display the value instead of the raw one.

```js
value({ item });
```

`format` is a function that takes as argument the item object, and returns either a string or a component to display.

```js
format({ item });
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
import { TableVirtualized } from '@tillersystems/stardust';

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
    value: ({ item }) => item.name,
    format: ({ item }) => <span style={{ color: 'hsl(213, 17%, 20%)', fontWeight: 600 }}>{item.name}</span>,
    isSortable: dishRowSortable,
    align: 'left',
  },
  {
    title: 'PRICE',
    value: ({ item }) => item.price,
    format: ({ item }) => `${item.price.toFixed(2)} €`,
    align: 'right',
    isSortable: priceRowSortable,
    width: '20rem',
  },
  {
    title: 'TAX',
    value: ({ item }) => item.tax,
    format: ({ item }) => `${item.tax.fr.toFixed(2)} %`,
    filteredBy: ({ item }) => item.tax.fr,
    align: 'right',
    isSortable: titleRowSortable,
    width: '20rem',
  },
];

const footerData = {
  name: 'Total',
  price: 60.0,
  tax: {
    fr: 10.0,
    en: 3.0,
  },
  quantity: 2,
  tva: 30,
  profit: 4,
  discount: 10,
};

const rowsDef = {
  selectable: true,
  onSelect: (item, key) => doSomething(item, key),
}

render() {
  return <Table data={data} colsDef={colsDef} footerData={footerData} height={400} rowsDef={rowsDef} />;
}
```
