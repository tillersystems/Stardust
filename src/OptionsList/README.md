# OptionsList

### Usage

```jsx
import { OptionsList } from '@tillersystems/stardust';
```

<!-- STORY -->

### Description

An OptionsList allows the user to make one or more choices through a list of options in the form of radio buttons or checkboxes.

### Properties

| Name                   | Required |      Type       |     DefaultValue      |                                 Description                                 |
| ---------------------- | :------: | :-------------: | :-------------------: | :-------------------------------------------------------------------------: |
| `allowMultiple`        |    -     |    `string`     |        `null`         |                          Allow multiple selections                          |
| `className`            |    -     |    `string`     |        `null`         |                    className needed by styled components                    |
| `noResult`             |    -     | `string`,`node` |        `null`         |             Label/Component to display when no result is found              |
| `onChange`             |    -     |     `func`      | `([...values]) => {}` |         Method triggered when an option change, values is an array          |
| `options`              |    +     |     `array`     |                       |    Array of options with shape : `{ value: 'the-value', label: 'Label'}`    |
| `OptionComponent`      |    -     |  `func`,`node`  |                       |                        Component for option display                         |
| `searchBarPlaceholder` |    -     |    `string`     |         `''`          |                         SearchBar input placeholder                         |
| `searchMethod`         |    -     |     `func`      |        `null`         | Method used to filter the results. If defined, the search bar is displayed. |
| `toggleAllLabel`       |    -     |    `string`     |        `null`         |       Should a toggle all option be available with the provided text        |
| `values`               |    +     |     `array`     |                       |                          Array of selected values                           |

### Example

```jsx
import { OptionsList } from '@tillersystems/stardust';

const OptionComponent = ({ className, disabled, isChecked, label, onChange, value, values }) => (
  <li onClick={() => onChange(value)}>{label} - {value}</li>
);

const NoResult = ({ term, setTerm, options }) => (
  <div>
  No result / {options.length} for your search :
  {term} - <a onClick={() => setTerm('')>Clear search</a>
  </div>
);

render() {
  const options = [
    { value: 'my-value-1', label: 'My first label' },
    { value: 'my-value-2', label: 'My second label' }
  ];

  const onChange = selectedValues => {
    this.setState({ values: selectedValues });
  };

  const search = ({ options, term }) =>
    options.filter(option => option.label.toLowerCase().includes(term.toLowerCase()));

  return (
    <OptionsList
      allowMultiple
      noResultLabel="Nothing to see here"
      NoResultComponent={NoResult}
      onChange={onChange}
      options={options}
      OptionComponent={OptionComponent}
      searchBarPlaceholder="Search me !"
      searchMethod={search}
      values={this.state.values}
    />
  );
}
```
