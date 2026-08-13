import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Flower2 } from 'lucide-react';
import { Button } from '@/shared/components';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-cream via-babypink/30 to-pastelPurple/30 p-6 text-center">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="rounded-full bg-babypink/30 p-6 text-roseGold"
      >
        <Flower2 className="h-12 w-12" />
      </motion.div>
      <h1 className="font-display text-5xl font-extrabold text-roseGold">404</h1>
      <h2 className="font-display text-xl font-bold text-gray-700">Page not found</h2>
      <p className="max-w-sm text-sm text-gray-400 font-body">
        This page must have floated away with the sparkles. Let's get you back home.
      </p>
      <Link to="/">
        <Button>
          <Home className="h-4 w-4" /> Back Home
        </Button>
      </Link>
    </div>
  );
}
