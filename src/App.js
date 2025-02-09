import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://todo-app-backend-9s7y.onrender.com";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res.data));
  }, [tasks]);  // 👈 Dependency array includes `tasks`
  

  const addTask = () => {
    if (!newTask) return;
    axios.post(API_URL, { title: newTask }).then((res) => {
      setTasks([...tasks, res.data]);
      setNewTask("");
    });
  };

  const toggleTask = (id, completed) => {
    axios.put(`${API_URL}/${id}`, { completed: !completed }).then((res) => {
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    });
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }} onClick={() => toggleTask(task._id, task.completed)}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
