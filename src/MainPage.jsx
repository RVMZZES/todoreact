import {useEffect, useState} from "react";
import {useBlur} from "./BlurContext.jsx";
import Fetches from "./API/Fetches.js";
import Header from "./components/Header.jsx";
import TasksList from "./components/TasksList.jsx";
import Modal from "./components/Modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {openModal, closeModal} from "./redux/reducers/modal.slice.js";
import {setTasks} from "./redux/reducers/task.slice.js";
import {useGetTasksQuery, useAddTaskMutation, useDeleteAllTaskMutation} from "./API/reducers/tasksApi.js";

export function MainPage() {

    const {isBlur} = useBlur();
    const dispatch = useDispatch()
    const {data=[]} = useGetTasksQuery()
    const [deleteAllTasks] = useDeleteAllTaskMutation()
    useEffect(() => { // загрузка тасков из бд при загрузке страницы
        dispatch(setTasks({tasks: data}))
    }, [data])

    const openModalForRemoveAll = () => {
        dispatch(openModal({
            text: "U want to remove all tasks!",
            onClose: () => dispatch(closeModal()),
            onRemove: () => {
                deleteAllTasks().unwrap()
                    .then(dispatch(closeModal()))
            }
        }))
    }

    return <div className={isBlur ? 'main show-blur' : 'main'}>
        <Header/>
        <TasksList/>
        <button
            className={'delAll'}
            onClick={() => openModalForRemoveAll()}
        >
            Clear task list
        </button>
        <Modal/>
    </div>
}