import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const InfoUpdate = ({ data, onSubmit, loading = false }) => {
  // Initial form state with all sections
  const [form, setForm] = useState({
    title: "",
    bio: "",
    socialsLinks: [],
    workExperiences: [],
    education: [],
    certifications: [],
    skills: {
      technical: [],
      soft: []
    }
  });

  const [original, setOriginal] = useState(null);

  // Load data into form
// Load data into form
useEffect(() => {
  if (!data) return;

  const normalizedForm = {
    title: data.title || "",
    bio: data.bio || "",
    socialsLinks: data.socialsLinks || data.socials || [],
    workExperiences: data.workExperiences || [],
    education: data.education || [],
    certifications: data.certifications || [],
    skills: data.skills || { technical: [], soft: [] }
  };

  console.log("Loading form data:", normalizedForm);
  setForm(normalizedForm);
  setOriginal(JSON.stringify(normalizedForm));
}, [data]);

  const hasChanges = () => {
    return JSON.stringify(form) !== original;
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (!hasChanges()) {
    toast.error("No changes to update");
    return;
  }
  
  // Prepare payload - preserve ALL social links including empty ones
  const payload = {
    title: form.title,
    bio: form.bio,
    socialsLinks: form.socialsLinks, // Don't filter here - let backend handle
    workExperiences: form.workExperiences,
    education: form.education,
    certifications: form.certifications,
    skills: form.skills
  };
  
  console.log("Submitting info:", payload);
  onSubmit(payload);
};
  // Handle basic form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle social links
  const handleSocialLinkChange = (index, field, value) => {
    setForm((prev) => {
      const updatedSocials = [...prev.socialsLinks];
      updatedSocials[index] = {
        ...updatedSocials[index],
        [field]: value,
      };
      return {
        ...prev,
        socialsLinks: updatedSocials,
      };
    });
  };

  // WORK EXPERIENCE HANDLERS
  const handleWorkExperienceChange = (index, field, value) => {
    setForm((prev) => {
      const updatedExperiences = [...prev.workExperiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [field]: value,
      };
      return {
        ...prev,
        workExperiences: updatedExperiences,
      };
    });
  };

  const handleTechnologyAdd = (expIndex, tech) => {
    if (!tech.trim()) return;
    
    setForm((prev) => {
      const updatedExperiences = [...prev.workExperiences];
      if (!updatedExperiences[expIndex].technologies) {
        updatedExperiences[expIndex].technologies = [];
      }
      
      if (!updatedExperiences[expIndex].technologies.includes(tech)) {
        updatedExperiences[expIndex].technologies.push(tech);
      }
      
      return {
        ...prev,
        workExperiences: updatedExperiences,
      };
    });
  };

  const handleTechnologyRemove = (expIndex, techIndex) => {
    setForm((prev) => {
      const updatedExperiences = [...prev.workExperiences];
      updatedExperiences[expIndex].technologies.splice(techIndex, 1);
      return {
        ...prev,
        workExperiences: updatedExperiences,
      };
    });
  };

const addWorkExperience = () => {
  if (form.workExperiences.length >= 3) {
    toast.error("Maximum 3 work experiences allowed");
    return;
  }
  
  setForm((prev) => ({
    ...prev,
    workExperiences: [
      ...prev.workExperiences,
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        technologies: []
      }
    ]
  }));
};

  const removeWorkExperience = (index) => {
    setForm((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((_, i) => i !== index)
    }));
  };

  // EDUCATION HANDLERS
  const handleEducationChange = (index, field, value) => {
    setForm((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      };
      return {
        ...prev,
        education: updatedEducation,
      };
    });
  };

  const addEducation = () => {
    setForm((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          grade: "",
          description: ""
        }
      ]
    }));
  };

  const removeEducation = (index) => {
    setForm((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // CERTIFICATION HANDLERS
  const handleCertificationChange = (index, field, value) => {
    setForm((prev) => {
      const updatedCerts = [...prev.certifications];
      updatedCerts[index] = {
        ...updatedCerts[index],
        [field]: value,
      };
      return {
        ...prev,
        certifications: updatedCerts,
      };
    });
  };

  const addCertification = () => {
    setForm((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuer: "",
          issueDate: "",
          expiryDate: "",
          credentialId: "",
          url: ""
        }
      ]
    }));
  };

  const removeCertification = (index) => {
    setForm((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  // SKILLS HANDLERS
  const handleTechnicalSkillChange = (index, field, value) => {
    setForm((prev) => {
      const updatedSkills = { ...prev.skills };
      const updatedTechnical = [...updatedSkills.technical];
      updatedTechnical[index] = {
        ...updatedTechnical[index],
        [field]: field === 'level' ? parseInt(value) || 0 : value
      };
      
      return {
        ...prev,
        skills: {
          ...updatedSkills,
          technical: updatedTechnical
        }
      };
    });
  };

  const addTechnicalSkill = () => {
    setForm((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        technical: [
          ...prev.skills.technical,
          { name: "", level: 50 }
        ]
      }
    }));
  };

  const removeTechnicalSkill = (index) => {
    setForm((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        technical: prev.skills.technical.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSoftSkillChange = (index, value) => {
    setForm((prev) => {
      const updatedSkills = { ...prev.skills };
      const updatedSoft = [...updatedSkills.soft];
      updatedSoft[index] = value;
      
      return {
        ...prev,
        skills: {
          ...updatedSkills,
          soft: updatedSoft
        }
      };
    });
  };

  const addSoftSkill = () => {
    setForm((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        soft: [...prev.skills.soft, ""]
      }
    }));
  };

  const removeSoftSkill = (index) => {
    setForm((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        soft: prev.skills.soft.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="p-6 bg-[var(--color-card)] rounded-lg shadow-md flex flex-col gap-8 m-6">
      <h2 className="text-2xl font-bold text-[var(--color-text)]">
        Update Portfolio Information
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[var(--color-text)] border-b pb-2">
            Basic Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
              placeholder="e.g. Full Stack Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              rows={3}
              value={form.bio}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none resize-none"
              placeholder="Short professional description about you"
            />
          </div>
        </div>

        {/* Social Links Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[var(--color-text)] border-b pb-2">
            Social Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.socialsLinks.map((item, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-text)]">
                  {item.platform}
                </label>
                <input
                  type="text"
                  value={item.url || ""}
                  onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                  placeholder="Full URL"
                  className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[var(--color-text)]">
              Work Experience
            </h3>
            <button
              type="button"
              onClick={addWorkExperience}
              disabled={form.workExperiences.length >= 3}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Experience ({form.workExperiences.length}/3)
            </button>
          </div>
          
          {form.workExperiences.map((exp, index) => (
            <div key={index} className="p-4 border border-[var(--color-border)] rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-[var(--color-text)]">Experience #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeWorkExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company || ""}
                    onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="Company Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={exp.position || ""}
                    onChange={(e) => handleWorkExperienceChange(index, "position", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="Job Title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location || ""}
                    onChange={(e) => handleWorkExperienceChange(index, "location", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="City, Country"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={exp.startDate || ""}
                    onChange={(e) => handleWorkExperienceChange(index, "startDate", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={exp.endDate || ""}
                    onChange={(e) => handleWorkExperienceChange(index, "endDate", e.target.value)}
                    disabled={exp.current}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none disabled:opacity-50"
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={exp.current || false}
                      onChange={(e) => handleWorkExperienceChange(index, "current", e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`current-${index}`} className="text-sm text-[var(--color-text)]">
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description || ""}
                  onChange={(e) => handleWorkExperienceChange(index, "description", e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none resize-none"
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>
              
              {/* Technologies Used */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Technologies Used
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {exp.technologies?.map((tech, techIndex) => (
                    <span key={techIndex} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleTechnologyRemove(index, techIndex)}
                        className="text-blue-800 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id={`tech-input-${index}`}
                    placeholder="Add technology (e.g., React, MongoDB, AWS)"
                    className="flex-1 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleTechnologyAdd(index, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById(`tech-input-${index}`);
                      handleTechnologyAdd(index, input.value);
                      input.value = '';
                    }}
                    className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[var(--color-text)]">
              Education
            </h3>
            <button
              type="button"
              onClick={addEducation}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Education
            </button>
          </div>
          
          {form.education.map((edu, index) => (
            <div key={index} className="p-4 border border-[var(--color-border)] rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-[var(--color-text)]">Education #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={edu.institution || ""}
                    onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="University/School Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="e.g., Bachelor of Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.field || ""}
                    onChange={(e) => handleEducationChange(index, "field", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="e.g., Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Grade/GPA
                  </label>
                  <input
                    type="text"
                    value={edu.grade || ""}
                    onChange={(e) => handleEducationChange(index, "grade", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="e.g., 3.8/4.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={edu.startDate || ""}
                    onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={edu.endDate || ""}
                    onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  Description
                </label>
                <textarea
                  value={edu.description || ""}
                  onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none resize-none"
                  placeholder="Additional information about your education"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[var(--color-text)]">
              Certifications
            </h3>
            <button
              type="button"
              onClick={addCertification}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Certification
            </button>
          </div>
          
          {form.certifications.map((cert, index) => (
            <div key={index} className="p-4 border border-[var(--color-border)] rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-[var(--color-text)]">Certification #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={cert.name || ""}
                    onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="e.g., AWS Solutions Architect"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.issuer || ""}
                    onChange={(e) => handleCertificationChange(index, "issuer", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Issue Date
                  </label>
                  <input
                    type="month"
                    value={cert.issueDate || ""}
                    onChange={(e) => handleCertificationChange(index, "issueDate", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="month"
                    value={cert.expiryDate || ""}
                    onChange={(e) => handleCertificationChange(index, "expiryDate", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={cert.credentialId || ""}
                    onChange={(e) => handleCertificationChange(index, "credentialId", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="Certificate ID or URL"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[var(--color-text)]">
            Skills & Expertise
          </h3>
          
          {/* Technical Skills */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-[var(--color-text)]">Technical Skills</h4>
              <button
                type="button"
                onClick={addTechnicalSkill}
                className="px-4 py-2 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Add Technical Skill
              </button>
            </div>
            
            {form.skills.technical.map((skill, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border border-[var(--color-border)] rounded-lg">
                <div className="flex-1">
                  <input
                    type="text"
                    value={skill.name || ""}
                    onChange={(e) => handleTechnicalSkillChange(index, "name", e.target.value)}
                    className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none mb-2"
                    placeholder="Skill name (e.g., JavaScript, React)"
                  />
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[var(--color-text)]">Proficiency:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level || 50}
                      onChange={(e) => handleTechnicalSkillChange(index, "level", e.target.value)}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-[var(--color-text)] w-12">
                      {skill.level || 50}%
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeTechnicalSkill(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          {/* Soft Skills */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-[var(--color-text)]">Soft Skills</h4>
              <button
                type="button"
                onClick={addSoftSkill}
                className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Soft Skill
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {form.skills.soft.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border border-[var(--color-border)] rounded-lg">
                  <input
                    type="text"
                    value={skill || ""}
                    onChange={(e) => handleSoftSkillChange(index, e.target.value)}
                    className="flex-1 p-2 rounded border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                    placeholder="e.g., Communication, Leadership"
                  />
                  <button
                    type="button"
                    onClick={() => removeSoftSkill(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <button
            type="submit"
            disabled={loading || !hasChanges()}
            className="w-full md:w-auto px-8 py-3 rounded-lg bg-[var(--color-active)] text-[var(--color-primary)] font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Updating..."
              : hasChanges()
                ? "Update All Information"
                : "No Changes to Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfoUpdate;