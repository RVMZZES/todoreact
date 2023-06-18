import {configureStore} from "@reduxjs/toolkit";
import modalReducer from './reducers/modal.slice.js'
import taskReducer from './reducers/task.slice.js'
import {tasksApi} from "../API/reducers/tasksApi.js";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        tasks: taskReducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware)
})
