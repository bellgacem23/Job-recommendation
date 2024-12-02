import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', password: '',
    email: '', address: '', jobTitle: '', skills: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to signup
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <input name="firstName" onChange={handleChange} placeholder="First Name" className="mb-3 w-full" />
      <input name="lastName" onChange={handleChange} placeholder="Last Name" className="mb-3 w-full" />
      <input name="username" onChange={handleChange} placeholder="Username" className="mb-3 w-full" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="mb-3 w-full" />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" className="mb-3 w-full" />
      <input name="address" onChange={handleChange} placeholder="Address" className="mb-3 w-full" />
      <input name="jobTitle" onChange={handleChange} placeholder="Job Title" className="mb-3 w-full" />
      <input name="skills" onChange={handleChange} placeholder="Skills" className="mb-3 w-full" />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 w-full">Sign Up</button>
    </form>
  );
};

export default SignupForm;
