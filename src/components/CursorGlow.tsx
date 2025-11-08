import { useEffect, useRef, useState } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  opacity: number;
  id: number;
}

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const trailParticles = useRef<TrailParticle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef<number>();
  const particleId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-interact');
      setIsHovering(isInteractive);

      // Add trail particle
      if (Math.random() > 0.7) {
        trailParticles.current.push({
          x: e.clientX,
          y: e.clientY,
          opacity: 0.8,
          id: particleId.current++,
        });

        // Limit particles
        if (trailParticles.current.length > 15) {
          trailParticles.current.shift();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create click ripple
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Smooth follow animation
    const animate = () => {
      // Smooth glow follows with delay
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.15;

      // Cursor dot follows immediately
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.4;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.4;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }

      // Animate trail particles on canvas
      const canvas = trailCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          trailParticles.current.forEach((particle, index) => {
            particle.opacity -= 0.02;

            if (particle.opacity > 0) {
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
              ctx.fill();
            }
          });

          // Remove dead particles
          trailParticles.current = trailParticles.current.filter((p) => p.opacity > 0);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Setup canvas
    const canvas = trailCanvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Cursor Dot - Visible pointer */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[10000] transition-all duration-150 ${
          isHovering ? 'scale-150' : ''
        }`}
        style={{
          left: '-8px',
          top: '-8px',
          width: '16px',
          height: '16px',
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: '#FFD700',
            boxShadow: '0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(255,215,0,0.4)',
          }}
        />
        {/* Inner dot */}
        <div
          className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: '#FFD700',
            boxShadow: '0 0 5px rgba(255,215,0,1)',
          }}
        />
      </div>

      {/* Glow Effect - Follows with delay */}
      <div
        ref={glowRef}
        className={`fixed w-[150px] h-[150px] pointer-events-none z-[9998] transition-all duration-300 ${
          isHovering ? 'w-[200px] h-[200px]' : ''
        }`}
        style={{
          left: '-75px',
          top: '-75px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0.2) 30%, transparent 70%)',
          mixBlendMode: 'screen',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />

      {/* Trail Canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />
      
      <style>
        {`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        .cursor-ripple {
          position: fixed;
          width: 0;
          height: 0;
          border: 2px solid rgba(255, 215, 0, 0.8);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          animation: ripple 600ms ease-out forwards;
          transform: translate(-50%, -50%);
        }
        @keyframes ripple {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
        `}
      </style>
    </>
  );
}
