import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib';

interface Tab {
  key: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key);

  function handleClick(key: string) {
    setActive(key);
    onChange?.(key);
  }

  return (
    <div className={cn('flex gap-1 rounded-2xl bg-white/50 p-1.5 backdrop-blur-sm border border-white/60', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleClick(tab.key)}
          className={cn(
            'relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold font-body transition-colors z-10',
            active === tab.key ? 'text-white' : 'text-gray-500 hover:text-roseGold',
          )}
        >
          {active === tab.key && (
            <motion.div
              layoutId="tab-pill"
              className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-babypink to-pastelPurple shadow-soft"
              transition={{ type: 'spring', duration: 0.4 }}
            />
          )}
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
