import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const tasksApi = createApi({
    reducerPath: 'getApi',
    tagTypes: ['Tasks'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => `data`,
            providesTags:  (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Tasks', id })), 'Tasks']
                    : ['Tasks'],
        }),
        addTask: builder.mutation({
            query: (body) => ({
                url: 'user',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'Tasks'}]
        }),
        deleteOneTask: builder.mutation({
            query: (id) => ({
                url: `data/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Tasks'}]
        }),
        deleteAllTask: builder.mutation({
            query: () => ({
                url: `data`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Tasks'}]
        }),
        editTask: builder.mutation({
            query: (body) => ({
                url: `data/${body.id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: [{type: 'Tasks'}]
        }),
    }),
})

export const {useGetTasksQuery, useAddTaskMutation,
    useDeleteOneTaskMutation, useDeleteAllTaskMutation,
    useEditTaskMutation} = tasksApi