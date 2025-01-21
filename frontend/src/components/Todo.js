import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/add-task',
        { task: newTask },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4"
        style={{
          color: '#ae86ff',
          backgroundColor: 'transparent',
          boxShadow: '10px 20px 30px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2 className="text-center mb-4">Todo Tasks</h2>
        <div className="mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="btn btn-primary" onClick={addTask} disabled={!newTask.trim()}>
              Add Task
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <ul className="list-group">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {task.task}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Todo;
