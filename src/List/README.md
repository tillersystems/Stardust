# List

### Usage

List component displays a list of item through data passed props.
You can format the data to stylise it or render the item in one line.

```jsx
import { List } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Example

```jsx
import { List } from '@tillersystems/stardust';

const datas = [
  {
    icon: '#457b9d',
    label: 'Tartare de boeuf',
    amount: 3 280,
    evolution: 0.12,
  },
  {
    icon: '#eda3a3',
    label: 'Avocado Toast',
    amount: 2267,
    evolution: 0.06,
  },
  {
    icon: '#a8dadc',
    label: 'Pavé de saumon',
    amount: 1829,
    evolution: 0.04,
  },
];

const formatLabel = ({ label }) => (
  <>
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" role="presentation">
      <rect x="0" y="1.5" fill={value} width="10" height="10" rx="3" ry="3" />
    </svg>
    {label}
  </>
);

render() {
  return (
    <List data={data.map(row => ({
      ...row,
      label: formatLabel(row),
    }))} currency="EUR" locale="fr" />
  );
}
```
