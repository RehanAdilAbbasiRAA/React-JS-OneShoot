import React, { useState, useEffect } from "react";
import { getUserProfile, setUserProfile } from "../api/dashboardApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  useQueryClient, 
  useMutation, 
  useQuery 
} from "@tanstack/react-query";

const Settings = () => {
  const navigate = useNavigate();
  
  // 1. GET USER FROM REDUX - Check if user is logged in
  const { user, user_data } = useSelector((state) => state.auth);
  
  // 2. TANSTACK QUERY CLIENT - This manages cache like a smart storage box
  const queryClient = useQueryClient();

  // 3. REDIRECT IF USER NOT LOGGED IN
  // If user is null/undefined, show error and send to homepage
  useEffect(() => {
    if (!user) {
      toast.error("❌ Please login to view profile");
      navigate("/");
    }
  }, [user, navigate]);

  // 4. FETCH USER PROFILE DATA USING TANSTACK QUERY
  // Think of this as a smart fetch() that caches data automatically
  // ADDED: refetchOnMount to always check for fresh data when component mounts
  const { 
    data: userProfile,      // Data from API (renamed to userProfile)
    isLoading: profileLoading, // Loading state
    isError: profileError,     // Error state
    refetch: refetchProfile   // Function to manually refetch data
  } = useQuery({
    queryKey: ["userDetails", user_data?.user_id], // Cache key (like a dictionary key)
    queryFn: () => getUserProfile(user_data.user_id), // Function to call API
    enabled: !!user_data?.user_id, // Only run if user_id exists
    // refetchOnMount: 'always' // Always check for fresh data when component opens
  });

  // 5. FORM STATE - What user sees and edits in the form
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "https://avatars.githubusercontent.com/u/138215723?v=4",
    password: "", // Password field is always empty for security
  });

  // 6. ORIGINAL DATA - Store what we initially loaded from API
  // We need this to compare if user made any changes
  const [originalProfile, setOriginalProfile] = useState(null);

  // 7. SYNC FORM WITH FETCHED DATA
  // When API returns data, update both form state and original data
  useEffect(() => {
    if (userProfile) {
      console.log("Loading user data into form...");
      
      // Create profile object for form
      const newProfile = {
        name: userProfile.name || "",
        email: userProfile.email || "",
        avatar: userProfile.avatar || "https://avatars.githubusercontent.com/u/138215723?v=4",
        password: "", // Always empty
      };
      
      // Update form state
      setProfile(newProfile);
      
      // Save original data (but without password field)
      setOriginalProfile({
        name: userProfile.name || "",
        email: userProfile.email || "",
        avatar: userProfile.avatar || "https://avatars.githubusercontent.com/u/138215723?v=4",
      });
    }
  }, [userProfile]);

  // 8. CHECK IF USER MADE ANY CHANGES
  // Compare current form values with original values
  const hasChanges = () => {
    // If no original data yet, return false
    if (!originalProfile) return false;
    
    // Check if name changed
    const nameChanged = profile.name !== originalProfile.name;
    
    // Check if email changed
    const emailChanged = profile.email !== originalProfile.email;
    
    // Check if avatar changed
    const avatarChanged = profile.avatar !== originalProfile.avatar;
    
    // Check if password field has any value (means user wants to change password)
    const passwordChanged = profile.password.trim() !== "";
    
    // Return true if ANY field changed
    return nameChanged || emailChanged || avatarChanged || passwordChanged;
  };

  // 9. UPDATE PROFILE MUTATION (FIXED VERSION)
  // Mutation = API call that changes data (like PUT/POST request)
  const updateProfileMutation = useMutation({
    // Function that calls the API
    mutationFn: (payload) => setUserProfile(user_data.user_id, payload),
    
    // What to do when API call succeeds - FIXED we get the setuser data response and store it here
    onSuccess: (updatedData) => {
      toast.success("✅ Profile updated successfully!");
      console.log("Profile updated successfully:", updatedData);
      
      // Update cache with new data
      queryClient.setQueryData(["userDetails", user_data?.user_id], updatedData);
      
      // FIX: Update the form with new data instead of just clearing password
      const updatedProfile = {
        name: updatedData.name || "",
        email: updatedData.email || "",
        avatar: updatedData.avatar || "https://avatars.githubusercontent.com/u/138215723?v=4",
        password: "", // Clear password field
      };
      
      // Update form state with new data from server
      setProfile(updatedProfile);
      
      // Update original data to new values
      setOriginalProfile({
        name: updatedData.name || "",
        email: updatedData.email || "",
        avatar: updatedData.avatar || "https://avatars.githubusercontent.com/u/138215723?v=4",
      });
      
      // OPTIONAL: Force refetch to ensure we have latest data
      // This helps when navigating away and coming back
      setTimeout(() => {
        refetchProfile();
      }, 100);
    },
    
    // What to do when API call fails
    onError: (error) => {
      console.error("Update failed:", error);
      toast.error("❌ Failed to update profile");
    }
  });

  // 10. FORM SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!profile.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    
    if (!profile.email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }
    
    if (profile.password && profile.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    // CHECK IF ANYTHING CHANGED - IMPORTANT!
    if (!hasChanges()) {
      toast.error("No changes to update");
      return; // Stop here if no changes
    }
    
    // Prepare data to send to API
    const payload = {
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
      ...(profile.password ? { password: profile.password } : {}),
    };
    
    // Call the mutation (triggers API call)
    updateProfileMutation.mutate(payload);
  };

  // 11. HANDLE INPUT CHANGES
  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 12. SHOW LOADING OR ERRORS
  if (!user) {
    return null; // User will be redirected by useEffect
  }
  
  if (profileLoading) {
    return <div className="p-6">Loading profile...</div>;
  }
  
  if (profileError) {
    return (
      <div className="p-6 text-red-500">
        Error loading profile
        <button 
          onClick={() => queryClient.refetchQueries({ queryKey: ["userDetails", user_data?.user_id] })}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // 13. RENDER THE FORM
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">
        Settings
        {updateProfileMutation.isLoading && (
          <span className="ml-4 text-sm text-blue-500">(Updating...)</span>
        )}
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Profile Picture - STYLING PRESERVED */}
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
              className="hidden"
            />
          </label>
        </div>

        {/* Right Side: User Info Form - STYLING PRESERVED */}
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
                disabled={updateProfileMutation.isLoading}
                className="w-full p-2 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] bg-[var(--color-primary)] text-[var(--color-text)] transition disabled:opacity-50"
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
                disabled={updateProfileMutation.isLoading}
                className="w-full p-2 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] bg-[var(--color-primary)] text-[var(--color-text)] transition disabled:opacity-50"
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
                placeholder="Enter new password (min 6 characters)"
                disabled={updateProfileMutation.isLoading}
                className="w-full p-2 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] bg-[var(--color-primary)] text-[var(--color-text)] transition disabled:opacity-50"
              />
            </div>

            {/* UPDATE BUTTON WITH CHANGE DETECTION */}
            <button
              type="submit"
              disabled={
                updateProfileMutation.isLoading || 
                profileLoading ||
                !hasChanges()  // ✅ KEY CHANGE: Disable if no changes
              }
              className="mt-4 px-4 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-active)] hover:text-[var(--color-primary)] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateProfileMutation.isLoading 
                ? "Updating..." 
                : hasChanges()
                  ? "Update Profile"  // Normal text when changes exist
                  : "No Changes to Update"  // Different text when no changes
              }
            </button>
            
            {/* Display mutation error */}
            {updateProfileMutation.isError && (
              <div className="text-red-500 text-sm">
                Error: {updateProfileMutation.error?.message}
              </div>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;