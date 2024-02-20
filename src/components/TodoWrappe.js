import React, {useState} from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo'; // Fix the file name casing
import { EditTodoForm } from './EditTodoForm';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

export const TodoWrappe = () => {

   const [todos, setTodos] = useState([])

   const addTodo = todo => {
    setTodos([...todos, {id: uuidv4(), task: todo, 
        completed: false, isEditing: false}])
    }

    const toggleCompleted = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo,
            completed: !todo.completed} : todo))
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing}: todo))
    }

    const editTask = (task, id) => { 
        setTodos(todos.map(todo => todo.id === id ? {...todo, 
            task: task, isEditing: !todo.isEditing}: todo))
    }

    
  return (
    <div className='TodoWrapper'>
        <h1>Get things Done</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
             todo.isEditing ? 
             <EditTodoForm editTodo={editTask} task={todo} /> 
             : (
                 <Todo  task={todo} key={index}
                toggleCompleted={toggleCompleted} 
                deleteTodo={deleteTodo} 
                editTodo={editTodo} />
             )   
        ))}
    </div>
  )
}
