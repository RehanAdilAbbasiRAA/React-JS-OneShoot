import React from "react";
import Loader from "../components/Loader";
import {
  getUserInfo,
  getUserProjects,
  getUserTemplates,
  getUserStats,
  deleteUserProject,
} from "../api/dashboardApi"; //To update data (dispatch login/logout):
import { useSelector } from "react-redux"; // Impo
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // to use toast we import it
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const BACKEND_URL = "http://localhost:8000";
  const { user_data } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Fetch user info with caching
  const { data: userInfo, isLoading: infoLoading } = useQuery({    //👉 You are subscribing to cached data.
    queryKey: ["userInfo", user_data?.email], //👉 This is the cache identity.    // Different user → different cache  >>  Same user → reused cache
    queryFn: () => getUserInfo(user_data.email),  //👉 Called only when needed, not on every render.
    enabled: !!user_data?.email, // Only run if email exists 👉 Prevents API call until email exists
  });

  // ✅ Fetch projects with caching
  const { data: userProjects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["userProjects", user_data?.email],
    queryFn: () => getUserProjects(user_data.email),
    enabled: !!user_data?.email,
  });

  // ✅ Fetch templates with caching
  const { data: userTemplates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ["userTemplates", user_data?.email],
    queryFn: () => getUserTemplates(user_data.email),
    enabled: !!user_data?.email,
  });

  // ✅ Fetch stats with caching
  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ["userStats", user_data?.email],
    queryFn: () => getUserStats(user_data.email),
    enabled: !!user_data?.email,
  });

  // ✅ Delete mutation with automatic cache update
  const deleteMutation = useMutation({  //👉 Mutations are write operations.
    mutationFn: (project_id) => deleteUserProject(user_data.email, project_id),  //👉 Only job: hit backend
    onSuccess: (data, project_id) => {
      // ✅ Update cache without refetching API
      queryClient.setQueryData(["userProjects", user_data?.email], (old) =>
        old.filter((p) => p.project_id !== project_id)
      );
      // ✅ Also invalidate stats to refetch updated count
      queryClient.invalidateQueries(["userStats", user_data?.email]);
      toast.success("Project Deleted Successfully ✅");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Error deleting project ❌");
    },
  });

  const handleDelete = async (project_id) => {
    if (!window.confirm("Delete this project?")) return;
    deleteMutation.mutate(project_id);
  };

  const addProject = () => {
    try {
      if (userProjects.length < 5) {
        toast.success("Add New Project ✅");
        navigate("/project/new");
      } else {
        toast.error(
          `Cannot add more projects ❌ (Max 5 projects allowed, you have ${userProjects.length})`
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Combined loading check
  const loading =
    infoLoading || projectsLoading || templatesLoading || statsLoading;

  if (!user_data) {
    return <div>Please log in to view dashboard</div>;
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (loading) {
  return <Loader />;
}
  return (
    <div className="p-6 flex flex-col gap-10 max-w-7xl mx-auto">
      {/* === Top Section: User Info & Stats === */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-[var(--color-card)] rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
          <div className="flex flex-col items-center text-center gap-4">
            <img
              src={userInfo.avatar}
              alt="User"
              className="w-32 h-32 rounded-full object-cover border-2 border-[var(--color-border)]"
            />
            <h2 className="text-2xl font-bold text-[var(--color-text)]">
              {userInfo.name}
            </h2>
            <p className="text-[var(--color-text)]">{userInfo.title}</p>
            <p className="text-[var(--color-text)] text-sm">{userInfo.intro}</p>
            <div className="flex gap-4 mt-2">
              {Object.entries(userInfo.socialLinks).map(([key, link]) => (
                <a
                  key={key}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-text)] hover:text-[var(--color-active)] transition"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[var(--color-card)] rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-center gap-4">
          <h3 className="text-xl font-semibold text-[var(--color-text)]">
            Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-primary)] rounded-lg p-4 shadow hover:shadow-lg transition duration-200 text-center">
              <p className="text-sm text-[var(--color-text)]">Templates</p>
              <p className="font-bold text-lg text-[var(--color-text)]">
                {userStats.templateCount}
              </p>
            </div>
            <div className="bg-[var(--color-primary)] rounded-lg p-4 shadow hover:shadow-lg transition duration-200 text-center">
              <p className="text-sm text-[var(--color-text)]">Views</p>
              <p className="font-bold text-lg text-[var(--color-text)]">
                {userStats.totalViews}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* === Middle Section: Active Templates === */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">
          Your Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {userTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-[var(--color-card)] rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer overflow-hidden"
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  {template.name}
                </h3>
                <p className="text-sm text-[var(--color-text)]">
                  {template.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === Bottom Section: Projects === */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">
            Your Projects
          </h2>
          <button
            onClick={() => addProject()}
            className="px-4 py-2 bg-[var(--color-active)] rounded-lg text-[var(--color-primary)] hover:opacity-80"
          >
            + Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProjects.map((project, idx) => (
            <div
              key={project.project_id}
              className="bg-[var(--color-card)] rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4"
            >
              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() =>
                    navigate(`/project/edit/${project.project_id}`)
                  }
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.project_id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>

              <h3 className="text-xl font-semibold text-[var(--color-text)]">
                {project.name}
              </h3>
              <p className="text-[var(--color-text)] mt-2">{project.summary}</p>

              {/* Languages */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.languages.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-[var(--color-primary)] rounded-full text-[var(--color-text)] text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-[var(--color-active)] rounded-full text-[var(--color-primary)] text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Database */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.databases.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-[var(--color-active)] rounded-full text-[var(--color-primary)] text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-sm text-[var(--color-text)] mt-2">
                Duration: {project.duration.from} - {project.duration.to}
              </p>

              <div className="flex gap-2 mt-2 overflow-x-auto">
                {project.images.map((img, i) => (
                  <img
                    key={i}
                    src={`${BACKEND_URL}/${img}`}
                    alt={`Project ${idx} Image ${i}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Hard-coded user info
// const userInfo = {
//   name: "John Doe",
//   title: "Full-stack Developer",
//   avatar: "/user-avatar.png",
//   intro: "Passionate developer building modern, responsive, and interactive web applications. Experienced in React, Node.js, and full-stack development.",
//   socialLinks: {
//     github: "https://github.com/johndoe",
//     linkedin: "https://linkedin.com/in/johndoe",
//     twitter: "https://twitter.com/johndoe",
//     email: "johndoe@example.com",
//   },
// };

// Hard-coded projects
// const projects = [
//   {
//     title: "Project One",
//     description: "An amazing web app that showcases dynamic data and modern UI components.",
//     skills: ["React", "Tailwind", "Node.js"],
//     technologies: ["JavaScript", "MongoDB", "Express"],
//     startDate: "2023-01",
//     endDate: "2023-03",
//     images: ["/project1-1.png", "/project1-2.png"],
//   },
//   {
//     title: "Project Two",
//     description: "A portfolio management system for creatives to track their templates and projects.",
//     skills: ["React", "Next.js", "Redux"],
//     technologies: ["TypeScript", "Firebase", "CSS Modules"],
//     startDate: "2023-04",
//     endDate: "2023-06",
//     images: ["/project2-1.png", "/project2-2.png"],
//   },
//   {
//     title: "Project Three",
//     description: "A modern dashboard for tracking templates, analytics, and user interactions.",
//     skills: ["React", "Tailwind", "Chart.js"],
//     technologies: ["JavaScript", "Node.js", "Express"],
//     startDate: "2023-07",
//     endDate: "2023-09",
//     images: ["/project3-1.png", "/project3-2.png"],
//   },
// ];

// Hard-coded templates
// const templates = [
//   { id: 1, name: "Portfolio One", views: 120, img: "/template1.png" },
//   { id: 2, name: "Portfolio Two", views: 80, img: "/template2.png" },
//   { id: 3, name: "Portfolio Three", views: 200, img: "/template3.png" },
//   { id: 4, name: "Portfolio Four", views: 50, img: "/template4.png" },
// ];


// 6️⃣ Final mental model (remember this)
// useQuery → Read
// useMutation → Write
// queryKey → Cache identity
// setQueryData → Optimistic UI
// invalidateQueries → Controlled refetch
// staleTime → Refetch shield