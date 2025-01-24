import React from 'react';

function TodoList() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ToDo List</h1>
      <ul className="list-group">
        <li className="list-group-item">Task 1</li>
        <li className="list-group-item">Task 2</li>
        <li className="list-group-item">Task 3</li>
      </ul>
      <button className="btn btn-success mt-3">Add New Task</button>
    </div>
  );
}

export default TodoList;
