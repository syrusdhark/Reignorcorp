import { useEffect } from 'react';
import { ParticleSystem } from './components/ParticleSystem';
import { CursorGlow } from './components/CursorGlow';
import { FloatingNav } from './components/FloatingNav';
import { HeroNeuralNetwork } from './components/HeroNeuralNetwork';
import { SolutionsUniverse } from './components/SolutionsUniverse';
import { ServicesNexus } from './components/ServicesNexus';
import { CapabilitiesTheater } from './components/CapabilitiesTheater';
import { ClientsConstellation } from './components/ClientsConstellation';
import { InsightsStream } from './components/InsightsStream';
import { ContactHub } from './components/ContactHub';
import { LaunchPadFooter } from './components/LaunchPadFooter';

export default function App() {
  useEffect(() => {
    // Add custom cursor class to body
    document.body.style.cursor = 'none';
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">
      {/* Particle Background System */}
      <ParticleSystem />

      {/* Custom Cursor Effects */}
      <CursorGlow />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section - Neural Network */}
        <HeroNeuralNetwork />

        {/* Solutions Section - Interactive Universe */}
        <SolutionsUniverse />

        {/* Services Section - Services Nexus */}
        <ServicesNexus />

        {/* Capabilities Section - Data Theater */}
        <CapabilitiesTheater />

        {/* Clients Section - Constellation Wall */}
        <ClientsConstellation />

        {/* Insights Section - Knowledge Stream */}
        <InsightsStream />

        {/* Contact Section - Connection Hub */}
        <ContactHub />
      </main>

      {/* Footer - Launch Pad */}
      <LaunchPadFooter />

      {/* Global Styles */}
      <style>{`
        * {
          cursor: inherit;
        }

        .cursor-interact {
          cursor: pointer;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Hide default cursor on interactive elements when custom cursor is active */
        button,
        a,
        .cursor-interact {
          cursor: none;
        }

        /* Selection styling */
        ::selection {
          background-color: rgba(255, 215, 0, 0.3);
          color: #ffffff;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #000000;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ffd700 0%, #ffa500 100%);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #ffd700;
        }

        /* Prevent text selection on UI elements */
        button,
        .no-select {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        /* Ensure smooth animations */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Font loading optimization */
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          /* Hide custom cursor on mobile */
          body {
            cursor: auto !important;
          }

          button,
          a,
          .cursor-interact {
            cursor: pointer !important;
          }

          /* Reduce particle count is handled in component */
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .border-\\[rgba\\(255\\,215\\,0\\,0\\.2\\)\\] {
            border-color: #ffd700 !important;
          }
        }

        /* Dark mode is default for this design */
        body {
          background: #000000;
          color: #ffffff;
        }

        /* GPU acceleration for animations */
        .particle-system,
        canvas,
        .cursor-glow {
          will-change: transform, opacity;
          transform: translateZ(0);
        }

        /* Prevent layout shift */
        img,
        video {
          max-width: 100%;
          height: auto;
        }

        /* Focus visible for accessibility */
        :focus-visible {
          outline: 2px solid #ffd700;
          outline-offset: 4px;
        }

        /* Disable focus outline on mouse click */
        :focus:not(:focus-visible) {
          outline: none;
        }
      `}</style>
    </div>
  );
}
