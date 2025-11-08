import { useState, useEffect } from 'react';
import { Home, Briefcase, Zap, Users, BookOpen, Mail } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} />, label: 'Home', href: '#home' },
  { icon: <Briefcase size={20} />, label: 'Solutions', href: '#solutions' },
  { icon: <Zap size={20} />, label: 'Capabilities', href: '#capabilities' },
  { icon: <Users size={20} />, label: 'Clients', href: '#clients' },
  { icon: <BookOpen size={20} />, label: 'Insights', href: '#insights' },
  { icon: <Mail size={20} />, label: 'Contact', href: '#contact' },
];

export function FloatingNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${
        isScrolled ? 'bottom-6' : ''
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-xl border border-[rgba(255,215,0,0.3)] bg-[rgba(10,10,10,0.8)] transition-all duration-300 ${
          isExpanded ? 'px-6' : ''
        }`}
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(255,215,0,0.1)',
        }}
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <button
              key={index}
              onClick={() => handleClick(item.href)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 cursor-interact group ${
                isActive ? 'text-[#FFD700]' : 'text-white hover:text-[#FFD700]'
              }`}
              style={{
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <div
                className={`transition-all duration-300 ${
                  isActive ? 'drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]' : ''
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full bg-[rgba(255,215,0,0.1)] animate-pulse"
                  style={{
                    boxShadow: '0 0 20px rgba(255,215,0,0.3)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
