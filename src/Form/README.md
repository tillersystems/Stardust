# Form

### Usage

```jsx
import Form from 'components/Form';

// or

import { Form } from 'components';
```

<!-- STORY -->

### Form Properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - className needed by styled components.
- `onSubmit` - action handler for submitting form.
- `name` - form name.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `children`  |  `node`  |    `null`    |     -      |
| `className` | `string` |     `''`     |     -      |
| `onSubmit`  |  `func`  |    `null`    |     -      |
| `name`      | `string` |     `''`     |     -      |

### Form Group properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - className needed by styled components.
- `row` - whether to display fields in a row or not.
- `inlineLabels` - whether to display fields' labels inline or not.
- `labelsWidth` - width of the fields' label.

| propName       | propType | defaultValue | isRequired |
| -------------- | :------: | :----------: | :--------: |
| `children`     |  `node`  |    `null`    |     -      |
| `className`    | `string` |     `''`     |     -      |
| `row`          |  `bool`  |   `false`    |     -      |
| `inlineLabels` |  `bool`  |   `false`    |     -      |
| `labelsWidth`  | `string` |   `10rem`    |     -      |

### Form Field properties

- `children` - anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - className needed by styled components.
- `label` - label content.

| propName    | propType | defaultValue | isRequired |
| ----------- | :------: | :----------: | :--------: |
| `children`  |  `node`  |    `null`    |     -      |
| `className` | `string` |     `''`     |     -      |
| `label`     | `string` |     `''`     |     -      |

### Example

```jsx
import Form from 'components/Form';

render() {
  return (
      <Form onSubmit={() => {}} name="form">
        <Form.Group>
          <Form.Field label="Label">
              <Input
                type="text"
                placeholder="tape inside me"
                value=''
                onChange={() => {}}
              />
          </Form.Field>
        </Form.Group>
      </Form>
  );
}
```
