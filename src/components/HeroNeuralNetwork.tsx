import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  category: string;
  label: string;
  connections: number[];
}

const categories = [
  { name: 'AI Core', color: '#FFD700', label: 'Agentic AI' },
  { name: 'Neural CX', color: '#D4AF37', label: 'Customer Experience' },
  { name: 'Security', color: '#FFA500', label: 'Quantum Security' },
  { name: 'Cloud', color: '#F4C430', label: 'Cloud Nexus' },
  { name: 'Analytics', color: '#FFD700', label: 'Analytics Cortex' },
];

export function HeroNeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeNodes();
    };

    const initializeNodes = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const nodeCount = window.innerWidth < 768 ? 30 : 60;

      nodesRef.current = Array.from({ length: nodeCount }, (_, i) => {
        const angle = (i / nodeCount) * Math.PI * 2;
        const distance = 150 + Math.random() * 200;
        return {
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: 4 + Math.random() * 4,
          category: categories[Math.floor(Math.random() * categories.length)].name,
          label: categories[Math.floor(Math.random() * categories.length)].label,
          connections: [],
        };
      });

      // Create center node
      nodesRef.current.push({
        x: centerX,
        y: centerY,
        vx: 0,
        vy: 0,
        radius: 20,
        category: 'Center',
        label: 'REIGNOR',
        connections: [],
      });
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Check hover
      let found = false;
      for (const node of nodesRef.current) {
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < node.radius + 10) {
          setHoveredNode(node);
          found = true;
          break;
        }
      }
      if (!found) setHoveredNode(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerNode = nodesRef.current[nodesRef.current.length - 1];

      nodesRef.current.forEach((node, i) => {
        if (node.category !== 'Center') {
          // Update position
          node.x += node.vx;
          node.y += node.vy;

          // Orbit around center
          const dx = centerNode.x - node.x;
          const dy = centerNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = 0.0001;
          node.vx += (dx / distance) * force * distance;
          node.vy += (dy / distance) * force * distance;

          // Mouse repulsion
          const mdx = mouseRef.current.x - node.x;
          const mdy = mouseRef.current.y - node.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150) {
            const repel = (150 - mdist) / 150;
            node.vx -= (mdx / mdist) * repel * 0.5;
            node.vy -= (mdy / mdist) * repel * 0.5;
          }

          // Damping
          node.vx *= 0.95;
          node.vy *= 0.95;

          // Boundary
          const maxDist = 350;
          if (distance > maxDist) {
            node.vx += (dx / distance) * 0.1;
            node.vy += (dy / distance) * 0.1;
          }
        }

        // Draw connections to center
        if (node.category !== 'Center') {
          const dx = centerNode.x - node.x;
          const dy = centerNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 400 || node === hoveredNode) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(centerNode.x, centerNode.y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${node === hoveredNode ? 0.6 : 0.15})`;
            ctx.lineWidth = node === hoveredNode ? 2 : 0.5;
            ctx.stroke();
          }
        }

        // Draw connections between nearby nodes
        nodesRef.current.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Draw node
        const isHovered = node === hoveredNode;
        const radius = isHovered ? node.radius * 1.5 : node.radius;

        if (node.category === 'Center') {
          // Draw center node with pulsing ring
          const pulseRadius = node.radius + Math.sin(Date.now() / 500) * 5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.category === 'Center' ? '#FFD700' : '#D4AF37';
        ctx.shadowBlur = isHovered ? 20 : 10;
        ctx.shadowColor = '#FFD700';
        ctx.fill();
        ctx.shadowBlur = 0;
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
  }, [hoveredNode]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 text-center px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,215,0,0.3)] bg-[rgba(255,215,0,0.05)] backdrop-blur-sm">
            <Sparkles size={16} className="text-[#FFD700]" />
            <span className="text-[#FFD700] uppercase tracking-wider">
              Next-Gen Enterprise Platform
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mb-6 text-white"
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Engineering Tomorrow's
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            }}
          >
            Enterprise
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mb-12 text-gray-400 max-w-2xl mx-auto"
          style={{ fontSize: '20px', lineHeight: 1.6 }}
        >
          Autonomous AI systems, quantum security, and neural customer experiences—unified in a single
          platform that thinks, adapts, and evolves with your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button className="cursor-interact group relative px-8 py-4 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
              style={{
                boxShadow: '0 0 30px rgba(255,215,0,0.3)',
              }}
            />
            <div className="relative flex items-center gap-2 text-black">
              <span>Start Your Journey</span>
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </button>

          <button className="cursor-interact group px-8 py-4 rounded-lg border-2 border-[#D4AF37] text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black hover:scale-105">
            Explore Solutions
          </button>
        </motion.div>

        {hoveredNode && hoveredNode.category !== 'Center' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-4 rounded-xl backdrop-blur-xl border border-[rgba(255,215,0,0.3)] bg-[rgba(10,10,10,0.9)]"
            style={{
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(255,215,0,0.2)',
            }}
          >
            <div className="text-[#FFD700] mb-1">{hoveredNode.category}</div>
            <div className="text-white">{hoveredNode.label}</div>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[#FFD700] flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-[#FFD700] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
