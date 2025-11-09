import React from "react";
import { Mail, Phone, Linkedin, Github, Twitter } from "lucide-react";

const About = () => {
  return (
    <div className="p-6 flex flex-col gap-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-[var(--color-text)] mb-6">
        About Me
      </h1>

      {/* Top Section: Intro */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Profile Image */}
        <div className="flex-1 flex justify-center md:justify-start">
          <div className="w-64 h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105">
            <img
              src="/user-avatar.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Bio & Profession */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            John Doe
          </h2>
          <p className="text-[var(--color-text)] text-lg">
            I am a Full-Stack Developer passionate about creating beautiful, responsive, and modern web applications. I specialize in React, Tailwind CSS, and Node.js.
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1 bg-[var(--color-primary)] text-[var(--color-text)] rounded-lg shadow hover:shadow-lg transition cursor-default">
              React
            </span>
            <span className="px-3 py-1 bg-[var(--color-primary)] text-[var(--color-text)] rounded-lg shadow hover:shadow-lg transition cursor-default">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-[var(--color-primary)] text-[var(--color-text)] rounded-lg shadow hover:shadow-lg transition cursor-default">
              Node.js
            </span>
            <span className="px-3 py-1 bg-[var(--color-primary)] text-[var(--color-text)] rounded-lg shadow hover:shadow-lg transition cursor-default">
              UI/UX Design
            </span>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4 bg-[var(--color-card)] p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
            Contact Me
          </h3>
          <div className="flex items-center gap-2 text-[var(--color-text)]">
            <Mail size={20} /> <span>john@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--color-text)]">
            <Phone size={20} /> <span>+92 300 1234567</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="hover:text-[var(--color-active)] transition"><Linkedin size={24} /></a>
            <a href="#" className="hover:text-[var(--color-active)] transition"><Github size={24} /></a>
            <a href="#" className="hover:text-[var(--color-active)] transition"><Twitter size={24} /></a>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.758604729634!2d73.06093827557378!3d33.68442268071067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df953cd5f444ff%3A0xd8c5792c2647c53b!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1699514800000!5m2!1sen!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* About Section / Details */}
      <div className="bg-[var(--color-card)] p-6 rounded-lg shadow-md hover:shadow-xl transition">
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">About</h3>
        <p className="text-[var(--color-text)] text-lg">
          I have over 5 years of experience in web development. I love building clean and interactive interfaces and strive to make web applications that are fast, accessible, and responsive. I am always learning new technologies and tools to enhance my skills.
        </p>
      </div>
    </div>
  );
};

export default About;
