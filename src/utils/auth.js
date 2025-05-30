// auth.js

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const login = (username, password) => {
  // Accept any non-empty username and password
  if (username && password) {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
};
