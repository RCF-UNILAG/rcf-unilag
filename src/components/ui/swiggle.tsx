'use client';

import { motion } from 'framer-motion';

interface SwiggleProps {
  variant: 'short' | 'long';
  className?: string;
}

export default function SwiggleLine({ variant, className = '' }: SwiggleProps) {
  // Set distinct vector paths and dimensions depending on if it's the long or short swiggle
  const isLong = variant === 'long';
  
  const width = isLong ? "160" : "80";
  const viewBox = isLong ? "0 0 160 12" : "0 0 80 12";
  
  // Replace these strings with your exact SVG path 'd' values from the design files
  const pathData = isLong
    ? "M2 6 C 40 2, 80 10, 120 2 C 140 2, 150 6, 158 6" // Example Long path
    : "M2 6 C 20 2, 40 10, 60 2 C 70 2, 75 6, 78 6";     // Example Short path

  return (
    <svg 
      width={width} 
      height="12" 
      viewBox={viewBox} 
      fill="none" 
      xmlns="http://w3.org"
      className={`block ${className}`}
    >
      <motion.path
        d={pathData}
        stroke="currentColor" // Inherits Tailwind text color utilities (e.g., text-yellow-500)
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-50px" }} // Triggers slightly before it fully hits the viewport
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </svg>
  );
}
