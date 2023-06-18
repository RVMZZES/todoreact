import React, {useState} from 'react';
import done from "../images/done.png";
import wait from "../images/wait.png";
import save from "../images/save.png";
import redact from "../images/redact.png";
import remove from "../images/delete.png";
import {useDispatch, useSelector} from "react-redux";
import {openModal, closeModal} from "../redux/reducers/modal.slice.js";
import {useDeleteOneTaskMutation, useEditTaskMutation} from "../API/reducers/tasksApi.js";

const TasksList = () => {
    const [taskInputValue, setTaskInputValue] = useState('')
    const [isInput, setIsInput] = useState(false)
    const [selectedItem, setSelectedItem] = useState({});
    const dispatch = useDispatch()
    const {tasks} = useSelector(state => state.tasks)
    const [deleteOneTask] = useDeleteOneTaskMutation()
    const [editTask] = useEditTaskMutation()

    const changeTask = async (item) => {
        await editTask({text: taskInputValue ? taskInputValue : item.text, id: item._id, checked: item.checked}).unwrap()
        setTaskInputValue('')
    }

    const handleInputTaskChange = event => {
        setTaskInputValue(event.target.value);
    }

    return (
        <div className='workSpace'>{
            tasks.map((item) => (
                <div className='task' key={item._id}>
                    {isInput && selectedItem._id === item._id
                        ? <input
                            type='text'
                            value={taskInputValue}
                            onChange={handleInputTaskChange}
                            className='inputForEdit'
                          />
                        : <span style={item.checked ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>
                            {item.text}
                          </span>
                    }
                    <div>
                        <img
                            className={'icons'}
                            src={item.checked ? done : wait}
                            onClick={() => changeTask({...item, checked: !item.checked})}
                        />
                        {isInput && selectedItem._id === item._id
                            ? <img
                                className={'icons'}
                                src={save}
                                onClick={() => {
                                    setIsInput(false)
                                    changeTask(item)
                                }}
                            />
                            :
                            <img
                                className={'icons'}
                                src={redact}
                                onClick={() => {
                                    setIsInput(true)
                                    setSelectedItem(item)
                                    setTaskInputValue(item.text)
                                }}
                            />
                        }
                        <img
                            className={'icons'}
                            src={remove}
                            onClick={() => {
                                    dispatch(openModal({
                                    text: (<>
                                    <strong>U want to remove: </strong>
                                    <div>&quot;{item.text}&quot;</div>
                                    </>),
                                    onClose: () => {
                                        dispatch(closeModal())
                                    },
                                    onRemove: () => {
                                        deleteOneTask(item._id)
                                            .then(dispatch(closeModal()))
                                    }
                                }))
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TasksList;