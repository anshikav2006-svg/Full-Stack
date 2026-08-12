import type { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        'rounded-2xl border border-white/60 bg-white/60 backdrop-blur-xl shadow-soft',
        className,
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
