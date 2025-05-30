import React from 'react';

function Table({ data, onEdit, onDelete }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Date of Joining</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.department}</td>
            <td>{item.date}</td>
            <td className="actions">
              <button onClick={() => onEdit(item.id)} className="action-button view">👁️</button>
              <button onClick={() => onEdit(item.id)} className="action-button edit">✏️</button>
              <button onClick={() => onDelete(item.id)} className="action-button delete">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;