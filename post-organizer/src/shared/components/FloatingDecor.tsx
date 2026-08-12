import { motion } from 'framer-motion';
import { Sparkles, Heart, Flower2 } from 'lucide-react';

/**
 * Decorative floating blobs, sparkles, and hearts used as an ambient
 * background layer across pages. Purely visual, aria-hidden.
 */
export function FloatingDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-babypink/40 blur-3xl animate-float2" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-pastelPurple/40 blur-3xl animate-float" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-lavender/40 blur-3xl animate-float2" />
      <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-blush/40 blur-3xl animate-float" />

      <motion.div className="absolute left-[10%] top-[15%] text-babypink" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
        <Sparkles className="h-6 w-6" />
      </motion.div>
      <motion.div className="absolute right-[15%] top-[25%] text-pastelPurple" animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
        <Flower2 className="h-7 w-7" />
      </motion.div>
      <motion.div className="absolute left-[20%] bottom-[20%] text-roseGold" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5 }}>
        <Heart className="h-5 w-5" />
      </motion.div>
      <motion.div className="absolute right-[8%] bottom-[10%] text-blush" animate={{ y: [0, 12, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 7 }}>
        <Sparkles className="h-5 w-5" />
      </motion.div>
    </div>
  );
}
