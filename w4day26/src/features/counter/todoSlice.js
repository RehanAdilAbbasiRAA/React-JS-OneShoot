import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: 1, title: "learn redux", completed: false },
    { id: 2, title: "learn react", completed: true },
    { id: 3, title: "go to gym", completed: false },
  ],
};


const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo(state, action) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    resetTodo(state) {
      state.todos = [];
    },
  },
});

// export const removeTodo = todoSlice.actions.removeTodo;
// export const resetTodo = todoSlice.actions.resetTodo;
// here is a cleaner and better approach
export const { addTodo, toggleTodo, removeTodo, resetTodo } = todoSlice.actions;
export default todoSlice.reducer;

// Simple selector to get all todos
export const selectTodos = (state) => state.todos.todos;

// Derived selector — count of completed todos
export const selectCompletedCount = (state) =>
  state.todos.todos.filter((t) => t.completed).length;



// const initialState = {
//   todos: [
//     { id: 1, title: "learn redux", completed: false },
//     { id: 2, title: "learn react", completed: true },
//   ],
//   filter: "all", // <--- new value
//   loading: false, // <--- another value
//   user: { name: "Rehan", age: 22 }, // <--- nested object
// };


// IN Compoent we have to to this

// const todos = useSelector((state) => state.todos.todos);
// const filter = useSelector((state) => state.todos.filter);
// const loading = useSelector((state) => state.todos.loading);
// const user = useSelector((state) => state.todos.user);
