import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AboutModal = ({ show, handleClose }) => {
  return (
    <Modal dialogClassName="modal-90w"
    aria-labelledby="example-custom-modal-styling-title" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>About Taskifier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Taskifier is a simple and efficient task tracking application designed to help you manage your tasks effectively.</p>
        <p>With Taskifier, you can:</p>
        <ul>
          <li>Organize tasks into categories: Create multiple lists to categorize your tasks based on projects, priorities, or any other criteria you choose.</li>
          <li>Set due dates: Assign due dates to your tasks to keep track of deadlines and prioritize your work.</li>
          <li>Add descriptions: Provide detailed descriptions for each task to provide context and additional information.</li>
          <li>Attach locations: Include location information for tasks, allowing you to associate tasks with specific places or events.</li>
        </ul>
        <p>Taskifier offers a simple and intuitive interface, making it easy to add, edit, and manage your tasks on the go.</p>
        <p>Taskifier is built by Anthony Raudino with ♥ from Melbourne, Australia</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AboutModal;