import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

function EditProfile() {
  // =========================
  // PROFILE STATES
  // =========================

  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    professionalHeadline: "",
    aboutMe: "",
    skills: "",
    resumeUrl: "",
  });

  // =========================
  // EDUCATION STATES
  // =========================

  const [education, setEducation] = useState([]);

  const [showEducationForm, setShowEducationForm] =
    useState(false);

  const [editingEducationId, setEditingEducationId] =
    useState(null);

  const [educationForm, setEducationForm] = useState({
    degree: "",
    fieldOfStudy: "",
    institution: "",
    graduationYear: "",
  });

  // =========================
  // EXPERIENCE STATES
  // =========================

  const [experience, setExperience] = useState([]);

  const [showExperienceForm, setShowExperienceForm] =
    useState(false);

  const [editingExperienceId, setEditingExperienceId] =
    useState(null);

  const [experienceForm, setExperienceForm] = useState({
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // =========================
  // OTHER STATES
  // =========================

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeFileName, setResumeFileName] = useState("");

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchProfile();
    fetchEducation();
    fetchExperience();
  }, []);

  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile = async () => {
    try {
      const response = await api.get(
        "/api/candidate/profile"
      );

      const profile = response.data;

      const profileSkills = profile.skills
        ? profile.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "")
        : [];

      setSkills(profileSkills);

      setFormData({
        name: profile.user?.name || "",
        email: profile.user?.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        professionalHeadline:
          profile.professionalHeadline || "",
        aboutMe: profile.aboutMe || "",
        skills: profile.skills || "",
        resumeUrl: profile.resumeUrl || "",
      });

      const savedResumeName =
        profile.resumeFileName ||
        localStorage.getItem("resumeFileName") ||
        "";
      setResumeFileName(savedResumeName);
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error
      );

      setMessage("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH EDUCATION
  // =========================

  const fetchEducation = async () => {
    try {
      const response = await api.get(
        "/api/candidate/education"
      );

      setEducation(response.data);
    } catch (error) {
      console.error(
        "Error fetching education:",
        error
      );
    }
  };

  // =========================
  // FETCH EXPERIENCE
  // =========================

  const fetchExperience = async () => {
    try {
      const response = await api.get(
        "/api/candidate/experience"
      );

      setExperience(response.data);
    } catch (error) {
      console.error(
        "Error fetching experience:",
        error
      );
    }
  };

  // =========================
  // HANDLE PROFILE INPUT
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SKILLS
  // =========================

  const addSkill = () => {
    const skill = skillInput.trim();

    if (skill && !skills.includes(skill)) {
      const updatedSkills = [
        ...skills,
        skill,
      ];

      setSkills(updatedSkills);

      setFormData({
        ...formData,
        skills: updatedSkills.join(", "),
      });

      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(
      (skill) => skill !== skillToRemove
    );

    setSkills(updatedSkills);

    setFormData({
      ...formData,
      skills: updatedSkills.join(", "),
    });
  };

  // =========================================================
  // EDUCATION
  // =========================================================

  const handleEducationChange = (e) => {
    setEducationForm({
      ...educationForm,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // START EDITING EDUCATION
  // =========================

  const startEditingEducation = (item) => {
    setEducationForm({
      degree: item.degree || "",
      fieldOfStudy:
        item.fieldOfStudy || "",
      institution:
        item.institution || "",
      graduationYear:
        item.graduationYear || "",
    });

    setEditingEducationId(item.id);

    setShowEducationForm(true);

    setMessage("");
  };

  // =========================
  // RESET EDUCATION FORM
  // =========================

  const resetEducationForm = () => {
    setEducationForm({
      degree: "",
      fieldOfStudy: "",
      institution: "",
      graduationYear: "",
    });

    setEditingEducationId(null);

    setShowEducationForm(false);
  };

  // =========================
  // ADD EDUCATION
  // =========================

  const addEducation = async () => {
    if (
      !educationForm.degree.trim() ||
      !educationForm.fieldOfStudy.trim() ||
      !educationForm.institution.trim() ||
      !educationForm.graduationYear
    ) {
      setMessage(
        "Please fill all education fields."
      );

      return;
    }

    try {
      const response = await api.post(
        "/api/candidate/education",
        {
          degree: educationForm.degree,
          fieldOfStudy:
            educationForm.fieldOfStudy,
          institution:
            educationForm.institution,
          graduationYear: Number(
            educationForm.graduationYear
          ),
        }
      );

      setEducation([
        ...education,
        response.data,
      ]);

      resetEducationForm();

      setMessage(
        "Education added successfully!"
      );
    } catch (error) {
      console.error(
        "Error adding education:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to add education."
      );
    }
  };

  // =========================
  // UPDATE EDUCATION
  // =========================

  const updateEducation = async () => {
    if (
      !educationForm.degree.trim() ||
      !educationForm.fieldOfStudy.trim() ||
      !educationForm.institution.trim() ||
      !educationForm.graduationYear
    ) {
      setMessage(
        "Please fill all education fields."
      );

      return;
    }

    try {
      const response = await api.put(
        `/api/candidate/education/${editingEducationId}`,
        {
          degree: educationForm.degree,
          fieldOfStudy:
            educationForm.fieldOfStudy,
          institution:
            educationForm.institution,
          graduationYear: Number(
            educationForm.graduationYear
          ),
        }
      );

      setEducation(
        education.map((item) =>
          item.id === editingEducationId
            ? response.data
            : item
        )
      );

      resetEducationForm();

      setMessage(
        "Education updated successfully!"
      );
    } catch (error) {
      console.error(
        "Error updating education:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to update education."
      );
    }
  };

  // =========================
  // SAVE EDUCATION
  // =========================

  const handleEducationSave = () => {
    if (editingEducationId !== null) {
      updateEducation();
    } else {
      addEducation();
    }
  };

  // =========================
  // DELETE EDUCATION
  // =========================

  const deleteEducation = async (id) => {
    try {
      await api.delete(
        `/api/candidate/education/${id}`
      );

      setEducation(
        education.filter(
          (item) => item.id !== id
        )
      );

      if (editingEducationId === id) {
        resetEducationForm();
      }

      setMessage(
        "Education deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Error deleting education:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to delete education."
      );
    }
  };

  // =========================================================
  // EXPERIENCE
  // =========================================================

  const handleExperienceChange = (e) => {
    setExperienceForm({
      ...experienceForm,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // START EDITING EXPERIENCE
  // =========================

  const startEditingExperience = (item) => {
    setExperienceForm({
      jobTitle: item.jobTitle || "",
      company: item.company || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      description: item.description || "",
    });

    setEditingExperienceId(item.id);

    setShowExperienceForm(true);

    setMessage("");
  };

  // =========================
  // RESET EXPERIENCE FORM
  // =========================

  const resetExperienceForm = () => {
    setExperienceForm({
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    setEditingExperienceId(null);

    setShowExperienceForm(false);
  };

  // =========================
  // ADD EXPERIENCE
  // =========================

  const addExperience = async () => {
    if (
      !experienceForm.jobTitle.trim() ||
      !experienceForm.company.trim() ||
      !experienceForm.startDate
    ) {
      setMessage(
        "Please fill Job Title, Company and Start Date."
      );

      return;
    }

    try {
      const response = await api.post(
        "/api/candidate/experience",
        {
          jobTitle:
            experienceForm.jobTitle,
          company:
            experienceForm.company,
          startDate:
            experienceForm.startDate,
          endDate:
            experienceForm.endDate || null,
          description:
            experienceForm.description,
        }
      );

      setExperience([
        ...experience,
        response.data,
      ]);

      resetExperienceForm();

      setMessage(
        "Experience added successfully!"
      );
    } catch (error) {
      console.error(
        "Error adding experience:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to add experience."
      );
    }
  };

  // =========================
  // UPDATE EXPERIENCE
  // =========================

  const updateExperience = async () => {
    if (
      !experienceForm.jobTitle.trim() ||
      !experienceForm.company.trim() ||
      !experienceForm.startDate
    ) {
      setMessage(
        "Please fill Job Title, Company and Start Date."
      );

      return;
    }

    try {
      const response = await api.put(
        `/api/candidate/experience/${editingExperienceId}`,
        {
          jobTitle:
            experienceForm.jobTitle,
          company:
            experienceForm.company,
          startDate:
            experienceForm.startDate,
          endDate:
            experienceForm.endDate || null,
          description:
            experienceForm.description,
        }
      );

      setExperience(
        experience.map((item) =>
          item.id === editingExperienceId
            ? response.data
            : item
        )
      );

      resetExperienceForm();

      setMessage(
        "Experience updated successfully!"
      );
    } catch (error) {
      console.error(
        "Error updating experience:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to update experience."
      );
    }
  };

  // =========================
  // SAVE EXPERIENCE
  // =========================

  const handleExperienceSave = () => {
    if (editingExperienceId !== null) {
      updateExperience();
    } else {
      addExperience();
    }
  };

  // =========================
  // DELETE EXPERIENCE
  // =========================

  const deleteExperience = async (id) => {
    try {
      await api.delete(
        `/api/candidate/experience/${id}`
      );

      setExperience(
        experience.filter(
          (item) => item.id !== id
        )
      );

      if (editingExperienceId === id) {
        resetExperienceForm();
      }

      setMessage(
        "Experience deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Error deleting experience:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to delete experience."
      );
    }
  };

  // =========================
  // RESUME UPLOAD
  // =========================

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setMessage("Only PDF resumes are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Resume size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    setResumeFile(file);
    setResumeFileName(file.name);
    setMessage("");
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      setMessage("Please select a PDF resume first.");
      return;
    }

    const data = new FormData();
    data.append("file", resumeFile);

    try {
      setResumeUploading(true);
      setMessage("");

      const response = await api.post(
        "/api/candidate/resume/upload",
        data
      );

      setFormData((prev) => ({
        ...prev,
        resumeUrl: response.data,
      }));

      setResumeFile(null);
      setResumeFileName(resumeFile.name);
      localStorage.setItem("resumeFileName", resumeFile.name);

      setMessage("Resume uploaded successfully!");

      await fetchProfile();
    } catch (error) {
      console.error("Error uploading resume:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to upload resume."
      );
    } finally {
      setResumeUploading(false);
    }
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    // Validate required personal information before saving.
    if (!formData.name.trim()) {
      setMessage("Full Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setMessage("Email is required.");
      return;
    }

    if (!formData.phone.trim()) {
      setMessage("Phone is required.");
      return;
    }

    if (!formData.location.trim()) {
      setMessage("Location is required.");
      return;
    }

    try {
      await api.put(
        `/api/candidate/profile?name=${encodeURIComponent(
          formData.name
        )}`,
        {
          phone: formData.phone,
          location: formData.location,
          professionalHeadline:
            formData.professionalHeadline,
          aboutMe: formData.aboutMe,
          skills: formData.skills,
          resumeUrl: formData.resumeUrl,
        }
      );

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (user) {
        user.name = formData.name;

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );
      }

      setMessage(
        "Profile updated successfully!"
      );
    } catch (error) {
      console.error(
        "Error updating profile:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* =========================
            HEADER
        ========================= */}

        <section className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

            <p className="text-sm font-medium text-blue-400">
              Candidate Profile
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Edit Profile
            </h1>

            <p className="mt-2 text-slate-400">
              Update your personal and professional
              information.
            </p>

          </div>
        </section>

        {/* =========================
            MAIN FORM
        ========================= */}

        <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* =========================
                PERSONAL INFORMATION
            ========================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Basic information about you.
              </p>

              <p className="mt-3 text-xs text-slate-500">
                <span className="text-red-500">*</span> Required fields
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="mt-2 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Phone <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Location <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>
            </section>

            {/* =========================
                PROFESSIONAL INFORMATION
            ========================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Professional Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tell recruiters about your professional
                background.
              </p>

              <div className="mt-6 space-y-5">

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Professional Headline
                  </label>

                  <input
                    type="text"
                    name="professionalHeadline"
                    value={
                      formData.professionalHeadline
                    }
                    onChange={handleChange}
                    placeholder="Example: Java Full Stack Developer"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    About Me
                  </label>

                  <textarea
                    name="aboutMe"
                    value={formData.aboutMe}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write something about yourself..."
                    className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>
            </section>

            {/* =========================
                SKILLS
            ========================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Skills
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add the technical skills you have.
              </p>

              <div className="mt-5 flex gap-3">

                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) =>
                    setSkillInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Enter a skill"
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={addSkill}
                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Add
                </button>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">

                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(skill)
                      }
                      className="text-blue-400 transition hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}

              </div>
            </section>

            {/* =================================================
                EDUCATION
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Education
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add your educational qualifications.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (showEducationForm) {
                      resetEducationForm();
                    } else {
                      setShowEducationForm(true);
                    }
                  }}
                  className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  {showEducationForm
                    ? "Close"
                    : "+ Add Education"}
                </button>

              </div>

              {/* EDUCATION FORM */}

              {showEducationForm && (
                <div className="mt-6 rounded-xl border border-slate-200 p-5">

                  <h3 className="mb-5 font-semibold text-slate-900">
                    {editingEducationId !== null
                      ? "Edit Education"
                      : "Add Education"}
                  </h3>

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Degree
                      </label>

                      <input
                        type="text"
                        name="degree"
                        value={educationForm.degree}
                        onChange={
                          handleEducationChange
                        }
                        placeholder="Example: B.Tech"
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Field of Study
                      </label>

                      <input
                        type="text"
                        name="fieldOfStudy"
                        value={
                          educationForm.fieldOfStudy
                        }
                        onChange={
                          handleEducationChange
                        }
                        placeholder="Example: Computer Science Engineering"
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Institution
                      </label>

                      <input
                        type="text"
                        name="institution"
                        value={
                          educationForm.institution
                        }
                        onChange={
                          handleEducationChange
                        }
                        placeholder="Example: Kashi Institute of Technology"
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Graduation Year
                      </label>

                      <input
                        type="number"
                        name="graduationYear"
                        value={
                          educationForm.graduationYear
                        }
                        onChange={
                          handleEducationChange
                        }
                        placeholder="Example: 2026"
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                  </div>

                  <div className="mt-5 flex gap-3">

                    <button
                      type="button"
                      onClick={
                        handleEducationSave
                      }
                      className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      {editingEducationId !== null
                        ? "Update Education"
                        : "Save Education"}
                    </button>

                    <button
                      type="button"
                      onClick={
                        resetEducationForm
                      }
                      className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}

              {/* EXISTING EDUCATION */}

              <div className="mt-6 space-y-4">

                {education.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No education added yet.
                  </p>
                ) : (
                  education.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 p-5"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h3 className="font-semibold text-slate-900">
                            {item.degree}
                          </h3>

                          <p className="mt-1 text-sm text-slate-600">
                            {item.fieldOfStudy}
                          </p>

                          <p className="mt-1 text-sm text-slate-600">
                            {item.institution}
                          </p>

                          <p className="mt-1 text-sm text-slate-400">
                            Graduation Year:{" "}
                            {item.graduationYear}
                          </p>

                        </div>

                        <div className="flex shrink-0 gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              startEditingEducation(
                                item
                              )
                            }
                            className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteEducation(
                                item.id
                              )
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>
                  ))
                )}

              </div>

            </section>

            {/* =================================================
                EXPERIENCE
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              {/* EXPERIENCE HEADER */}

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Experience
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add your work experience.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (showExperienceForm) {
                      resetExperienceForm();
                    } else {
                      setShowExperienceForm(true);
                    }
                  }}
                  className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  {showExperienceForm
                    ? "Close"
                    : "+ Add Experience"}
                </button>

              </div>

              {/* =========================
                  EXPERIENCE FORM
              ========================= */}

              {showExperienceForm && (
                <div className="mt-6 rounded-xl border border-slate-200 p-5">

                  <h3 className="mb-5 font-semibold text-slate-900">
                    {editingExperienceId !== null
                      ? "Edit Experience"
                      : "Add Experience"}
                  </h3>

                  <div className="grid gap-5 md:grid-cols-2">

                    {/* Job Title */}

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Job Title
                      </label>

                      <input
                        type="text"
                        name="jobTitle"
                        value={
                          experienceForm.jobTitle
                        }
                        onChange={
                          handleExperienceChange
                        }
                        placeholder="Example: Java Developer"
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Company */}

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Company
                      </label>

                      <input
                        type="text"
                        name="company"
                        value={
                          experienceForm.company
                        }
                        onChange={
                          handleExperienceChange
                        }
                        placeholder="Example: QSpiders"
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Start Date */}

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Start Date
                      </label>

                      <input
                        type="date"
                        name="startDate"
                        value={
                          experienceForm.startDate
                        }
                        onChange={
                          handleExperienceChange
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* End Date */}

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        End Date
                      </label>

                      <input
                        type="date"
                        name="endDate"
                        value={
                          experienceForm.endDate
                        }
                        onChange={
                          handleExperienceChange
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <p className="mt-1 text-xs text-slate-400">
                        Leave empty if this is your
                        current job.
                      </p>
                    </div>

                  </div>

                  {/* Description */}

                  <div className="mt-5">

                    <label className="text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={
                        experienceForm.description
                      }
                      onChange={
                        handleExperienceChange
                      }
                      rows="4"
                      placeholder="Describe your responsibilities and achievements..."
                      className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* Experience Buttons */}

                  <div className="mt-5 flex gap-3">

                    <button
                      type="button"
                      onClick={
                        handleExperienceSave
                      }
                      className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      {editingExperienceId !== null
                        ? "Update Experience"
                        : "Save Experience"}
                    </button>

                    <button
                      type="button"
                      onClick={
                        resetExperienceForm
                      }
                      className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}

              {/* =========================
                  EXISTING EXPERIENCE
              ========================= */}

              <div className="mt-6 space-y-4">

                {experience.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No experience added yet.
                  </p>
                ) : (
                  experience.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 p-5"
                    >

                      <div className="flex items-start justify-between gap-4">

                        {/* Experience Information */}

                        <div className="min-w-0">

                          <h3 className="font-semibold text-slate-900">
                            {item.jobTitle}
                          </h3>

                          <p className="mt-1 text-sm font-medium text-slate-700">
                            {item.company}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {item.startDate}{" "}
                            —{" "}
                            {item.endDate
                              ? item.endDate
                              : "Present"}
                          </p>

                          {item.description && (
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              {item.description}
                            </p>
                          )}

                        </div>

                        {/* ACTION BUTTONS */}

                        <div className="flex shrink-0 gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              startEditingExperience(
                                item
                              )
                            }
                            className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteExperience(
                                item.id
                              )
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>
                  ))
                )}

              </div>

            </section>

            {/* =================================================
                RESUME
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Resume
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload your latest resume.
              </p>

              <div className="mt-5 rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-sm font-bold text-red-600">
                  PDF
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  Upload your resume
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  PDF files only, maximum size 5MB.
                </p>

                <label className="mt-5 inline-block cursor-pointer rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Choose File

                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleResumeChange}
                    className="hidden"
                  />
                </label>

                {resumeFileName && (
                  <div className="mx-auto mt-5 max-w-md rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Resume file
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-800" title={resumeFileName}>
                      {resumeFileName}
                    </p>
                  </div>
                )}

                {resumeFile && (
                  <button
                    type="button"
                    onClick={uploadResume}
                    disabled={resumeUploading}
                    className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {resumeUploading
                      ? "Uploading..."
                      : "Upload Resume"}
                  </button>
                )}

                {formData.resumeUrl && !resumeFile && (
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-sm font-medium text-green-600">
                      ✓ Resume uploaded
                    </p>

                    {resumeFileName && (
                      <p className="mt-1 text-sm text-slate-600">
                        {resumeFileName}
                      </p>
                    )}

                    <a
                      href={formData.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:underline"
                    >
                      View Current Resume
                    </a>
                  </div>
                )}

              </div>

            </section>

            {/* =========================
                MESSAGE
            ========================= */}

            {message && (
              <p
                className={`text-sm font-medium ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            {/* =========================
                MAIN BUTTONS
            ========================= */}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <Link
                to="/candidate/profile"
                className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Save Changes
              </button>

            </div>

          </form>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default EditProfile;