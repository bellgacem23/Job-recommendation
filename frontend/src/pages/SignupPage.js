import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const jobTitles = [
  'Web Developer',
  'Data Scientist',
  'Software Engineer',
  'UX/UI Designer',
  'Product Manager',
  'Marketing Specialist',
  'Business Analyst',
  'DevOps Engineer',
  'System Administrator',
  'Security Analyst',
  'Data Analyst',
  'Content Writer',
];

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState(0);
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !jobTitle ||
      skills.length === 0
    ) {
      setError('Please fill in all fields and select at least one skill.');
      return;
    }

    setName(`${firstName} ${lastName}`);

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/signup', {
        firstName,
        lastName,
        username,
        email,
        password,
        jobTitle,
        experience,
        skills,
      });

      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Error during signup. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillChange = (e) => {
    setSearchSkill(e.target.value);
    const filtered = jobTitles.filter((skill) =>
      skill.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSkills(filtered);
  };

  const handleSkillSelect = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSearchSkill('');
    setFilteredSkills([]);
  };

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Job Title</label>
          <select
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Job Title</option>
            {jobTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Experience (in years)</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Skills</label>
          <div className="relative">
            <input
              type="text"
              value={searchSkill}
              onChange={handleSkillChange}
              placeholder="Search for skills"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {filteredSkills.length > 0 && (
              <ul className="absolute left-0 top-full w-full bg-white border border-gray-300 mt-1 rounded-md shadow-md z-10">
                {filteredSkills.map((skill, index) => (
                  <li
                    key={index}
                    onClick={() => handleSkillSelect(skill)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap mt-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 mr-2 mb-2 text-sm flex items-center"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleSkillRemove(skill)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
