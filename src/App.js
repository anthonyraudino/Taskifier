import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTaskModal from './components/AddTaskModal';
import Header from './components/Header';
import { loadLists, saveLists } from './utils/localStorageUtils';

function App() {
  const [lists, setLists] = useState(loadLists());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    saveLists(lists);
  }, [lists]);

  const addTask = (listId, task) => {
    setLists(lists.map(list => 
      list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list
    ));
  };

  const deleteTask = (taskId) => {
    setLists(lists.map(list => 
      ({ ...list, tasks: list.tasks.filter(task => task.id !== taskId) })
    ));
  };

  const toggleComplete = (taskId) => {
    setLists(lists.map(list => 
      ({ ...list, tasks: list.tasks.map(task => 
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      ) })
    ));
  };

  const editTask = (taskId, updatedTask) => {
    setLists(lists.map(list => 
      ({ ...list, tasks: list.tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ) })
    ));
  };

  const addList = (name) => {
    setLists([...lists, { id: Date.now(), name, tasks: [] }]);
  };

  return (
    <>
      <Header onAddList={() => setShowModal(true)} />
      <div id="root">
        {lists.length === 0 ? (
          <div className="empty-message-container d-flex justify-content-center align-items-center">
            <div className="empty-message text-center">
              <h3>There's nothing here!</h3>
              
              Get started by creating a new Task List
            </div>
          </div>
        ) : (
          lists.map(list => (
            <div key={list.id} className="list-container">
              <TodoList 
                list={list} 
                addTask={addTask} 
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                editTask={editTask}
              />
            </div>
          ))
        )}
        <AddTaskModal 
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          addList={addList} 
        />
      </div>
    </>
  );
}

export default App;