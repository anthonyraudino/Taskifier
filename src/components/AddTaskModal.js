import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddTaskModal = ({ show, handleClose, addTask, addList }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [location, setLocation] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 2) {
      axios.get(`https://nominatim.openstreetmap.org/lookup?format=json&q=${value}`)
        .then(response => {
          setLocationSuggestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching location suggestions:', error);
        });
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleLocationSelect = (suggestion) => {
    setLocation(suggestion.display_name);
    setLocationSuggestions([]);
  };

  const handleSubmit = () => {
    if (addTask) {
      addTask({ id: Date.now(), name, description, dueDate, location });
    } else if (addList) {
      addList(name);
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task / List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </Form.Group>
          {addTask && (
            <>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  type="text" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="formDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control 
                  type="datetime-local" 
                  value={dueDate} 
                  onChange={e => setDueDate(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                  type="text" 
                  value={location} 
                  onChange={handleLocationChange} 
                />
                <ul>
                  {locationSuggestions.map(suggestion => (
                    <li 
                      key={suggestion.place_id} 
                      onClick={() => handleLocationSelect(suggestion)}
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskModal;
