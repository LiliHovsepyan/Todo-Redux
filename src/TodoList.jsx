import TodoItem from './TodoItem';

import { useSelector } from 'react-redux';


const TodoList = () => {
  
   const todos = useSelector(state => state.todos.todos);   

  return (
    <div className='TodoList'>
      {
        todos.map(item=> <TodoItem key={item.id} {...item} />)
      }
    </div>
  )
}

export default TodoList