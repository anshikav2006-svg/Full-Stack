import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
}

/**
 * Spawns brief floating hearts, e.g. on "like" interactions.
 * Call `spawn()` from the returned trigger to emit one heart.
 */
export function useFloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  function spawn() {
    const id = Date.now() + Math.random();
    setHearts((h) => [...h, { id, left: 40 + Math.random() * 20 }]);
    setTimeout(() => setHearts((h) => h.filter((heart) => heart.id !== id)), 4000);
  }

  const node = (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute bottom-2 h-4 w-4 fill-roseGold text-roseGold animate-heart"
          style={{ left: `${heart.left}%` }}
        />
      ))}
    </div>
  );

  return { spawn, node };
}

export type { FloatingHeart };
