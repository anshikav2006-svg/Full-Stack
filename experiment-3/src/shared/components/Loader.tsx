import { motion } from 'framer-motion';

export function Loader({ label = 'Loading your cuteness…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="h-10 w-10 rounded-full border-4 border-babypink/40 border-t-roseGold"
      />
      <p className="text-sm text-gray-400 font-body">{label}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/60 bg-white/50">
      <div className="h-40 w-full bg-babypink/30" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/2 rounded bg-babypink/40" />
        <div className="h-4 w-3/4 rounded bg-babypink/30" />
        <div className="h-3 w-full rounded bg-babypink/20" />
      </div>
    </div>
  );
}
