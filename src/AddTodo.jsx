import { useState } from "react";

import { useDispatch } from "react-redux";
import {addTodo} from './store/todoSlice'


const AddTodo = () => {

    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
  
    const addTask = ()=>{

      if(title.trim().length === 0) return;

      dispatch(addTodo({title}));
      setTitle('');
    } 


  return (
    <div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={addTask}>ADD</button>
    </div>
  )
}

export default AddTodo