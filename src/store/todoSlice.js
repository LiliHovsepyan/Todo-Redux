import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}){
        try{

            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if(!response.ok){
                throw new Error('Server Error');
            }

            const data = await response.json();
            return data;

        }catch(e){
            return rejectWithValue(e.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}){
        try{

            const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
                method: 'DELETE'
            });

            if(!response.ok){
                throw new Error('Server Error. Cant delete Task');
            }

            dispatch(removeTodo({id}))

        }catch(e){
            return rejectWithValue(e.message);
        }
    }
);

export const completedTodo = createAsyncThunk(
    'todos/completedTodo',
    async function(id, {rejectWithValue, dispatch, getState}){
        const todo = getState().todos.todos.find(el => el.id === id);

        try{

           const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: !todo.completed
            })
           });     

           if(!response.ok) throw new Error('SErver Error. Cant Toggle Task');

           dispatch(doneTodo({id}));

        }catch(e){
            return rejectWithValue(e.message);
        }

    }
);

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(title, {rejectWithValue, dispatch}){
        try{

            const todo = {
                title: title,
                completed: false
            };

            const response = await fetch('https://jsonplaceholder.typicode.com/todos/', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });

            if(!response.ok) throw new Error('Server Error, Cant add Todo');

            const data = await response.json();

            dispatch(addTodo(data));


        }catch(e){
            return rejectWithValue(e.message);
        }
    }
);


const todoSlice = createSlice({
    name: 'todos',
    initialState:{
        todos: []
    },
    reducers: {
        addTodo(state, action){
            state.todos.push({
                id: Date.now(),
                title: action.payload.title,
                completed: false
            });
        },
        doneTodo(state, action){
            const todo = state.todos.find(el=> el.id === action.payload.id);
            todo.completed = !todo.completed;
        },
        removeTodo(state, action){
            state.todos = state.todos.filter(el=> el.id !== action.payload.id);
        }
    }
});

export const {addTodo, doneTodo, removeTodo} =  todoSlice.actions;
export default todoSlice.reducer;

