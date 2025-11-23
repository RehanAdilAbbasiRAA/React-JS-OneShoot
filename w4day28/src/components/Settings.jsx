import React, {  useEffect, useState } from "react";
import { getUserProfile,setUserProfile } from "../api/dashboardApi"; //To update data (dispatch login/logout):
import { useSelector } from "react-redux"; // Import useSelector to Read data From Redux Store
import { useDispatch } from "react-redux"; //To update data (dispatch login/logout):
import { login, logout } from "../features/authSlice"; //To update data (dispatch login/logout):
import { useNavigate } from "react-router-dom";

const Settings = () => {

  const navigate = useNavigate();
  const { isAuthenticated, user,user_data } = useSelector((state) => state.auth);
  console.log(user, isAuthenticated);
  const [profile, setProfile] = useState(null);
  

  console.log("PROFILE LOADED AGAIN",user_data);

  useEffect(() => {
    console.log("PROFILE USE EFFECT",user_data);
    if (!user) {
      navigate("/");
      return;
    }
      if (!user_data.user_id) {
        console.log("User not logged in");
        return
      };

  const loadProfile = async () => {
    try {
      const data = await getUserProfile(user_data.user_id);
      console.log("Profile loaded:", data);
      setProfile({
        name: data.name ?? "",
        email: data.email ?? "",
        avatar: data.avatar ?? "https://avatars.githubusercontent.com/u/138215723?v=4",
        password: "", // NEVER store or show password
      });
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  loadProfile();
},[]
//  [user]
);



const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation (like before)
  if (!profile.name.trim()) return alert("Name cannot be empty");
  if (!profile.email.trim()) return alert("Email cannot be empty");
  if (profile.password && profile.password.length < 6) return alert("Password must be >= 6 chars");

  const payload = {
    name: profile.name,
    email: profile.email,
    avatar: profile.avatar,
    ...(profile.password ? { password: profile.password } : {}),
  };

  const res = await setUserProfile(user.user_id, payload);
  console.log("Updated user:", res);
};





  const handleChange = (e) => {
    setProfile(prev => ({
  ...prev,
  [e.target.name]: e.target.value
        }));
    // console.log(e.target.name);

  };

  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">
        Settings
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Profile Picture */}
        <div className="flex flex-col items-center gap-4 flex-1 bg-[var(--color-card)] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-[var(--color-border)]"
          />
          <label className="px-4 py-2 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg cursor-pointer hover:bg-[var(--color-active)] hover:text-[var(--color-primary)] transition">
            Change Picture
            <input
              type="file"
              accept="image/*"
              // onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Right Side: User Info Form */}
        <div className="flex-1 bg-[var(--color-card)] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-[var(--color-text)] font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] bg-[var(--color-primary)] text-[var(--color-text)] transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-[var(--color-text)] font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] bg-[var(--color-primary)] text-[var(--color-text)] transition"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-[var(--color-text)] font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full p-2 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] bg-[var(--color-primary)] text-[var(--color-text)] transition"
              />
            </div>

            <button
              type="submit"
              className="mt-4 px-4 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-active)] hover:text-[var(--color-primary)] transition"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
