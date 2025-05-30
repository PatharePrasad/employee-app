import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AddEditPage.css';

// Mock data storage (in a real app, this would be an API)
let mockEmployees = [
  {
    id: 1,
    name: 'ABC',
    department: 'IT',
    date: '2024-04-01',
    address: '123 Main St, City',
    gender: 'male',
    hobbies: ['Reading', 'Playing']
  },
  {
    id: 2,
    name: 'XYZ',
    department: 'Sales',
    date: '2023-01-15',
    address: '456 Market St, Town',
    gender: 'female',
    hobbies: ['Swimming', 'Singing']
  },
  {
    id: 3,
    name: 'PQR',
    department: 'HR',
    date: '2022-07-10',
    address: '789 Office Rd, Metro',
    gender: 'male',
    hobbies: ['Dancing', 'Sketching']
  }
];


export { mockEmployees };

function AddEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const departments = ['IT', 'Sales', 'Marketing', 'HR', 'Finance'];
  const hobbies = ['Reading', 'Swimming', 'Playing', 'Singing'];
  
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    date: '',
    address: '',
    gender: 'male',
    hobbies: []
  });

  useEffect(() => {
    if (isEditMode && id) {
      // Find the employee to edit
      const employeeToEdit = mockEmployees.find(emp => emp.id === parseInt(id));
      if (employeeToEdit) {
        setFormData(employeeToEdit);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHobbyChange = (hobby) => {
    setFormData(prev => {
      if (prev.hobbies.includes(hobby)) {
        return { ...prev, hobbies: prev.hobbies.filter(h => h !== hobby) };
      } else {
        return { ...prev, hobbies: [...prev.hobbies, hobby] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      // Update existing employee
      mockEmployees = mockEmployees.map(emp => 
        emp.id === parseInt(id) ? { ...formData, id: parseInt(id) } : emp
      );
      console.log('Updated employee:', formData);
    } else {
      // Add new employee
      const newEmployee = {
        ...formData,
        id: mockEmployees.length > 0 ? Math.max(...mockEmployees.map(emp => emp.id)) + 1 : 1
      };
      mockEmployees.push(newEmployee);
      console.log('Added new employee:', newEmployee);
    }
    
    navigate('/list');
  };

  const handleBack = () => {
    navigate('/list');
  };

  return (
    <div className="add-edit-container">
      <div className="header">
        <h1>{isEditMode ? 'Edit Page' : 'Add Page'}</h1>
        <div className="page-url">{isEditMode ? 'EditPage' : 'AddPage'}</div>
      </div>
      
      <form onSubmit={handleSubmit} className="add-edit-form">
        <div className="form-section">
          <div className="form-column">
            <div className="form-group">
              <label><b>Name:</b></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label><b>Department:</b></label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label><b>Date of Joining:</b></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label><b>Hobbies:</b></label>
              <div className="hobbies-container">
                {hobbies.map(hobby => (
                  <div key={hobby} className="hobby-item">
                    <input
                      type="checkbox"
                      id={hobby}
                      checked={formData.hobbies.includes(hobby)}
                      onChange={() => handleHobbyChange(hobby)}
                    />
                    <label htmlFor={hobby}>{hobby}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-column">
            <div className="form-group">
              <label><b>Address:</b></label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>
            
            <div className="form-group">
              <label><b>Gender:</b></label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          {isEditMode ? (
            <button type="submit" className="update-button">Update</button>
          ) : (
            <button type="submit" className="save-button">Save</button>
          )}
          <button type="button" onClick={handleBack} className="back-button">Back</button>
        </div>
      </form>
    </div>
  );
}

export default AddEditPage;