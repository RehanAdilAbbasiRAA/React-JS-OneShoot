// src/app/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// This connects the frontend to your FastAPI backend
export const api = createApi({
  reducerPath: "api", // a unique name for this API slice in Redux store

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000", // backend base URL
  }),

  endpoints: (builder) => ({

    // ✅ 1. Get all tasks (GET)
    getTasks: builder.query({ // builder.query() → used for GET requests (data fetching).
      query: () => ({
        url: "/gettasks",
        method: "GET",
      }),
    }),

    // ✅ 2. Add a new task (POST)
    addTask: builder.mutation({ //builder.mutation() → used for POST, PUT, DELETE — operations that change data.
      query: (task) => ({
        url: "/addtask",
        method: "POST",
        body: task, // sending new task data to backend
      }),
    }),

    // ✅ 3. Update an existing task (PUT)
    updateTask: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/updatetask/${id}`,
        method: "PUT",
        body: updatedData, // updated data (like new title)
      }),
    }),

    // ✅ 4. Delete a task (DELETE)
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/deltask/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// ✅ Auto-generated React hooks for each API
export const {
  useGetTasksQuery, //React Hook Function
  useAddTaskMutation, //React Hook Function
  useUpdateTaskMutation, //So yes — they are functions, specifically React hooks (that’s why they start with use).
  useDeleteTaskMutation,
} = api;
// export const { useGetTasksQuery, useAddTaskMutation } = api;
// you’re simply pulling those hook functions out of the api object and exporting them individually as named exports (not default).



// | Type         | Automatically runs? | Purpose     | Example                |
// | ------------ | ------------------- | ----------- | ---------------------- |
// | **Query**    | ✅ Yes               | Fetch data  | `useGetTasksQuery()`   |
// | **Mutation** | ❌ No                | Change data | `useAddTaskMutation()` |

//😻😻
// For every key (like getTasks, addTask, etc.), RTK Query automatically generates a hook name based on two things:
// | Endpoint type        | Auto-generated hook           |
// | -------------------- | ----------------------------- |
// | `builder.query()`    | `use<EndpointName>Query()`    |
// | `builder.mutation()` | `use<EndpointName>Mutation()` |
