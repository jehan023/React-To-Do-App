import React from 'react';

const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
    return(
        <>
            {/**Add Task**/}
            <div className='row'>
              <div className='col'>
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className='form-control form-control-lg' />
              </div>
              <div
                onClick={addTask}
                className='col-auto'>
                <button className='btn btn-lg btn-success'>Add Task</button>
              </div>
            </div>
            <br />
        </>
    )
}

export default AddTaskForm;