import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Zap,
  LayoutDashboard,
  FileText,
  Shield,
  TrendingUp,
  BarChart3,
  Users,
  HeartPulse,
  X,
} from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

const services: Service[] = [
  {
    icon: <Brain size={32} />,
    title: 'Neural ML Core',
    description: 'AI-powered models that analyze large datasets with unprecedented speed and accuracy, transforming raw data into actionable intelligence.',
    features: ['Advanced machine learning algorithms', 'High-speed data analysis', 'Scalable model architecture'],
    gradient: 'from-[#FFD700] to-[#FFA500]',
  },
  {
    icon: <Zap size={32} />,
    title: 'Quantum Data Stream',
    description: 'Instantly process vast amounts of data in real-time, enabling faster and smarter decision-making for your business operations.',
    features: ['Real-time processing engine', 'Low-latency data pipelines', 'Streaming analytics'],
    gradient: 'from-[#D4AF37] to-[#FFD700]',
  },
  {
    icon: <LayoutDashboard size={32} />,
    title: 'Neural Dashboard Nexus',
    description: 'Intuitive interface designed for seamless data exploration and visualization, making complex insights accessible to everyone.',
    features: ['Interactive visualizations', 'Customizable layouts', 'Real-time updates'],
    gradient: 'from-[#FFA500] to-[#F4C430]',
  },
  {
    icon: <FileText size={32} />,
    title: 'AI Insight Forge',
    description: 'AI-generated reports and alerts that keep you informed with real-time updates and predictive insights for proactive decision-making.',
    features: ['Automated report generation', 'Smart alert system', 'Predictive notifications'],
    gradient: 'from-[#F4C430] to-[#FFD700]',
  },
  {
    icon: <Shield size={32} />,
    title: 'Quantum Security Nexus',
    description: 'Enterprise-grade security with scalable AI-powered infrastructure, ensuring your data remains protected at every level.',
    features: ['Advanced encryption', 'Scalable architecture', '24/7 threat monitoring'],
    gradient: 'from-[#FFD700] to-[#D4AF37]',
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Neural Marketing Engine',
    description: 'Understand your customers like never before, optimize campaigns, and personalize experiences with AI-driven marketing insights.',
    features: ['Customer behavior analysis', 'Campaign optimization', 'Personalization engine'],
    gradient: 'from-[#D4AF37] to-[#FFA500]',
  },
  {
    icon: <BarChart3 size={32} />,
    title: 'Business Intelligence Cortex',
    description: 'Transform raw data into valuable insights using AI-powered business intelligence, automating reporting and providing real-time trend analysis.',
    features: ['Data transformation engine', 'Automated reporting', 'Trend analysis'],
    gradient: 'from-[#FFA500] to-[#FFD700]',
  },
  {
    icon: <Users size={32} />,
    title: 'Customer Insight Forge',
    description: 'AI-driven customer insights that analyze behavior, track marketing performance, and use sentiment analysis to optimize engagement strategies.',
    features: ['Behavioral analytics', 'Sentiment analysis', 'Engagement optimization'],
    gradient: 'from-[#F4C430] to-[#D4AF37]',
  },
  {
    icon: <HeartPulse size={32} />,
    title: 'Healthcare Neural Core',
    description: 'Enhance healthcare efficiency with AI-powered data processing and monitoring, from diagnostics to real-time patient monitoring.',
    features: ['Medical data processing', 'Real-time patient monitoring', 'Diagnostic assistance'],
    gradient: 'from-[#FFD700] to-[#FFA500]',
  },
];

export function ServicesNexus() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        containerRef.current.classList.add('animate-in');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="services" className="relative min-h-screen py-32 px-6 bg-black overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) translateZ(-200px)',
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
            <span className="text-[#FFD700] uppercase tracking-wider">Our Services</span>
          </div>
          <h2 className="mb-6 text-white" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700 }}>
            Services Nexus
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Discover our comprehensive suite of AI-powered services designed to transform your business operations and drive intelligent decision-making.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedService(service)}
              className="cursor-interact group relative"
            >
              <div
                className="relative h-full p-8 rounded-2xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(10,10,10,0.8)] transition-all duration-500 overflow-hidden"
                style={{
                  transform:
                    hoveredIndex === index
                      ? 'translateY(-12px) scale(1.02) rotateX(5deg) rotateY(5deg)'
                      : 'translateY(0) scale(1) rotateX(0) rotateY(0)',
                  transformStyle: 'preserve-3d',
                  boxShadow:
                    hoveredIndex === index
                      ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.2)'
                      : '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                {/* Particle burst effect */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: Math.cos((i / 20) * Math.PI * 2) * 100,
                          y: Math.sin((i / 20) * Math.PI * 2) * 100,
                        }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-[#FFD700]"
                      />
                    ))}
                  </div>
                )}

                {/* Gold border glow */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    border: '2px solid rgba(255,215,0,0.5)',
                    boxShadow: 'inset 0 0 20px rgba(255,215,0,0.1)',
                  }}
                />

                {/* Icon */}
                <div
                  className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} transition-all duration-500 ${
                    hoveredIndex === index ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                  }`}
                  style={{
                    boxShadow:
                      hoveredIndex === index
                        ? '0 0 30px rgba(255,215,0,0.5)'
                        : '0 0 15px rgba(255,215,0,0.2)',
                  }}
                >
                  <div className="text-black">{service.icon}</div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-white" style={{ fontSize: '24px', fontWeight: 600 }}>
                  {service.title}
                </h3>

                <p
                  className={`text-gray-400 mb-6 transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-70'
                  }`}
                  style={{ fontSize: '16px', lineHeight: 1.6 }}
                >
                  {service.description}
                </p>

                {/* Features - slide in on hover */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    hoveredIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={
                          hoveredIndex === index
                            ? { x: 0, opacity: 1 }
                            : { x: -20, opacity: 0 }
                        }
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 text-[#FFD700]"
                        style={{ fontSize: '14px' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Hover indicator */}
                <div
                  className={`mt-6 flex items-center gap-2 text-[#FFD700] transition-all duration-300 ${
                    hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  <span>Explore</span>
                  <motion.div
                    animate={hoveredIndex === index ? { x: [0, 5, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    →
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-2xl w-full p-12 rounded-2xl backdrop-blur-xl border-2 border-[rgba(255,215,0,0.3)] bg-[rgba(10,10,10,0.95)]"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[rgba(255,215,0,0.1)] transition-colors cursor-interact"
              >
                <X size={24} className="text-[#FFD700]" />
              </button>

              <div
                className={`inline-flex p-6 rounded-xl bg-gradient-to-br ${selectedService.gradient} mb-6`}
                style={{
                  boxShadow: '0 0 30px rgba(255,215,0,0.3)',
                }}
              >
                <div className="text-black">{selectedService.icon}</div>
              </div>

              <h3 className="mb-4 text-white" style={{ fontSize: '32px', fontWeight: 700 }}>
                {selectedService.title}
              </h3>

              <p className="text-gray-300 mb-8" style={{ fontSize: '18px', lineHeight: 1.7 }}>
                {selectedService.description}
              </p>

              <div className="mb-8">
                <h4 className="text-[#FFD700] mb-4" style={{ fontSize: '20px', fontWeight: 600 }}>
                  Key Features
                </h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                      style={{ fontSize: '16px' }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <button className="cursor-interact w-full py-4 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]">
                Request Demo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

