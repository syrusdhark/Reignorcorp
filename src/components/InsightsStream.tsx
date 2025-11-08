import { motion } from 'motion/react';
import { Clock, ArrowRight, Bookmark } from 'lucide-react';

const articles = [
  {
    category: 'AI & Automation',
    title: 'The Rise of Agentic AI in Enterprise Operations',
    excerpt: 'How autonomous AI agents are reshaping business processes and decision-making.',
    readTime: '8 min read',
    date: 'Nov 2, 2025',
    featured: true,
  },
  {
    category: 'Security',
    title: 'Post-Quantum Cryptography: Preparing for Tomorrow',
    excerpt: 'Understanding quantum threats and implementing quantum-resistant security today.',
    readTime: '6 min read',
    date: 'Oct 28, 2025',
    featured: false,
  },
  {
    category: 'Customer Experience',
    title: 'Neural CX: Predicting Customer Needs Before They Arise',
    excerpt: 'Leveraging emotional AI to deliver hyper-personalized experiences at scale.',
    readTime: '10 min read',
    date: 'Oct 25, 2025',
    featured: false,
  },
  {
    category: 'Cloud',
    title: 'Multi-Cloud Orchestration: Best Practices for 2025',
    excerpt: 'Optimizing costs and performance across AWS, Azure, and GCP.',
    readTime: '7 min read',
    date: 'Oct 20, 2025',
    featured: false,
  },
  {
    category: 'Analytics',
    title: 'Real-Time Data Intelligence: From Reactive to Predictive',
    excerpt: 'Building data systems that anticipate trends and automate insights.',
    readTime: '9 min read',
    date: 'Oct 15, 2025',
    featured: false,
  },
  {
    category: 'Enterprise',
    title: 'Digital Transformation ROI: Measuring What Matters',
    excerpt: 'Key metrics and frameworks for evaluating enterprise platform success.',
    readTime: '12 min read',
    date: 'Oct 10, 2025',
    featured: false,
  },
];

export function InsightsStream() {
  return (
    <section
      id="insights"
      className="relative min-h-screen py-32 px-6 bg-gradient-to-b from-[#0A0A0A] to-black overflow-hidden"
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
            <span className="text-[#FFD700] uppercase tracking-wider">Knowledge Hub</span>
          </div>
          <h2
            className="mb-6 text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700 }}
          >
            Insights Stream
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Expert perspectives on AI, security, and enterprise transformation.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-12 h-[500px] rounded-2xl overflow-hidden group cursor-interact"
        >
          {/* Background with gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black via-[rgba(10,10,10,0.8)] to-transparent z-10"
            style={{
              backdropFilter: 'blur(2px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 animate-pulse" />

          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-end p-12">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-[rgba(255,215,0,0.2)] border border-[rgba(255,215,0,0.3)] text-[#FFD700] text-sm uppercase tracking-wider">
                {articles[0].category}
              </span>
            </div>

            <h3
              className="mb-4 text-white max-w-3xl"
              style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.2 }}
            >
              {articles[0].title}
            </h3>

            <p
              className="mb-6 text-gray-300 max-w-2xl"
              style={{ fontSize: '18px', lineHeight: 1.6 }}
            >
              {articles[0].excerpt}
            </p>

            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{articles[0].readTime}</span>
              </div>
              <span>•</span>
              <span>{articles[0].date}</span>
            </div>

            <div className="mt-6">
              <button className="cursor-interact group/btn inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]">
                <span style={{ fontWeight: 600 }}>Read Article</span>
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover/btn:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* Border glow on hover */}
          <div className="absolute inset-0 border-2 border-[rgba(255,215,0,0)] group-hover:border-[rgba(255,215,0,0.3)] transition-all duration-500 rounded-2xl pointer-events-none" />
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-full cursor-interact"
            >
              <div className="relative h-full p-8 rounded-2xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(10,10,10,0.6)] transition-all duration-500 hover:border-[rgba(255,215,0,0.4)] hover:-translate-y-2">
                {/* Category badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.2)] text-[#FFD700] text-xs uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h4
                  className="mb-3 text-white group-hover:text-[#FFD700] transition-colors"
                  style={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.3 }}
                >
                  {article.title}
                </h4>

                {/* Excerpt */}
                <p className="mb-6 text-gray-400" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{article.readTime}</span>
                  </div>
                  <span>{article.date}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,215,0,0.1)]">
                  <button className="cursor-interact flex items-center gap-2 text-[#FFD700] hover:gap-3 transition-all">
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Read More</span>
                    <ArrowRight size={16} />
                  </button>
                  <button className="cursor-interact p-2 rounded-lg hover:bg-[rgba(255,215,0,0.1)] transition-colors">
                    <Bookmark size={16} className="text-gray-400 hover:text-[#FFD700]" />
                  </button>
                </div>

                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: '0 0 40px rgba(255,215,0,0.15)',
                  }}
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="cursor-interact group inline-flex items-center gap-3 px-8 py-4 rounded-lg border-2 border-[#D4AF37] text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black hover:scale-105">
            <span>View All Insights</span>
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
