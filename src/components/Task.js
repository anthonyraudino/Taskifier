import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { formatDistanceToNow, isPast, isWithinInterval, subDays, addHours } from 'date-fns';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import gsap from 'gsap';
import './Task.css'; // Import the CSS file

// Fixing the default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const Task = ({ task, deleteTask, toggleComplete, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    ...task,
    dueDate: task.dueDate ? task.dueDate : addHours(new Date(), 2).toISOString().slice(0, -8),
  });
  const [location, setLocation] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (task.location) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(task.location)}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setLocation([lat, lon]);
          }
        });
    }
  }, [task.location]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleEditSubmit = () => {
    if (!editedTask.dueDate) {
      editedTask.dueDate = addHours(new Date(), 2).toISOString().slice(0, -8);
    }
    editTask(task.id, editedTask);
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    gsap.to(cardRef.current, {
      duration: 0.5,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      padding: 0,
      onComplete: () => deleteTask(task.id)
    });
  };

  const dueDate = new Date(task.dueDate);
  const isOverdue = isPast(dueDate);
  const isNearDue = isWithinInterval(dueDate, { start: new Date(), end: subDays(new Date(), -1) });
  const isComplete = task.isComplete;

  const getCardStyle = () => {
    if (!isComplete && isOverdue) return 'bg-danger text-white';
    if (isNearDue) return 'bg-warning';
    if (isComplete) return 'bg-success text-white';
    
    return '';
  };

  return (
    <Card ref={cardRef} className={getCardStyle()}>
      <Card.Body>
        {isEditing ? (
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedTask.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editedTask.description}
                onChange={handleEditChange}
                rows={3}
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
              <p className="taskName">{task.name} {task.isComplete && <span className="text-white">(Complete)</span>}</p>
              <span className="task-actions">
                <FaCheck className="task-icon taskComplete" onClick={() => toggleComplete(task.id)} />
                <FaEdit className="task-icon taskEdit" onClick={() => setIsEditing(true)} />
                <FaTimes className="task-icon taskDelete" onClick={handleDeleteTask} />
              </span>
            </Card.Title>
            <Card.Text>
              {task.description}
              <br />
              Due: {dueDate.toLocaleString()}
              {task.location && (
                <>
                  <br />
                  Location: {task.location}
                  {location && (
                    <div style={{ height: '200px', marginTop: '10px' }}>
                      <MapContainer
                        center={location}
                        zoom={15}
                        style={{ height: '100%' }}
                        dragging={false}
                        touchZoom={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                        boxZoom={false}
                        zoomControl={false}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={location}>
                          <Popup>{task.location}</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  )}
                </>
              )}
              <br />
              <small>Due {formatDistanceToNow(dueDate, { addSuffix: true })}</small>
            </Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Task;
