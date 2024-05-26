import React, { useState, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import Task from './Task';
import AddTaskModal from './AddTaskModal';
import { FaTimes } from 'react-icons/fa';
import gsap from 'gsap';

const TodoList = ({ list, addTask, deleteTask, toggleComplete, editTask, deleteList }) => {
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef(null);

  const handleDeleteList = () => {
    gsap.to(cardRef.current, {
      duration: 0.5,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      padding: 0,
      onComplete: () => deleteList(list.id)
    });
  };

  const sortedTasks = list.tasks
    .slice() // Create a copy of the tasks array to avoid mutating the original array
    .sort((a, b) => {
      if (a.isComplete !== b.isComplete) {
        return a.isComplete ? 1 : -1; // Move completed tasks to the bottom
      }
      return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date (oldest to newest)
    });

  return (
    <Card ref={cardRef} style={{ height: '100%', overflowY: 'auto' }}>
      <div className="taskListTitle" style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
        <Card.Title>
          {list.name}
          <FaTimes 
            className="listDeleteIcon" 
            onClick={handleDeleteList} 
            style={{ cursor: 'pointer', float: 'right' }} 
          />
        </Card.Title>
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
