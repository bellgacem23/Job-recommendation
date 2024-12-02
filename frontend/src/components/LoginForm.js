import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to login
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input name="username" onChange={handleChange} placeholder="Username" className="mb-3 w-full" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="mb-3 w-full" />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 w-full">Login</button>
    </form>
  );
};

export default LoginForm;
