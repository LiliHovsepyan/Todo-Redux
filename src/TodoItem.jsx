import React from 'react'

import { doneTodo, removeTodo } from './store/todoSlice'
import { useDispatch } from 'react-redux'

const TodoItem = ({id, title, completed,}) => {

  const dispatch = useDispatch();

  return (
    <div className='TodoItem'>
      <span>{title}</span>
      <input type="checkbox" checked={completed} onChange={()=> dispatch(doneTodo({id}))} />
      <button onClick={()=> dispatch(removeTodo({id}))}>remove</button>
    </div>
  )
}

export default TodoItem