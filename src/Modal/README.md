# Modal

### Usage

```jsx
import Modal from 'components/Modal';

// or

import { Modal } from 'components';
```

<!-- STORY -->

### Properties

- `active` - Boolean set to display or hide the modal.
- `children` - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
- `className` - className needed by styled components.
- `height` - Modal height.
- `width` - Modal width.
- `overlayClick` - A model can have a clickable overlay to close it.

| propName       | propType | defaultValue | isRequired |
| -------------- | -------- | ------------ | ---------- |
| `active`       | `bool`   | `false`      | -          |
| `children`     | `node`   | `null`       | -          |
| `className`    | `string` | `''`         | -          |
| `height`       | `string` | `48rem`      | -          |
| `width`        | `string` | `39rem`      | -          |
| `overlayClick` | `func`   | `null`       | -          |

### Example

```jsx
import Modal from 'components/modal';

render() {
  return (
    <Modal active={false} width="50" height="35">
      <Modal.Header>Header</Modal.Header>
      <Modal.Body>Body</Modal.Body>
      <Modal.Footer>
        <Button failure onClick={() => {}}>
          Close modal
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
```
