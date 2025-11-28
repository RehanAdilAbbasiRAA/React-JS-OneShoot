import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getSingleProject,
  createProject,
  updateProject,
} from "../api/dashboardApi";
import { useSelector } from "react-redux"; // Impo

const ProjectForm = () => {
    const { isAuthenticated, user, user_data } = useSelector(
      (state) => state.auth
    );

      console.log(user_data, isAuthenticated);
      console.log("Dashboard Mounted");
      useEffect(() => {
        if (!user_data) {
          console.log("User not logged in");
          // return;
        }});
  
  const bubbles = [
    {
      size: "w-72 h-72",
      color: "var(--bubble-color-1)",
      top: "-top-20",
      left: "-left-20",
      anim: "animate-pulse-slow",
    },
    {
      size: "w-96 h-96",
      color: "var(--bubble-color-2)",
      bottom: "-bottom-32",
      right: "-right-32",
      anim: "animate-pulse-slow-slow",
    },
    {
      size: "w-96 h-96",
      color: "var(--bubble-color-1)",
      bottom: "-bottom-80",
      right: "-right--40",
      anim: "animate-pulse-slow-slow",
    },
  ];
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [step, setStep] = useState(1); // 3-step form
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      summary: "",
      startDate: "",
      endDate:"",
      technologies: [],
      languages: [],
      databases: [],
      images: [],
      github: "",
      liveURL: "",
      linkedIn: "",
      type: "",
    },
  });

  const watchImages = watch("images");

  const validateStep = async () => {
    if (step === 1) {
      return await trigger([
        "name",
        "summary",
        "startDate",
        "endDate",
      ]);
    }
    if (step === 2) {
      return await trigger([
        "technologies",
        "languages",
        "databases",
        "images",
      ]);
    }
    if (step === 3) {
      return await trigger(["github", "liveURL", "linkedIn", "type"]);
    }
  };

  useEffect(() => {
    if (isEdit) loadProject();
  }, []);

  useEffect(() => {
    if (watchImages && watchImages.length > 0) {
      const previews = watchImages.map((file) =>
        file instanceof File ? URL.createObjectURL(file) : file
      );
      setImagePreviews(previews);
    }
  }, [watchImages]);

  async function loadProject() {
    setLoading(true);
    const data = await getSingleProject(id);
    Object.keys(data).forEach((key) => setValue(key, data[key]));
    setLoading(false);
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setValue("images", files);
  };

  // const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const nextStep = async () => {
    const isValid = await validateStep();
    if (!isValid) return; // React Hook Form will show errors automatically
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (isEdit) await updateProject(id, data);
      else await createProject(data,user_data.email);
      // navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const steps = ["Basic Info", "Tech & Files", "Links & Type"];

  return (
    // <div className="electric-border relative rounded-lg overflow-hidden ">
    <div className="max-w-3xl mx-auto p-6 bg-[var(--color-card)] rounded-lg shadow-lg mt-10 relative overflow-hidden electric-border">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className={`absolute ${b.size} rounded-full ${b.anim} opacity-10 ${
              b.top || ""
            } ${b.bottom || ""} ${b.left || ""} ${b.right || ""}`}
            style={{ backgroundColor: b.color }}
          ></div>
        ))}
      </div>
      {/* FUTURISTIC BACKGROUND ANIMATION */}

      <h2 className="relative text-2xl font-bold text-[var(--color-text)] mb-6 z-10">
        {isEdit ? "Edit Project" : "Add New Project"}
      </h2>

      {/* STEP INDICATOR */}
      <div className="flex items-center mb-8 relative z-10">
        {steps.map((label, index) => {
          const isActive = step === index + 1;
          const isCompleted = step > index + 1;
          return (
            <div key={index} className="flex items-center flex-1 relative">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-700
                    ${
                      isCompleted
                        ? "bg-[var(--color-active)] border-[var(--color-active)]"
                        : ""
                    }
                    ${
                      isActive && !isCompleted
                        ? "bg-[var(--color-primary)] border-[var(--color-active)] animate-pulse-fast"
                        : "bg-[var(--color-card)] border-[var(--color-primary)]"
                    }
                  `}
                >
                  {isCompleted ? "✔" : index + 1}
                </div>
                <span className="text-[var(--color-text)] mt-2 text-sm">
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 relative mx-2">
                  <div
                    className={`absolute top-0 left-0 h-1 bg-white w-full rounded`}
                  ></div>
                  <div
                    className={`absolute top-0 left-0 h-1 rounded bg-[var(--color-active)] transition-all duration-1000 ease-in-out`}
                    style={{
                      width:
                        step > index + 1
                          ? "100%"
                          : step === index + 1
                          ? "50%"
                          : "0%",
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">
          <ul className="list-disc pl-5">
            {Object.values(errors).map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 relative z-10"
      >
        {/* STEP 1: Basic Info + Dates */}
        {step === 1 && (
          <>
            <input
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
              placeholder="Project Name"
              {...register("name", {
                required: "Project name is required",
                pattern: {
                  value: /^[A-Za-z0-9 ]+$/, // ← no special characters allowed
                  message: "Title should not contain special symbols",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}

            <textarea
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
              placeholder="Project Summary"
              {...register("summary", { required: "Summary is required" })}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-[var(--color-text)] mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="p-2 rounded bg-[var(--color-primary)]"
                  {...register("startDate", {
                    required: "Start date is required"
                  })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-[var(--color-text)] mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="p-2 rounded bg-[var(--color-primary)]"
                  {...register("endDate", {
                    required: "End date is required",
                  })}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-[var(--color-active)] text-[var(--color-primary)] rounded-md hover:opacity-90 self-end mt-4"
            >
              Next
            </button>
          </>
        )}

        {/* STEP 2: Tech + Files */}
        {/* STEP 2: Tech + Files */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Technologies (comma separated)"
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
              {...register("technologies",{
                    required: "Technologie is required",
                setValueAs: (v) =>
                  typeof v === "string" ? v.split(",").map((t) => t.trim()) : v,
              })}
            />

            <input
              type="text"
              placeholder="Languages (comma separated)"
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
              {...register("languages",{
                    required: "Language is required",
                setValueAs: (v) =>
                  typeof v === "string" ? v.split(",").map((l) => l.trim()) : v,
              })}
            />

            <input
              type="text"
              placeholder="Databases (comma separated)"
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
              {...register("databases",{
                    required: "Database is required",
                setValueAs: (v) =>
                  typeof v === "string" ? v.split(",").map((d) => d.trim()) : v,
              })}
            />

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
            />

            {/* Image Previews with Remove */}
            <div className="flex gap-2 flex-wrap mt-2">
              {imagePreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center border p-1 rounded hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="text-xs text-[var(--color-text)]">
                    {watchImages[i]?.name || `Image ${i + 1}`}
                  </span>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => {
                      const newFiles = [...watchImages];
                      newFiles.splice(i, 1); // remove from array
                      setValue("images", newFiles); // update form state

                      const newPreviews = [...imagePreviews];
                      newPreviews.splice(i, 1);
                      setImagePreviews(newPreviews);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text)] rounded-md hover:opacity-90"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-[var(--color-active)] text-[var(--color-primary)] rounded-md hover:opacity-90"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3: Links + Type */}
        {step === 3 && (
          <>
            <input
              type="url"
              placeholder="GitHub URL"
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
              {...register("github")}
            />
            <input
              type="url"
              placeholder="Live URL"
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
              {...register("liveURL")}
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
              {...register("linkedIn")}
            />

            <select
              className="p-2 rounded-md bg-[var(--color-primary)] text-[var(--color-text)]"
              {...register("type",{
                    required: "Project Type is required"})}
            >
              <option value="">Select Project Type</option>
              <option value="personal">Personal</option>
              <option value="client">Client</option>
              <option value="work">Work</option>
            </select>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text)] rounded-md hover:opacity-90"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--color-active)] text-[var(--color-primary)] rounded-md hover:opacity-90"
              >
                {isEdit ? "Update Project" : "Create Project"}
              </button>
            </div>
          </>
        )}
      </form>

      {/* Extra CSS Animations */}
      <style>{`
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.5 } 50% { transform: scale(1.2); opacity: 0.8; } }
        @keyframes pulse-slow-slow { 0%, 100% { transform: scale(1); opacity: 0.3 } 50% { transform: scale(1.3); opacity: 0.6; } }
        @keyframes pulse-fast { 0%, 100% { transform: scale(1); opacity: 0.7 } 50% { transform: scale(1.2); opacity: 1; } }
        .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
        .animate-pulse-slow-slow { animation: pulse-slow-slow 12s infinite ease-in-out; }
        .animate-pulse-fast { animation: pulse-fast 1.2s infinite ease-in-out; }

        /* Moving current along border */
.electric-border::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--color-active);
  border-radius: 50%;
  box-shadow: 0 0 6px var(--color-active), 0 0 12px var(--color-active);
  pointer-events: none;
  animation: move-current 4s linear infinite;
  z-index: 20;
}

/* Sparks trailing the current */
.electric-border::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: var(--color-active);
  border-radius: 50%;
  opacity: 0.6;
  filter: blur(2px);
  pointer-events: none;
  animation: sparks 0.5s linear infinite;
  z-index: 20;
}

/* Current moving along the border */
@keyframes move-current {
  0%   { top: 0; left: 0; }
  25%  { top: 0; left: 100%; transform: translateX(-100%); }
  50%  { top: 100%; left: 100%; transform: translate(-100%, -100%); }
  75%  { top: 100%; left: 0; transform: translateY(-100%); }
  100% { top: 0; left: 0; }
}

/* Tiny random sparks */
@keyframes sparks {
  0%   { transform: translate(0,0) scale(1); opacity:1; }
  25%  { transform: translate(2px,-2px) scale(0.5); opacity:0.7; }
  50%  { transform: translate(-2px,2px) scale(0.3); opacity:0.5; }
  75%  { transform: translate(1px,-1px) scale(0.5); opacity:0.7; }
  100% { transform: translate(0,0) scale(1); opacity:1; }
}
      `}</style>
    </div>
    // </div>
  );
};

export default ProjectForm;
