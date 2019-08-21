# Modal

### Description

A Modal is displayed through a Portal added at the end of the body element. An overlay hides
everything expect the modal itself. Action when clicking on the overlay can be used to control modal display.

Modal can be used to display additional informations to the user, or ask for user input.

### Usage

```jsx
import { Modal } from '@tillersystems/stardust';
```

<!-- STORY -->

<!-- PROPS -->

### Example

```jsx
import Modal from 'components/modal';

render() {
  return (
    <Modal active={false} width="50" height="35" padding="2">
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
