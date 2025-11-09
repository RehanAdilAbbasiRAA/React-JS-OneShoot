import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", form);
    alert("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="p-6 flex flex-col gap-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--color-text)] text-center mb-6">
        Contact Me
      </h1>
      <p className="text-[var(--color-text)] text-center mb-6">
        Have questions or want to work together? Fill out the form below and I’ll get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-[var(--color-card)] p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
      >
        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="peer w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] transition"
            placeholder="Your Name"
          />
          <label
            className="absolute left-3 top-3 text-[var(--color-text)] text-sm pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--color-active)] transition-all"
          >
            Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="peer w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] transition"
            placeholder="Your Email"
          />
          <label
            className="absolute left-3 top-3 text-[var(--color-text)] text-sm pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--color-active)] transition-all"
          >
            Email
          </label>
        </div>

        {/* Subject */}
        <div className="relative">
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="peer w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] transition"
            placeholder="Subject"
          />
          <label
            className="absolute left-3 top-3 text-[var(--color-text)] text-sm pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--color-active)] transition-all"
          >
            Subject
          </label>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className="peer w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-active)] transition resize-none"
            placeholder="Your Message"
          />
          <label
            className="absolute left-3 top-3 text-[var(--color-text)] text-sm pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--color-active)] transition-all"
          >
            Message
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-3 rounded-lg bg-[var(--color-active)] text-[var(--color-primary)] font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-active)] border border-[var(--color-active)] transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
