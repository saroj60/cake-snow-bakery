import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] dark:bg-[#12041C] pt-32 md:pt-40 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-headline-xl text-3xl md:text-5xl text-[#0D47A1] font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-[#6B1FA6] max-w-2xl mx-auto text-lg">
            Have a question, feedback, or need help with a custom order? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1D0A2D] p-8 rounded-2xl shadow-sm border border-[#0D47A1]/10 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#F5C242]/20 rounded-full text-[#0D47A1]">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#0D47A1] mb-2">Our Outlets</h3>
                <p className="text-[#6B1FA6]">
                  Tikathali / Balkot
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1D0A2D] p-8 rounded-2xl shadow-sm border border-[#0D47A1]/10 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#F5C242]/20 rounded-full text-[#0D47A1]">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#0D47A1] mb-2">Phone Number</h3>
                <p className="text-[#6B1FA6]">015904342 | 9860568012, 9763443555</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1D0A2D] p-8 rounded-2xl shadow-sm border border-[#0D47A1]/10 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#F5C242]/20 rounded-full text-[#0D47A1]">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#0D47A1] mb-2">Opening Hours</h3>
                <p className="text-[#6B1FA6]">Monday - Sunday</p>
                <p className="text-[#6B1FA6] font-bold">6:30 AM - 9:00 PM</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1D0A2D] p-8 rounded-2xl shadow-sm border border-[#0D47A1]/10 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#F5C242]/20 rounded-full text-[#0D47A1]">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#0D47A1] mb-2">Email Address</h3>
                <p className="text-[#6B1FA6]">cakesnowbakery@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-[#1D0A2D] p-8 rounded-3xl shadow-sm border border-[#0D47A1]/10">
            <h2 className="text-2xl font-bold text-[#0D47A1] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[#6B1FA6] mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#0D47A1]/20 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]/50 bg-[#FDFBF7] dark:bg-[#12041C]"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#6B1FA6] mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#0D47A1]/20 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]/50 bg-[#FDFBF7] dark:bg-[#12041C]"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-[#6B1FA6] mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#0D47A1]/20 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]/50 bg-[#FDFBF7] dark:bg-[#12041C]"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-[#6B1FA6] mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-[#0D47A1]/20 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]/50 bg-[#FDFBF7] dark:bg-[#12041C] resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-4 bg-[#0D47A1] text-white font-bold rounded-xl hover:bg-[#6B1FA6] transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
