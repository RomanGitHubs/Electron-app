import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [type, setType] = useState('all');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue === '') return;
    const todo = {
      id: Math.random(),
      text: inputValue,
      checked: false,
    }
    setTodos(state => [...state, todo])
    setInputValue('');
  };

  const handleToggle = (e) => {
    console.log(todos)
    const id = e.target.id;
    const temp = todos.slice()

    temp.forEach((item) => {
      if (item.id === id) {
        item.checked = !item.checked
      }
    })

    setTodos(temp)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form className="todo-header" onSubmit={handleAddTodo}>
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button>Add</button>
        </form>
        <div>
          <button onClick={() => setType('all')}>All</button>
          <button onClick={() => setType('todo')}>Todo</button>
          <button onClick={() => setType('done')}>Done</button>
        </div>

        <div className="todo-body">
          {todos.map((item) => {
            if (type === 'all') {
              return (
                <div key={item.id} className="todo-item">
                  <input type='checkbox' id={item.id} value={item.checked} onChange={handleToggle}/>
                  <p>{item.text}</p>
                  <div>Del</div>
                </div>
              )
            }

            if (type === 'todo' && item.checked == false) {
              return (
                <div key={item.id} className="todo-item">
                  <input type='checkbox' id={item.id} value={item.checked} onChange={handleToggle}/>
                  <p>{item.text}</p>
                  <div>Del</div>
                </div>
              )
            }

            if (type === 'done' && item.checked == true) {
            return (
              <div key={item.id} className="todo-item">
                <input type='checkbox' id={item.id} value={item.checked} onChange={handleToggle}/>
                <p>{item.text}</p>
                <div>Del</div>
              </div>
            )
            }
            
            return null;
          })}
        </div>

      </header>
    </div>
  );
}

export default App;
