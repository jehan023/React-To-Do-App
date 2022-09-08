import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from 'uuid';

import './App.css';
import AddTaskForm from './components/AddTaskForm';
import UpdateForm from './components/UpdateForm';
import ToDo from './components/ToDo';

function App() {

  //Task (ToDo List) State: Where the records been get and set
  const [toDo, setToDo] = useState(() => {
    // get the toDo from localstorage
    const savedToDos = localStorage.getItem("toDo");
    // if there are todos stored
    if (savedToDos) {
      // return the parsed the JSON object back to a javascript object
      return JSON.parse(savedToDos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });

  useEffect(() => {
    // localstorage only support storing strings as keys and values
    // - therfore we cannot store arrays and objects without converting the object
    // into a string first. JSON.stringify will convert the object into a JSON string
    localStorage.setItem("toDo", JSON.stringify(toDo));
    // add the todos as a dependancy because we want to update the
    // localstorage anytime the todos state changes
  }, [toDo]);

  //Temporary State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  console.log(toDo.length);


  //Add Task
  const addTask = () => {
    if (newTask) {
      let newEntry = { id: v4(), title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  }

  //Delete Task
  const deleteTask = (id) => {
    let newTask = toDo.filter(task => task.id !== id);
    setToDo(newTask);
  }

  //Mark task as done or completed
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }

  //Cancel Update
  const cancelUpdate = () => {
    setUpdateData('');
  }

  //Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  //Update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
  }


  return (
    <div className="container App">
      <div className='content'>
        <div className='header'>
          <h1>To-Do List (ReactJS)</h1>
        </div>

        <div className='content-app'>
          {/**Update Task**/}
          {updateData && updateData ? (
            <UpdateForm 
              updateData={updateData}
              changeTask={changeTask}
              updateTask={updateTask}
              cancelUpdate={cancelUpdate}
            />
          ) : (
            <AddTaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
            />
          ) }
          

          {/**Display To-Dos**/} 

          {toDo && toDo.length ? '' : 'No Task'}

          <ToDo 
            toDo={toDo}
            markDone={markDone}
            setUpdateData={setUpdateData}
            deleteTask={deleteTask}
          />
        </div>
      </div>
      <br />
      <div className='author'>Hadjisaid, Jehan</div>
    </div>
  );
}

export default App;
