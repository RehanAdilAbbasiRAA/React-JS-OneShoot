import React, { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
    avatar: "/user-avatar.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfile({ ...profile, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">Settings</h1>

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
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Right Side: User Info Form */}
        <div className="flex-1 bg-[var(--color-card)] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-[var(--color-text)] font-semibold">Name</label>
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
              <label className="block mb-1 text-[var(--color-text)] font-semibold">Email</label>
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
              <label className="block mb-1 text-[var(--color-text)] font-semibold">Password</label>
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
