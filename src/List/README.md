# Message

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
    mainLabel: 'Tartare de boeuf',
    secondaryLabel: '3 280 €',
    annexe: '+ 12%',
  },
  {
    icon: '#eda3a3',
    mainLabel: 'Avocado Toast',
    secondaryLabel: '2 267 €',
    annexe: '+ 6%',
  },
  {
    icon: '#a8dadc',
    mainLabel: 'Pavé de saumon',
    secondaryLabel: '1 829 €',
    annexe: '+ 4%',
  },
];

const formatDatas = {
  icon: value => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" role="presentation">
      <rect x="0" y="1.5" fill={value} width="10" height="10" rx="3" ry="3" />
    </svg>
  ),
  mainLabel: value => <Main>{value}</Main>,
  secondaryLabel: value => <Secondary>{value}</Secondary>,
  annexe: value => <Annexe>{value}</Annexe>,
};

render() {
  return (
    <List datas={datas} formatDatas={formatDatas} />
  );
}
```
