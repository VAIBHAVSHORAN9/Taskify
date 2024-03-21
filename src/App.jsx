import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    // setTodos(todo)   We can't do this, this will delete all the previous entries. 
    // In setTodos, we have access to previous data. prev is an array of all todo objects
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    // Matching id of required todo with all Todos
    // prev is an array of multiple objects and prevTodo is individual object
    setTodos((prev) => prev.map( (prevTodo) => prevTodo.id === id ? todo : prevTodo ))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter( (prevTodo) => prevTodo.id !== id ))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map( (prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo ))
  }

  // When website refreshes, fetch data from local storage. It will run only once during initial render
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0) setTodos(todos)
  }, [])

  // Whenever todos get updated, store it in local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              
              <div className="mb-4">
                  <TodoForm />
              </div>

              <div className="flex flex-wrap gap-y-3">
                  {todos.map((todo) => (
                    <div key={todo.id} className='w-full'>
                      <TodoItem todo={todo}/>
                    </div>
                  ))}
              </div>

          </div>
      </div>
    </TodoProvider>
  )
}

export default App
