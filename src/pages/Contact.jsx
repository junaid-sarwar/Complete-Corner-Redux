import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-transparent">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#E0C340] mb-6">Contact Us</h2>
        <p className="text-center mb-6 text-white">We'd love to hear from you!</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium" htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#E0C340] focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium" htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#E0C340] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium" htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#E0C340] focus:outline-none"
              placeholder="Enter your message"
              rows="5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#E0C340] text-black font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-[#E0C340]"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
