import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Mail,
  ArrowUp,
  Globe,
  Send,
} from 'lucide-react';

const footerLinks = {
  Solutions: ['Agentic AI', 'Neural CX', 'Quantum Security', 'Cloud Nexus', 'Analytics Cortex'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Blog'],
  Resources: ['Documentation', 'API Reference', 'Case Studies', 'Webinars', 'Support'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'],
};

const socialLinks = [
  { icon: <Twitter size={20} />, label: 'Twitter', followers: '12.5K', url: '#' },
  { icon: <Linkedin size={20} />, label: 'LinkedIn', followers: '28K', url: '#' },
  { icon: <Github size={20} />, label: 'GitHub', followers: '8.2K', url: '#' },
  { icon: <Youtube size={20} />, label: 'YouTube', followers: '15K', url: '#' },
];

export function LaunchPadFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-black to-[#000000] pt-32 pb-12 px-6 overflow-hidden">
      {/* Starfield background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20% 30%, rgba(255,215,0,0.3), transparent),
            radial-gradient(2px 2px at 60% 70%, rgba(255,215,0,0.2), transparent),
            radial-gradient(1px 1px at 50% 50%, rgba(255,215,0,0.4), transparent),
            radial-gradient(1px 1px at 80% 10%, rgba(255,215,0,0.3), transparent),
            radial-gradient(2px 2px at 90% 60%, rgba(255,215,0,0.2), transparent)
          `,
          backgroundSize: '200% 200%',
          animation: 'drift 20s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.05)]">
            <span className="text-[#FFD700] uppercase tracking-wider">Join the Mission</span>
          </div>

          <h3
            className="mb-4 text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700 }}
          >
            Stay Ahead of Tomorrow
          </h3>

          <p className="mb-8 text-gray-400 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Get exclusive insights on AI, enterprise tech, and digital transformation.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
            >
              <Send size={20} className="text-black" />
              <span className="text-black" style={{ fontWeight: 600 }}>
                Coordinates received! Check your inbox.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="relative flex items-center">
                <Mail
                  size={20}
                  className="absolute left-5 text-gray-400 pointer-events-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-14 pr-32 py-4 rounded-full bg-[rgba(10,10,10,0.8)] border-2 border-[rgba(255,215,0,0.2)] text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:outline-none focus:shadow-[0_0_30px_rgba(255,215,0,0.2)] transition-all"
                  style={{ fontSize: '16px' }}
                />
                <button
                  type="submit"
                  className="cursor-interact absolute right-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:scale-105 transition-transform"
                  style={{ fontWeight: 600, fontSize: '14px' }}
                >
                  Launch
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div
                className="text-white mb-4"
                style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                REIGNOR
              </div>
              <p className="text-gray-400 mb-6" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                Engineering tomorrow's enterprise. Autonomous AI systems, quantum security, and
                neural customer experiences—unified in a single platform.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="cursor-interact group relative"
                >
                  <div className="w-12 h-12 rounded-full bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.2)] flex items-center justify-center text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-300 hover:rotate-[360deg] hover:scale-110">
                    {social.icon}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 rounded bg-[rgba(0,0,0,0.9)] border border-[rgba(255,215,0,0.3)]">
                      <div className="text-[#FFD700] text-xs">{social.followers}</div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links], columnIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: columnIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4
                className="mb-6 text-[#FFD700] uppercase tracking-wider"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="cursor-interact group inline-flex items-center gap-2 text-gray-400 hover:text-[#FFD700] transition-all"
                      style={{ fontSize: '14px' }}
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(255,215,0,0.1)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              © 2025 REIGNOR CORP. All rights reserved.
            </div>

            {/* Language & Theme */}
            <div className="flex items-center gap-6">
              <button className="cursor-interact flex items-center gap-2 text-gray-400 hover:text-[#FFD700] transition-colors">
                <Globe size={16} />
                <span className="text-sm">English</span>
              </button>

              <div className="h-4 w-px bg-[rgba(255,215,0,0.2)]" />

              {/* Back to top */}
              <button
                onClick={scrollToTop}
                className="cursor-interact group flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.2)] text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-300"
              >
                <span className="text-sm" style={{ fontWeight: 500 }}>
                  Back to Command Center
                </span>
                <ArrowUp
                  size={16}
                  className="transition-transform group-hover:-translate-y-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drift {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </footer>
  );
}
