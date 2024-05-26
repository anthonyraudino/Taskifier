import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Task from './Task';
import AddTaskModal from './AddTaskModal';

const TodoList = ({ list, addTask, deleteTask, toggleComplete, editTask }) => {
  const [showModal, setShowModal] = useState(false);

  const sortedTasks = list.tasks
    .slice() // Create a copy of the tasks array to avoid mutating the original array
    .sort((a, b) => {
      if (a.isComplete !== b.isComplete) {
        return a.isComplete ? 1 : -1; // Move completed tasks to the bottom
      }
      return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date (oldest to newest)
    });

  return (
    <Card style={{ height: '100%', overflowY: 'auto' }}>
      <div className="taskListTitle" style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
        <Card.Title>{list.name}</Card.Title>
      </div>
      <Card.Body>
        {sortedTasks.map(task => (
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
