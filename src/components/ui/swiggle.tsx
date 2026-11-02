'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface SwiggleProps {
  variant?: 'short' | 'long';
  className?: string;
}

export default function SwiggleLine({ className = '' }: SwiggleProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { margin: '-50px' });

  return (
    <svg
      width="100%"
      height="5"
      viewBox="0 0 352 5"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`block ${className}`}
      ref={svgRef}
    >
      <motion.path
        d="M1.50024 2.4917C8.71096 1.1694 16.102 1.1694 23.3127 2.4917C30.5235 3.81401 37.9145 3.81401 45.1252 2.4917C52.336 1.1694 59.727 1.1694 66.9377 2.4917C74.1485 3.81401 81.5395 3.81401 88.7503 2.4917C95.961 1.1694 103.352 1.1694 110.563 2.4917C117.773 3.81401 125.165 3.81401 132.375 2.4917C139.586 1.1694 146.977 1.1694 154.188 2.4917C161.398 3.81401 168.79 3.81401 176 2.4917C183.211 1.1694 190.602 1.1694 197.813 2.4917C205.023 3.81401 212.415 3.81401 219.625 2.4917C226.836 1.16939 234.227 1.16939 241.438 2.49169C248.648 3.814 256.04 3.814 263.25 2.4917C270.461 1.16939 277.852 1.16939 285.063 2.4917C292.273 3.814 299.665 3.814 306.875 2.49169C314.086 1.16939 321.477 1.16939 328.688 2.49169C335.898 3.814 343.29 3.814 350.5 2.49169"
        stroke="#CF2B78"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </svg>
  );
}
