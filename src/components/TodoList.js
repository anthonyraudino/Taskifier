import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Task from './Task';
import AddTaskModal from './AddTaskModal';

const TodoList = ({ list, addTask, deleteTask, toggleComplete, editTask }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Card style={{ height: '100%', overflowY: 'auto' }}>
      <Card.Body>
        <Card.Title>{list.name}</Card.Title>
        {list.tasks.map(task => (
          <Task 
            key={task.id} 
            task={task} 
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            editTask={editTask}
          />
        ))}
        <Button onClick={() => setShowModal(true)}>Add Task</Button>
      </Card.Body>
      <AddTaskModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        addTask={(task) => {
          addTask(list.id, task);
          setShowModal(false);
        }} 
      />
    </Card>
  );
};

export default TodoList;
