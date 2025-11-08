import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  brightness: number;
  category: string;
}

const stats = [
  { value: 500, suffix: '+', label: 'Enterprise Clients', duration: 2000 },
  { value: 50, suffix: '+', label: 'Countries', duration: 1500 },
  { value: 98, suffix: '%', label: 'Client Retention', duration: 2500 },
  { value: 24, suffix: '/7', label: 'Support Uptime', duration: 1000 },
];

export function ClientsConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const [hoveredStar, setHoveredStar] = useState<Star | null>(null);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = 300;
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        brightness: Math.random(),
        category: ['Tech', 'Finance', 'Healthcare', 'Retail', 'Enterprise'][
          Math.floor(Math.random() * 5)
        ],
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = false;
      for (const star of starsRef.current) {
        const distance = Math.sqrt(
          Math.pow(mouseX - star.x, 2) + Math.pow(mouseY - star.y, 2)
        );
        if (distance < 20 && star.size > 1.5) {
          setHoveredStar(star);
          found = true;
          break;
        }
      }
      if (!found) setHoveredStar(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Twinkling effect
        star.brightness += (Math.random() - 0.5) * 0.1;
        star.brightness = Math.max(0.3, Math.min(1, star.brightness));

        const finalOpacity = star.opacity * star.brightness;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${finalOpacity})`;
        ctx.shadowBlur = star === hoveredStar ? 20 : star.size * 3;
        ctx.shadowColor = '#FFD700';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections for major stars
        if (star.size > 1.5) {
          starsRef.current.forEach((otherStar) => {
            if (otherStar === star || otherStar.size <= 1.5) return;
            const distance = Math.sqrt(
              Math.pow(star.x - otherStar.x, 2) + Math.pow(star.y - otherStar.y, 2)
            );
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(star.x, star.y);
              ctx.lineTo(otherStar.x, otherStar.y);
              ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredStar]);

  useEffect(() => {
    // Animate stats
    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.value / (stat.duration / 16);
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setAnimatedStats((prev) => {
          const newStats = [...prev];
          newStats[index] = current;
          return newStats;
        });
      }, 16);
    });
  }, []);

  return (
    <section
      id="clients"
      className="relative min-h-screen py-32 px-6 bg-black overflow-hidden"
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
            <span className="text-[#FFD700] uppercase tracking-wider">Trusted Globally</span>
          </div>
          <h2
            className="mb-6 text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700 }}
          >
            Client Universe
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Join 500+ leading enterprises across 50 countries transforming their operations.
          </p>
        </motion.div>

        {/* Constellation Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[400px] mb-20 rounded-2xl border border-[rgba(255,215,0,0.2)] bg-[rgba(10,10,10,0.5)] overflow-hidden"
        >
          <canvas ref={canvasRef} className="w-full h-full" />
          {hoveredStar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 left-4 px-6 py-3 rounded-xl backdrop-blur-xl border border-[rgba(255,215,0,0.3)] bg-[rgba(10,10,10,0.9)]"
              style={{
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(255,215,0,0.2)',
              }}
            >
              <div className="text-[#FFD700]" style={{ fontSize: '14px' }}>
                {hoveredStar.category}
              </div>
              <div className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
                Leading {hoveredStar.category} Enterprise
              </div>
            </motion.div>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
            Hover over bright stars to reveal client details
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 text-center"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Background pulse effect */}
              <div
                className="absolute inset-0 rounded-2xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.03)]"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              />

              {/* Animated ring */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="absolute inset-0 rounded-2xl border-2 border-[#FFD700] animate-pulse"
                style={{
                  opacity: 0.2,
                }}
              />

              <div className="relative">
                {/* Value */}
                <motion.div
                  className="mb-2"
                  style={{
                    fontSize: 'clamp(48px, 6vw, 64px)',
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {Math.floor(animatedStats[index])}
                  {stat.suffix}
                </motion.div>

                {/* Label */}
                <div className="text-gray-400" style={{ fontSize: '16px' }}>
                  {stat.label}
                </div>

                {/* Pulse indicator */}
                <div className="mt-4 flex justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="relative p-12 rounded-2xl backdrop-blur-xl border border-[rgba(255,215,0,0.2)] bg-[rgba(10,10,10,0.6)]">
            {/* Quote mark */}
            <div
              className="absolute top-6 left-6 text-[#FFD700] opacity-20"
              style={{ fontSize: '64px', lineHeight: 1 }}
            >
              "
            </div>

            <div className="relative">
              <p
                className="mb-8 text-gray-300 italic"
                style={{ fontSize: '20px', lineHeight: 1.6 }}
              >
                REIGNOR transformed our entire enterprise architecture. The AI-driven automation
                reduced our operational costs by 40% while improving customer satisfaction scores
                by 65%. It's not just a platform—it's a paradigm shift.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500]" />
                <div>
                  <div className="text-white" style={{ fontSize: '18px', fontWeight: 600 }}>
                    Sarah Chen
                  </div>
                  <div className="text-gray-400" style={{ fontSize: '14px' }}>
                    CTO, Global Tech Solutions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
