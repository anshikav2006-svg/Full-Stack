import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-purple-900/30 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'relative w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-white/60 bg-cream/95 backdrop-blur-2xl p-6 shadow-glow',
              sizeClasses[size],
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              {title && <h2 className="font-display text-xl font-bold text-gray-700">{title}</h2>}
              <button
                onClick={onClose}
                className="ml-auto rounded-full p-2 text-gray-400 transition-colors hover:bg-babypink/30 hover:text-roseGold"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
