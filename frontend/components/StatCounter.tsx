'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export default function StatCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  label 
}: StatCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-black text-white mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-blue-200 text-sm">{label}</div>
    </div>
  );
}
