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

const skillsByJob = {
  'Web Developer': [
    "HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js", "Node.js", "PHP", "Ruby on Rails", 
    "TypeScript", "SQL", "MongoDB", "Git", "GitHub", "GitLab", "Express.js", "Django", "Flask", 
    "Bootstrap", "Flexbox", "Media Queries", "Web Performance Optimization", "Caching", "Minification", 
    "Lazy loading", "Jest", "Mocha", "Selenium", "RESTful APIs", "GraphQL", "Cross-Browser Compatibility"
  ],
  'Data Scientist': [
    "Python", "R", "SQL", "Java", "Scala", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", 
    "Keras", "Matplotlib", "Seaborn", "Plotly", "Tableau", "Machine Learning", "Supervised Learning", 
    "Unsupervised Learning", "Classification", "Regression", "Clustering", "Neural Networks", "Big Data", 
    "Hadoop", "Spark", "Data Cleaning", "Data Preprocessing", "Feature Engineering", "Statistical Analysis"
  ],
  'Software Engineer': [
    "Java", "Python", "C++", "C#", "Go", "Ruby", "Object-Oriented Programming", "Functional Programming", 
    "SOLID Principles", "Git", "GitHub", "Bitbucket", "Unit Testing", "TDD", "BDD", "Algorithms", "Data Structures", 
    "Sorting", "Searching", "Graphs", "Trees", "Dynamic Programming", "Spring", "Django", ".NET", "React"
  ],
  'UX/UI Designer': [
    "Adobe XD", "Figma", "Sketch", "InVision", "Wireframing", "Prototyping", "User Research", "Persona Creation", 
    "Usability Testing", "Interaction Design", "Visual Design", "Information Architecture", "Mobile Design", 
    "Responsive Design", "User Flows", "Design Systems", "Design Thinking", "UX Principles", "UI Principles", 
    "Color Theory", "Typography", "Branding"
  ],
  'Product Manager': [
    "Product Roadmap", "Agile", "Scrum", "Kanban", "Project Management", "Stakeholder Management", 
    "User Stories", "Product Backlog", "Prioritization", "Market Research", "Competitive Analysis", "Wireframing", 
    "Prototyping", "Jira", "Confluence", "A/B Testing", "Customer Feedback", "Data Analysis", "Go-to-Market Strategy"
  ],
  'Marketing Specialist': [
    "SEO", "SEM", "Content Marketing", "Email Marketing", "Google Analytics", "Social Media Marketing", "PPC", 
    "Influencer Marketing", "Lead Generation", "Market Research", "Brand Strategy", "Digital Advertising", 
    "Campaign Management", "Conversion Rate Optimization", "Growth Hacking", "A/B Testing", "Copywriting", 
    "Data Analysis", "Customer Segmentation", "CRM Tools", "Facebook Ads", "Google Ads"
  ],
  'Business Analyst': [
    "Business Process Modeling", "Requirements Gathering", "Business Analysis", "Stakeholder Interviews", 
    "Data Analysis", "SQL", "Excel", "Power BI", "Tableau", "Jira", "Agile", "Scrum", "Flowcharts", 
    "SWOT Analysis", "Cost-Benefit Analysis", "Use Case Creation", "Documentation", "Risk Management", 
    "Project Management", "UML Diagrams", "Competitive Analysis"
  ],
  'DevOps Engineer': [
    "CI/CD", "Jenkins", "Docker", "Kubernetes", "Terraform", "Ansible", "Puppet", "Git", "GitHub", "AWS", 
    "Azure", "Google Cloud", "Linux", "Shell Scripting", "Infrastructure Automation", "Monitoring", 
    "Log Management", "Prometheus", "Grafana", "CloudFormation", "DevOps Culture", "Agile", "Containerization"
  ],
  'System Administrator': [
    "Linux", "Windows Server", "Unix", "Shell Scripting", "PowerShell", "Active Directory", "DNS", "DHCP", 
    "Network Configuration", "Virtualization", "Docker", "Kubernetes", "Cloud Platforms", "AWS", "Azure", 
    "Backup Solutions", "System Monitoring", "Firewall Configuration", "Security Patches", "Automation Tools"
  ],
  'Security Analyst': [
    "Cybersecurity", "Threat Intelligence", "Penetration Testing", "Risk Assessment", "Firewalls", "VPN", 
    "Encryption", "SOC", "Incident Response", "Vulnerability Scanning", "Network Security", "Endpoint Security", 
    "Compliance", "NIST", "ISO 27001", "GDPR", "SIEM", "IDS/IPS", "Access Control", "Forensics", "Cloud Security"
  ],
  'Data Analyst': [
    "Data Cleaning", "Data Visualization", "SQL", "Excel", "Tableau", "Power BI", "Python", "R", "Pandas", 
    "NumPy", "Statistics", "Data Mining", "Predictive Analytics", "Reporting", "A/B Testing", "Data Modeling", 
    "Data Warehousing", "Business Intelligence", "Data Collection", "ETL", "Big Data", "Hadoop", "Spark"
  ],
  'Content Writer': [
    "Copywriting", "SEO Writing", "Blog Writing", "Technical Writing", "Creative Writing", "Research", 
    "Content Strategy", "Social Media Content", "Email Newsletters", "WordPress", "CMS", "Content Editing", 
    "Proofreading", "AP Style", "Storytelling", "Brand Voice", "Content Marketing", "Market Research"
  ]
};


const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState(0);
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !username || !email || !password || !jobTitle || skills.length === 0) {
      setError('Please fill in all fields and select at least one skill.');
      return;
    }
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

  const handleJobTitleChange = (e) => {
    const selectedJob = e.target.value;
    setJobTitle(selectedJob);
    setAvailableSkills(skillsByJob[selectedJob] || []);
    setSkills([]);
  };

  const handleSkillSelect = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

      <form onSubmit={handleSignup}>
        {/* User Info */}
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

        {/* Job Title and Skills */}
        <div className="mb-4">
          <label className="block text-gray-700">Job Title</label>
          <select
            value={jobTitle}
            onChange={handleJobTitleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Job Title</option>
            {jobTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Skills</label>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillSelect(skill)}
                className={`px-3 py-1 rounded-md ${
                  skills.includes(skill) ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleSkillRemove(skill)}
                  className="ml-2 text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
