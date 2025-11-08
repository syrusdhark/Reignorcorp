import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Zap, Shield, ArrowRight } from 'lucide-react';

const dashboards = [
  {
    name: 'AI Analytics',
    icon: <TrendingUp size={20} />,
    color: '#FFD700',
  },
  {
    name: 'Customer Hub',
    icon: <Users size={20} />,
    color: '#D4AF37',
  },
  {
    name: 'Automation',
    icon: <Zap size={20} />,
    color: '#FFA500',
  },
  {
    name: 'Security',
    icon: <Shield size={20} />,
    color: '#F4C430',
  },
];

const metrics = [
  { label: 'Active Users', value: 2547, change: '+12.5%' },
  { label: 'Tasks Automated', value: 8932, change: '+45.2%' },
  { label: 'Cost Savings', value: '$1.2M', change: '+23.1%' },
  { label: 'Uptime', value: '99.98%', change: '+0.05%' },
];

export function CapabilitiesTheater() {
  const [activeDashboard, setActiveDashboard] = useState(0);
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDashboard((prev) => (prev + 1) % dashboards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observers = metrics.map((metric, index) => {
      const targetValue =
        typeof metric.value === 'string'
          ? parseFloat(metric.value.replace(/[^0-9.]/g, ''))
          : metric.value;

      let current = 0;
      const increment = targetValue / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(timer);
        }
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = current;
          return newValues;
        });
      }, 16);

      return timer;
    });

    return () => observers.forEach(clearInterval);
  }, []);

  return (
    <section
      id="capabilities"
      className="relative min-h-screen py-32 px-6 bg-gradient-to-b from-black to-[#0A0A0A] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.05)]">
            <span className="text-[#FFD700] uppercase tracking-wider">Live Demo</span>
          </div>
          <h2 className="mb-6 text-white" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700 }}>
            Data Theater
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Experience the platform in action. Real-time simulations of our enterprise solutions.
          </p>
        </motion.div>

        {/* Dashboard Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden backdrop-blur-xl border-2 border-[rgba(255,215,0,0.2)] bg-[rgba(10,10,10,0.8)]"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.1)',
          }}
        >
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[rgba(255,215,0,0.2)] bg-[rgba(0,0,0,0.5)]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 mx-4 px-4 py-1.5 rounded-lg bg-[rgba(0,0,0,0.5)] border border-[rgba(255,215,0,0.1)]">
              <span className="text-gray-500 text-sm">reignor.app/dashboard</span>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="flex items-center gap-1 px-6 py-3 border-b border-[rgba(255,215,0,0.1)] bg-[rgba(0,0,0,0.3)]">
            {dashboards.map((dashboard, index) => (
              <button
                key={index}
                onClick={() => setActiveDashboard(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-interact ${
                  activeDashboard === index
                    ? 'bg-[rgba(255,215,0,0.2)] text-[#FFD700]'
                    : 'text-gray-400 hover:text-white hover:bg-[rgba(255,215,0,0.05)]'
                }`}
              >
                {dashboard.icon}
                <span>{dashboard.name}</span>
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.03)]"
                >
                  <div className="text-gray-400 mb-2" style={{ fontSize: '14px' }}>
                    {metric.label}
                  </div>
                  <div className="text-white mb-2" style={{ fontSize: '32px', fontWeight: 700 }}>
                    {typeof metric.value === 'string' && metric.value.includes('$')
                      ? `$${(animatedValues[index] / 1000).toFixed(1)}M`
                      : typeof metric.value === 'string' && metric.value.includes('%')
                      ? `${animatedValues[index].toFixed(2)}%`
                      : Math.floor(animatedValues[index]).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-green-400" style={{ fontSize: '14px' }}>
                    <span>↑</span>
                    <span>{metric.change}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Animated Chart Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.03)]">
                <div className="text-white mb-6" style={{ fontSize: '18px', fontWeight: 600 }}>
                  Performance Trends
                </div>
                <div className="h-48 flex items-end justify-between gap-2">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const height = 30 + Math.random() * 70;
                    return (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-[#FFD700] to-[#FFA500] cursor-interact hover:opacity-80 transition-opacity"
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4 text-gray-500 text-sm">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.03)]">
                <div className="text-white mb-6" style={{ fontSize: '18px', fontWeight: 600 }}>
                  AI Insights
                </div>
                <div className="space-y-4">
                  {[
                    'Detected 12 optimization opportunities',
                    'Predicted 23% efficiency gain next quarter',
                    'Automated 156 repetitive workflows',
                    'Identified cost reduction of $340K',
                  ].map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,215,0,0.05)] hover:bg-[rgba(255,215,0,0.1)] transition-colors cursor-interact"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#FFD700] mt-2 animate-pulse" />
                      <span className="text-gray-300" style={{ fontSize: '14px' }}>
                        {insight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Notifications */}
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { icon: '✓', text: 'All systems operational', color: 'green' },
                { icon: '⚡', text: 'AI processing 2.3K tasks/sec', color: 'yellow' },
                { icon: '🔒', text: 'Zero security incidents', color: 'blue' },
              ].map((status, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.05)]"
                >
                  <span>{status.icon}</span>
                  <span className="text-gray-300 text-sm">{status.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="cursor-interact group inline-flex items-center gap-3 px-8 py-4 rounded-lg border-2 border-[#D4AF37] text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black hover:scale-105">
            <span>Experience Full Demo</span>
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
