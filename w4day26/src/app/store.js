import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import todoReducer from "../features/counter/todoSlice";
import { api } from "../app/api";




export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todoReducer,
        [api.reducerPath]: api.reducer, // <-- RTK Query reducer added
        // add other slice reducers here
    },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // ✅ RTK Query middleware
});


    