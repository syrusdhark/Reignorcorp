import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageSquare, Calendar, Send, MapPin } from 'lucide-react';

const offices = [
  { city: 'San Francisco', country: 'USA', lat: 37.7749, lng: -122.4194, time: 'PST' },
  { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, time: 'GMT' },
  { city: 'Singapore', country: 'SG', lat: 1.3521, lng: 103.8198, time: 'SGT' },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, time: 'JST' },
];

export function ContactHub() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-32 px-6 bg-black overflow-hidden"
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(255,215,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.05)]">
            <span className="text-[#FFD700] uppercase tracking-wider">Get In Touch</span>
          </div>
          <h2
            className="mb-6 text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700 }}
          >
            Connection Hub
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Ready to transform your enterprise? Our team is standing by across the globe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Panel - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative p-10 rounded-2xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(10,10,10,0.6)]">
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="mb-6 inline-flex p-6 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500]">
                    <Send size={48} className="text-black" />
                  </div>
                  <h3 className="mb-4 text-white" style={{ fontSize: '28px', fontWeight: 700 }}>
                    Mission Control Contacted!
                  </h3>
                  <p className="text-gray-400" style={{ fontSize: '16px' }}>
                    We'll respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 text-gray-400" style={{ fontSize: '14px' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-lg bg-[rgba(0,0,0,0.5)] border border-[#333] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:outline-none focus:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all"
                      placeholder="John Doe"
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-400" style={{ fontSize: '14px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-lg bg-[rgba(0,0,0,0.5)] border border-[#333] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:outline-none focus:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all"
                      placeholder="john@company.com"
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-400" style={{ fontSize: '14px' }}>
                      Company
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-5 py-4 rounded-lg bg-[rgba(0,0,0,0.5)] border border-[#333] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:outline-none focus:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all"
                      placeholder="Your Company Inc."
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-400" style={{ fontSize: '14px' }}>
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 rounded-lg bg-[rgba(0,0,0,0.5)] border border-[#333] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:outline-none focus:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all resize-none"
                      placeholder="Tell us about your project..."
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="cursor-interact group w-full py-4 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                    style={{ fontWeight: 600, fontSize: '16px' }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Launch Inquiry
                      <Send
                        size={20}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Panel - Contact Options & Status */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quick Contact Methods */}
            <div className="p-8 rounded-2xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(10,10,10,0.6)]">
              <h3 className="mb-6 text-white" style={{ fontSize: '20px', fontWeight: 600 }}>
                Alternative Channels
              </h3>
              <div className="space-y-4">
                {[
                  { icon: <Mail size={20} />, label: 'Email', value: 'contact@reignor.com', action: 'mailto:contact@reignor.com' },
                  { icon: <Phone size={20} />, label: 'Phone', value: '+1 (555) 123-4567', action: 'tel:+15551234567' },
                  { icon: <MessageSquare size={20} />, label: 'Live Chat', value: 'Available 24/7', action: '#' },
                  { icon: <Calendar size={20} />, label: 'Book Meeting', value: 'Schedule a call', action: '#' },
                ].map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.action}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="cursor-interact group flex items-center gap-4 p-4 rounded-lg bg-[rgba(255,215,0,0.03)] hover:bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.1)] hover:border-[rgba(255,215,0,0.3)] transition-all"
                  >
                    <div className="p-3 rounded-lg bg-[rgba(255,215,0,0.1)] text-[#FFD700] group-hover:scale-110 transition-transform">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-sm">{method.label}</div>
                      <div className="text-white" style={{ fontSize: '16px', fontWeight: 500 }}>
                        {method.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Global Offices */}
            <div className="p-8 rounded-2xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(10,10,10,0.6)]">
              <h3 className="mb-6 text-white" style={{ fontSize: '20px', fontWeight: 600 }}>
                Global Presence
              </h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 rounded-lg bg-[rgba(255,215,0,0.03)] border border-[rgba(255,215,0,0.1)]"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-[#FFD700]" />
                      <div>
                        <div className="text-white" style={{ fontSize: '16px', fontWeight: 500 }}>
                          {office.city}
                        </div>
                        <div className="text-gray-400 text-sm">{office.country}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-gray-400 text-sm">Online</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="p-8 rounded-2xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-gradient-to-br from-[rgba(255,215,0,0.1)] to-[rgba(255,165,0,0.05)]">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-full bg-[rgba(255,215,0,0.2)]">
                  <div className="w-12 h-12 rounded-full border-4 border-[#FFD700] border-t-transparent animate-spin" />
                </div>
                <div>
                  <div className="text-white mb-1" style={{ fontSize: '18px', fontWeight: 600 }}>
                    Average Response Time
                  </div>
                  <div className="text-[#FFD700]" style={{ fontSize: '24px', fontWeight: 700 }}>
                    {'< 24 hours'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
