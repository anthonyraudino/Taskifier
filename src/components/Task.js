import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { formatDistanceToNow, isPast, isWithinInterval, subDays } from 'date-fns';

const Task = ({ task, deleteTask, toggleComplete, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleEditSubmit = () => {
    editTask(task.id, editedTask);
    setIsEditing(false);
  };

  const dueDate = new Date(task.dueDate);
  const isOverdue = isPast(dueDate);
  const isNearDue = isWithinInterval(dueDate, { start: new Date(), end: subDays(new Date(), -1) });

  const getCardStyle = () => {
    if (isOverdue) return 'bg-dark text-white';
    if (isNearDue) return 'bg-warning';
    return '';
  };

  return (
    <Card className={getCardStyle()}>
      <Card.Body>
        {isEditing ? (
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedTask.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editedTask.description}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="dueDate"
                value={editedTask.dueDate}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleEditSubmit}>Save</Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
          </Form>
        ) : (
          <>
            <Card.Title>
              {task.name} {task.isComplete && <span className="text-success">(Complete)</span>}
            </Card.Title>
            <Card.Text>
              {task.description}
              <br />
              Due: {dueDate.toLocaleString()}
              <br />
              Location: {task.location}
              <br />
              <small>{formatDistanceToNow(dueDate, { addSuffix: true })}</small>
            </Card.Text>
            <Button variant="success" onClick={() => toggleComplete(task.id)}>
              {task.isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
            <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Task;