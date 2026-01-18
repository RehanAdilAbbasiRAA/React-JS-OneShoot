import React, { useEffect, useState } from "react";

const InfoUpdate = ({ data, onSubmit, loading = false }) => {
    console.log(data.socials);
  const [form, setForm] = useState({
    title: "",
    bio: "",
    socialsLinks: [],
  });

  const [original, setOriginal] = useState(null);

  // Load data into form
  useEffect(() => {
    if (!data) return;

    const normalizedForm = {
      title: data.title || "",
      bio: data.bio || "",
      socialsLinks: data.socialsLinks || data.socials || [], // Handle both names
    };

    setForm(normalizedForm);
    setOriginal(JSON.stringify(normalizedForm));
  }, [data]);

  const hasChanges = () => {
    return JSON.stringify(form) !== original;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasChanges()) {
      console.log("No changes to update");
      return;
    }
    
    // Prepare payload in the format backend expects
    const payload = {
      title: form.title,
      bio: form.bio,
      socialsLinks: form.socialsLinks.filter(item => item.url.trim() !== "") // Filter out empty URLs
    };
    
    console.log("Submitting public info:", payload);
    onSubmit(payload);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <div className="p-6 bg-[var(--color-card)] rounded-lg shadow-md flex flex-col gap-6 m-6">
      <h2 className="text-xl font-semibold text-[var(--color-text)]">
        Update Public Info
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
            placeholder="e.g. Full Stack Developer"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none resize-none"
            placeholder="Short description about you"
          />
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-medium text-[var(--color-text)] mb-3">
            Social Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.socialsLinks.map((item, index) => (
              <div key={index} className="space-y-2">
                <label > {item.platform}</label>
                <input
                  type="text"
                  value={item.url || ""}
                  onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                  placeholder="Full URL"
                  className="w-full p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-active)] outline-none"
                />
              </div>
            ))}
          </div>

        </div>

        
        <button
          type="submit"
          disabled={loading || !hasChanges()}
          className="self-start mt-4 px-5 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-active)] hover:text-[var(--color-primary)] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Updating..."
            : hasChanges()
              ? "Update Info"
              : "No Changes"}
        </button>
      </form>
    </div>
  );
};

export default InfoUpdate;