'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Delhi',
    dateDay: '',
    dateMonth: '',
    dateYear: '',
    gender: 'male',
    experience: 'fresher',
    availability: 'immediately',
    address: '',
    hometown: '',
    pincode: '',
    languages: [{ language: 'English', proficiency: 'Intermediate', read: true, write: false, speak: false }],
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    yearsExp: '',
    monthsExp: ''
  });
  const [services, setServices] = useState([
    {
      id: 1,
      category: 'Photography',
      type: 'Portrait Photography',
      description: 'Capturing portraits of individuals or groups',
      experience: '2-3 years'
    },
    {
      id: 2,
      category: 'Photography',
      type: 'Wedding Photography',
      description: 'Documenting weddings and related events',
      experience: '5-6 years'
    }
  ]);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectType, setProjectType] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [newProject, setNewProject] = useState({
    name: '',
    caption: '',
    description: '',
    tags: '',
    category: '',
    industry: ''
  });
  const [photos, setPhotos] = useState([
    { id: 1, type: 'Wedding Photography', caption: 'Capturing the beauty and joy during my cousin brother\'s wedding' },
    { id: 2, type: 'Fashion Photography', caption: 'Fashion is the fashion industry\'s capturing stunning fashion moments' },
    { id: 3, type: 'Food Photography', caption: 'Showcasing colors and textures for various clients in the area' }
  ]);
  const [videos, setVideos] = useState([
    { id: 1, type: 'Wedding Photography', caption: 'Capturing the beauty and joy during my cousin brother\'s wedding' },
    { id: 2, type: 'Product Photography', caption: 'Providing high-quality for advertisement & brochure' },
    { id: 3, type: 'Event Photography', caption: 'Capturing vibrant colors and emotions from the event that highlights' }
  ]);

  const serviceCategories = [
    'Wedding Photography',
    'Portrait Photography',
    'Event Photography',
    'Commercial Photography',
    'Fine Art Photography',
    'Sports Photography',
    'Travel Photography',
    'Pet Photography',
    'Newborn and Maternity Photography',
    'Architectural Photography',
    'Documentary Photography',
    'Candid Photography',
    'Fashion Photography',
    'Food Photography',
    'Product Photography'
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguageChange = (index: number, field: string, value: any) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setFormData(prev => ({ ...prev, languages: newLanguages }));
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', proficiency: 'Beginner', read: false, write: false, speak: false }]
    }));
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    
    setTimeout(() => {
      setShowSuccessModal(false);
      setSuccessMessage('');
    }, 2000);
  };

  const handleSubmit = () => {
    console.log(formData);
    showSuccess('Profile Saved Successfully');
  };

  const handleAddService = () => {
    if (newService.name && newService.description) {
      const expYears = newService.yearsExp || '0';
      const expMonths = newService.monthsExp || '0';
      const experience = `${expYears}-${expMonths} years`;
      
      setServices([...services, {
        id: services.length + 1,
        category: 'Photography',
        type: newService.name,
        description: newService.description,
        experience
      }]);
      
      setNewService({ name: '', description: '', yearsExp: '', monthsExp: '' });
      setShowServiceModal(false);
      setShowServicePicker(false);
      showSuccess('Service Added Successfully');
    }
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.caption) {
      const newItem = {
        id: Date.now(),
        type: newProject.name,
        caption: newProject.caption
      };

      if (projectType === 'photo') {
        setPhotos([...photos, newItem]);
      } else {
        setVideos([...videos, newItem]);
      }

      setNewProject({ name: '', caption: '', description: '', tags: '', category: '', industry: '' });
      setShowProjectModal(false);
      showSuccess('Project Uploaded Successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Reusable Success Modal - Now smaller popup */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-white rounded-lg shadow-2xl p-6 md:p-8 text-center max-w-sm w-full mx-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm md:text-base font-semibold text-gray-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Side - Upload Section */}
              <div className="p-8 border-r border-gray-200">
                <h2 className="text-xl font-semibold mb-8">Add Your Project</h2>
                
                <div className="flex gap-8 justify-center">
                  <button
                    onClick={() => setProjectType('photo')}
                    className={`flex flex-col items-center gap-3 p-6 rounded-lg border-2 ${
                      projectType === 'photo' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Image</span>
                  </button>

                  <button
                    onClick={() => setProjectType('video')}
                    className={`flex flex-col items-center gap-3 p-6 rounded-lg border-2 ${
                      projectType === 'video' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Video</span>
                  </button>
                </div>
              </div>

              {/* Right Side - Details Form */}
              <div className="p-8 bg-gray-50">
                <h3 className="text-lg font-semibold mb-6">Add Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      placeholder="Enter project title"
                      className="w-full border border-gray-300 p-2.5 rounded text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Caption <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={newProject.caption}
                      onChange={(e) => setNewProject({ ...newProject, caption: e.target.value })}
                      placeholder="Write a caption for the project"
                      className="w-full border border-gray-300 p-2.5 rounded text-sm bg-white"
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {500 - (newProject.caption?.length || 0)} Character(s) left
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Tags <span className="text-gray-400">(Add upto 5)</span>
                    </label>
                    <input
                      value={newProject.tags}
                      onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                      placeholder="Add 5 keywords related to your project"
                      className="w-full border border-gray-300 p-2.5 rounded text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Category <span className="text-gray-400">(Add upto 3)</span>
                    </label>
                    <input
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      placeholder="Add Categories"
                      className="w-full border border-gray-300 p-2.5 rounded text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={newProject.industry}
                      onChange={(e) => setNewProject({ ...newProject, industry: e.target.value })}
                      className="w-full border border-gray-300 p-2.5 rounded text-sm bg-white"
                    >
                      <option value="">Add Categories</option>
                      <option value="photography">Photography</option>
                      <option value="videography">Videography</option>
                      <option value="design">Design</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    onClick={() => {
                      setShowProjectModal(false);
                      setProjectType('');
                      setNewProject({ name: '', caption: '', description: '', tags: '', category: '', industry: '' });
                    }}
                    className="px-6 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProject}
                    className="px-8 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowServiceModal(false);
                setShowServicePicker(false);
                setNewService({ name: '', description: '', yearsExp: '', monthsExp: '' });
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6">Add Service</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name
                </label>
                <div className="relative">
                  <input
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    onClick={() => setShowServicePicker(true)}
                    placeholder="Type a service you provide"
                    className="w-full border border-gray-300 p-2.5 rounded text-sm pr-8"
                    readOnly
                  />
                  <button
                    onClick={() => setShowServicePicker(!showServicePicker)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {showServicePicker && (
                  <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-80 max-h-96 overflow-y-auto z-10">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold">Choose Service</h3>
                    </div>
                    <div className="p-3">
                      {serviceCategories.map((service) => (
                        <label key={service} className="flex items-center gap-3 py-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="serviceCategory"
                            checked={newService.name === service}
                            onChange={() => {
                              setNewService({ ...newService, name: service });
                              setShowServicePicker(false);
                            }}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-sm text-gray-700">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Description
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Write a short description for the service you provide"
                  className="w-full border border-gray-300 p-2.5 rounded text-sm h-32 resize-none"
                  maxLength={4000}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {4000 - (newService.description?.length || 0)} Character(s) left
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Experience
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newService.yearsExp}
                    onChange={(e) => setNewService({ ...newService, yearsExp: e.target.value })}
                    className="border border-gray-300 p-2.5 rounded text-sm"
                  >
                    <option value="">Years</option>
                    {Array.from({ length: 51 }, (_, i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                  <select
                    value={newService.monthsExp}
                    onChange={(e) => setNewService({ ...newService, monthsExp: e.target.value })}
                    className="border border-gray-300 p-2.5 rounded text-sm"
                  >
                    <option value="">Months</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setShowServiceModal(false);
                  setShowServicePicker(false);
                  setNewService({ name: '', description: '', yearsExp: '', monthsExp: '' });
                }}
                className="px-6 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddService}
                className="px-8 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow-sm">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'basic'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500'
              }`}
            >
              Basic Information
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'services'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'portfolio'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500'
              }`}
            >
              Portfolio
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'basic' && (
              <div>
                {/* Profile Picture */}
                <div className="mb-8">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <button className="text-orange-500 text-sm mt-2 font-medium">
                    Upload Picture
                  </button>
                </div>

                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      name="name"
                      placeholder="Random Name"
                      className="w-full border border-gray-300 p-2.5 rounded text-sm"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      name="email"
                      placeholder="Randommail@gmail.com"
                      className="w-full border border-gray-300 p-2.5 rounded text-sm"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      placeholder="Randommail@gmail.com"
                      className="w-full border border-gray-300 p-2.5 rounded text-sm"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      name="location"
                      className="w-full border border-gray-300 p-2.5 rounded text-sm"
                      onChange={handleChange}
                      value={formData.location}
                    >
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of birth
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <select
                      name="dateDay"
                      className="border border-gray-300 p-2.5 rounded text-sm"
                      onChange={handleChange}
                    >
                      <option value="">Date</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      name="dateMonth"
                      className="border border-gray-300 p-2.5 rounded text-sm"
                      onChange={handleChange}
                    >
                      <option value="">Month</option>
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                        <option key={i} value={i + 1}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      name="dateYear"
                      className="border border-gray-300 p-2.5 rounded text-sm"
                      onChange={handleChange}
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => (
                        <option key={i} value={2024 - i}>
                          {2024 - i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Gender
                  </label>
                  <div className="flex gap-6">
                    {[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'others', label: 'Others' }
                    ].map(g => (
                      <label key={g.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={g.value}
                          checked={formData.gender === g.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange-500"
                        />
                        <span className="text-sm text-gray-700">{g.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Experience
                  </label>
                  <div className="flex gap-6">
                    {[
                      { value: 'fresher', label: 'Fresher' },
                      { value: 'experienced', label: 'Experienced' }
                    ].map(exp => (
                      <label key={exp.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="experience"
                          value={exp.value}
                          checked={formData.experience === exp.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange-500"
                        />
                        <span className="text-sm text-gray-700">{exp.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Availability
                  </label>
                  <div className="flex gap-6">
                    {[
                      { value: 'immediately', label: 'Immediately' },
                      { value: 'within a week', label: 'Within a week' },
                      { value: 'within 15 days', label: 'Within 15 days' }
                    ].map(a => (
                      <label key={a.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="availability"
                          value={a.value}
                          checked={formData.availability === a.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-orange-500"
                        />
                        <span className="text-sm text-gray-700">{a.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Address Fields */}
                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permanent Address
                    </label>
                    <input
                      name="address"
                      placeholder="Enter address"
                      className="w-full border border-gray-300 p-2.5 rounded text-sm"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hometown
                      </label>
                      <input
                        name="hometown"
                        placeholder="Delhi"
                        className="w-full border border-gray-300 p-2.5 rounded text-sm"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode
                      </label>
                      <input
                        name="pincode"
                        placeholder="110001"
                        className="w-full border border-gray-300 p-2.5 rounded text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Languages
                  </label>
                  {formData.languages.map((lang, index) => (
                    <div key={index} className="mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <select
                          value={lang.language}
                          onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                          className="border border-gray-300 p-2.5 rounded text-sm"
                        >
                          <option>English</option>
                          <option>Hindi</option>
                          <option>Spanish</option>
                        </select>

                        <select
                          value={lang.proficiency}
                          onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                          className="border border-gray-300 p-2.5 rounded text-sm"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Expert</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={lang.read}
                            onChange={(e) => handleLanguageChange(index, 'read', e.target.checked)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-sm text-gray-700">Read</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={lang.write}
                            onChange={(e) => handleLanguageChange(index, 'write', e.target.checked)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-sm text-gray-700">Write</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={lang.speak}
                            onChange={(e) => handleLanguageChange(index, 'speak', e.target.checked)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-sm text-gray-700">Speak</span>
                        </label>
                        {index > 0 && (
                          <button
                            onClick={() => {
                              const newLanguages = formData.languages.filter((_, i) => i !== index);
                              setFormData(prev => ({ ...prev, languages: newLanguages }));
                            }}
                            className="ml-auto text-sm text-gray-500 hover:text-red-500"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addLanguage}
                    className="text-orange-500 text-sm font-medium hover:underline"
                  >
                    Add languages
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Services</h2>
                  <button
                    onClick={() => setShowServiceModal(true)}
                    className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800"
                  >
                    Add Service
                  </button>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="border border-gray-200 rounded-lg p-6 bg-white relative">
                      <button className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <h3 className="font-semibold mb-4">{service.category}</h3>
                      <div className="grid grid-cols-3 gap-8">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Type</p>
                          <p className="text-sm">{service.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Description</p>
                          <p className="text-sm">{service.description}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Experience</p>
                          <p className="text-sm">{service.experience}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div>
                {/* Photos Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Photos</h3>
                    <button
                      onClick={() => {
                        setProjectType('photo');
                        setShowProjectModal(true);
                      }}
                      className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800"
                    >
                      Add Photos
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="bg-gray-200 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-orange-200 to-pink-200"></div>
                        <div className="p-4 bg-white">
                          <p className="font-medium text-sm mb-1">{photo.type}</p>
                          <p className="text-xs text-gray-600">{photo.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Videos Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Videos</h3>
                    <button
                      onClick={() => {
                        setProjectType('video');
                        setShowProjectModal(true);
                      }}
                      className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800"
                    >
                      Add Videos
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {videos.map((video) => (
                      <div key={video.id} className="bg-gray-200 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <div className="p-4 bg-white">
                          <p className="font-medium text-sm mb-1">{video.type}</p>
                          <p className="text-xs text-gray-600">{video.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6 bg-white p-6 rounded-b-lg shadow-sm">
          <button className="px-6 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )};