import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan, faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

const ToDo = ({ toDo, markDone, setUpdateData, deleteTask }) => {
    return(
        <>
            {toDo && toDo
            .sort((a, b) => a.id > b.id ? 1 : -1)
            .map((task) => {
              return (
                <React.Fragment key={task.id}>
                    <div className='col'>
                    <div className="taskBg">
                        <div className={task.status ? "done" : ""}>
                        <span className="taskText">{task.title}</span>
                        </div>
                        <div className="iconsWrap">
                        <span
                            className="fa-lg text-info"
                            title="Completed / Not Completed"
                            onClick={(e) => markDone(task.id)}
                        >
                            {task.status ? (<FontAwesomeIcon icon={faCircleXmark} />) : (<FontAwesomeIcon icon={faCircleCheck} />)}
                        </span>

                        {task.status ? null : (
                            <span
                            className="fa-lg"
                            title="Edit"
                            onClick={() =>
                                setUpdateData({
                                id: task.id,
                                title: task.title,
                                status: task.status ? true : false,
                                })
                            }
                            >
                            <FontAwesomeIcon icon={faPen} />
                            </span>
                        )}

                        <span
                            className="fa-lg"
                            title="Delete"
                            onClick={() => deleteTask(task.id)}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </span>
                        </div>
                    </div>
                    </div>
                </React.Fragment>
              );
            })
          }
        </>
    )
}

export default ToDo;