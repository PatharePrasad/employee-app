import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import '../styles/ListPage.css';
import { mockEmployees } from './AddEditPage';

const ListPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddNew = () => {
    navigate('/add');
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="list-container">
      <div className="list-header">
        <h1 className="title">👨‍💼 Employee List</h1>
        <button onClick={handleLogout} className="btn logout">Logout</button>
      </div>

      <div className="list-controls">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by name or department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleAddNew} className="btn add">➕ Add New Employee</button>
      </div>

      <div className="list-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.date}</td>
                <td className="actions">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="btn edit"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="btn delete"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListPage;
