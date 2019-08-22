# Form

### Usage

```jsx
import { Form } from '@tillersystems/stardust';
```

<!-- STORY -->

### Description

A Form is used to collect, validate and submit user inputs through provided fields which can be text input, select, radio buttons, etc.  
Submit action is provided by onSubmit callback prop.

<!-- PROPS -->

### Example

```jsx
import { Form } from '@tillersystems/stardust';

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
