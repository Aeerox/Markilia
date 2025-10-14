'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Empire Glow Aurora Component
 * Creates a majestic aurora-like light veil with subtle movement
 */
function EmpireGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    const handleMouseMove = (e) => {
      if (!isReducedMotion) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20, // -10 to 10
          y: (e.clientY / window.innerHeight - 0.5) * 20, // -10 to 10
        });
      }
    };

    const handleScroll = () => {
      if (!isReducedMotion) {
        setScrollY(window.scrollY);
      }
    };

    if (!isReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      if (!isReducedMotion) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isReducedMotion]);

  // Fallback for reduced motion
  if (isReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 30%, 
                rgba(236, 72, 153, 0.25) 0%, 
                rgba(139, 92, 246, 0.2) 25%, 
                rgba(6, 182, 212, 0.15) 50%, 
                rgba(59, 130, 246, 0.1) 75%, 
                transparent 100%)
            `,
            filter: 'blur(40px)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Aurora Layer */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at ${50 + mousePosition.x * 0.1}% ${30 + mousePosition.y * 0.1 + scrollY * 0.01}%, 
              rgba(236, 72, 153, 0.3) 0%, 
              rgba(139, 92, 246, 0.25) 25%, 
              rgba(6, 182, 212, 0.2) 50%, 
              rgba(59, 130, 246, 0.15) 75%, 
              transparent 100%)
          `,
          filter: 'blur(40px)',
        }}
        animate={{
          background: [
            `radial-gradient(ellipse 80% 50% at ${50 + mousePosition.x * 0.1}% ${30 + mousePosition.y * 0.1 + scrollY * 0.01}%, 
              rgba(236, 72, 153, 0.3) 0%, 
              rgba(139, 92, 246, 0.25) 25%, 
              rgba(6, 182, 212, 0.2) 50%, 
              rgba(59, 130, 246, 0.15) 75%, 
              transparent 100%)`,
            `radial-gradient(ellipse 90% 60% at ${60 + mousePosition.x * 0.1}% ${40 + mousePosition.y * 0.1 + scrollY * 0.01}%, 
              rgba(6, 182, 212, 0.3) 0%, 
              rgba(139, 92, 246, 0.25) 25%, 
              rgba(236, 72, 153, 0.2) 50%, 
              rgba(59, 130, 246, 0.15) 75%, 
              transparent 100%)`,
            `radial-gradient(ellipse 70% 40% at ${40 + mousePosition.x * 0.1}% ${50 + mousePosition.y * 0.1 + scrollY * 0.01}%, 
              rgba(139, 92, 246, 0.3) 0%, 
              rgba(236, 72, 153, 0.25) 25%, 
              rgba(6, 182, 212, 0.2) 50%, 
              rgba(59, 130, 246, 0.15) 75%, 
              transparent 100%)`,
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Secondary Aurora Layer */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at ${70 + mousePosition.x * 0.05}% ${20 + mousePosition.y * 0.05 + scrollY * 0.005}%, 
              rgba(6, 182, 212, 0.25) 0%, 
              rgba(236, 72, 153, 0.2) 30%, 
              rgba(139, 92, 246, 0.15) 60%, 
              rgba(59, 130, 246, 0.1) 80%, 
              transparent 100%)
          `,
          filter: 'blur(60px)',
        }}
        animate={{
          background: [
            `radial-gradient(ellipse 60% 80% at ${70 + mousePosition.x * 0.05}% ${20 + mousePosition.y * 0.05 + scrollY * 0.005}%, 
              rgba(6, 182, 212, 0.25) 0%, 
              rgba(236, 72, 153, 0.2) 30%, 
              rgba(139, 92, 246, 0.15) 60%, 
              rgba(59, 130, 246, 0.1) 80%, 
              transparent 100%)`,
            `radial-gradient(ellipse 80% 60% at ${30 + mousePosition.x * 0.05}% ${80 + mousePosition.y * 0.05 + scrollY * 0.005}%, 
              rgba(236, 72, 153, 0.25) 0%, 
              rgba(139, 92, 246, 0.2) 30%, 
              rgba(6, 182, 212, 0.15) 60%, 
              rgba(59, 130, 246, 0.1) 80%, 
              transparent 100%)`,
            `radial-gradient(ellipse 60% 80% at ${70 + mousePosition.x * 0.05}% ${20 + mousePosition.y * 0.05 + scrollY * 0.005}%, 
              rgba(139, 92, 246, 0.25) 0%, 
              rgba(6, 182, 212, 0.2) 30%, 
              rgba(236, 72, 153, 0.15) 60%, 
              rgba(59, 130, 246, 0.1) 80%, 
              transparent 100%)`,
          ],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Subtle Energy Veil */}
      <motion.div
        className="absolute inset-0 opacity-15"
        style={{
          background: `
            conic-gradient(from ${mousePosition.x * 2}deg at ${50 + mousePosition.x * 0.02}% ${50 + mousePosition.y * 0.02}%, 
              rgba(236, 72, 153, 0.15) 0deg, 
              rgba(139, 92, 246, 0.12) 90deg, 
              rgba(6, 182, 212, 0.1) 180deg, 
              rgba(59, 130, 246, 0.08) 270deg, 
              rgba(236, 72, 153, 0.15) 360deg)
          `,
          filter: 'blur(80px)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Empire Crown Glow */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 opacity-10"
        style={{
          background: `
            radial-gradient(circle, 
              rgba(236, 72, 153, 0.25) 0%, 
              rgba(139, 92, 246, 0.2) 25%, 
              rgba(6, 182, 212, 0.15) 50%, 
              rgba(59, 130, 246, 0.1) 75%, 
              transparent 100%)
          `,
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/**
 * Animated Galaxy Background Component
 * 
 * Features:
 * - Floating gradient bubbles with smooth animations
 * - Respects prefers-reduced-motion
 * - Adapts to light/dark mode
 * - Performance optimized with CSS transforms
 * - Non-intrusive to UI content
 */

export default function AnimatedBackground() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Don't render animations if user prefers reduced motion
  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
    );
  }

  // Animation variants for different bubble sizes
  const bubbleVariants = {
    small: {
      y: [0, -20, 0, -10, 0],
      x: [0, 10, 0, -5, 0],
      scale: [1, 1.15, 0.95, 1.1, 1],
      opacity: [0.2, 0.5, 0.15, 0.4, 0.2],
    },
    medium: {
      y: [0, -30, 0, -15, 0],
      x: [0, -15, 0, 8, 0],
      scale: [1, 1.2, 0.9, 1.15, 1],
      opacity: [0.15, 0.45, 0.1, 0.35, 0.15],
    },
    large: {
      y: [0, -40, 0, -20, 0],
      x: [0, 20, 0, -10, 0],
      scale: [1, 1.25, 0.85, 1.2, 1],
      opacity: [0.1, 0.4, 0.05, 0.3, 0.1],
    },
  };

  // Generate random bubbles with different properties
  const generateBubbles = () => {
    const bubbles = [];
    const bubbleCount = 18; // More bubbles for more life

    for (let i = 0; i < bubbleCount; i++) {
      const size = Math.random() * 120 + 40; // 40-160px 
      const left = Math.random() * 100; // 0-100%
      const top = Math.random() * 100; // 0-100%
      const duration = Math.random() * 15 + 30; // 30-45s (slower, more meditative breathing)
      const delay = Math.random() * 25; // 0-25s delay for natural, organic offset
      
      let variant = 'small';
      if (size > 100) variant = 'large';
      else if (size > 70) variant = 'medium';

      bubbles.push({
        id: i,
        size,
        left,
        top,
        duration,
        delay,
        variant,
      });
    }

    return bubbles;
  };

  const bubbles = generateBubbles();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      
      {/* Empire Glow Aurora Layer - Above bubbles, below content */}
      <div className="absolute inset-0 z-[5]">
        <EmpireGlow />
      </div>
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 z-[1]"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Breathing Soul Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full blur-2xl z-[2]"
          style={{
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
          animate={{
            // The whole bubble breathes - expands and contracts like a living organism
            scale: [1, 1.5, 0.6, 1.3, 1],
            opacity: [0.2, 0.7, 0.1, 0.6, 0.2],
            // Gentle floating motion - more organic drift
            y: [0, -30, 0, -15, 0],
            x: [0, 15, 0, -8, 0],
            // Subtle rotation for organic feel
            rotate: [0, 12, 0, -6, 0],
            // Breathing rhythm - like a heartbeat
            filter: [
              'blur(15px) brightness(1)',
              'blur(20px) brightness(1.2)', 
              'blur(10px) brightness(0.8)',
              'blur(18px) brightness(1.1)',
              'blur(15px) brightness(1)'
            ],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1], // Breathing rhythm
          }}
        >
          {/* Gradient bubble with breathing colors */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, 
                rgba(${Math.random() > 0.33 ? '236, 72, 153' : Math.random() > 0.66 ? '6, 182, 212' : '139, 92, 246'}, 0.4) 0%, 
                rgba(${Math.random() > 0.33 ? '139, 92, 246' : Math.random() > 0.66 ? '236, 72, 153' : '6, 182, 212'}, 0.2) 60%, 
                transparent 100%)`,
              filter: 'blur(15px)',
            }}
          />
        </motion.div>
      ))}

      {/* Subtle star field effect */}
      <div className="absolute inset-0 z-[3]">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle mesh gradient overlay for depth */}
      <div
        className="absolute inset-0 opacity-20 z-[4]"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
