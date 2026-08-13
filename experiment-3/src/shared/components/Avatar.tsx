import { cn } from '@/shared/lib';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = { sm: 'h-7 w-7 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-lg' };

const GRADIENTS = [
  'from-babypink to-pastelPurple',
  'from-blush to-lavender',
  'from-roseGoldLight to-babypink',
  'from-pastelPurple to-blush',
];

function hashName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const gradient = GRADIENTS[hashName(name) % GRADIENTS.length];

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gradient-to-br font-bold text-white font-display shadow-soft',
        gradient,
        sizeClasses[size],
        className,
      )}
      title={name}
    >
      {initials}
    </div>
  );
}
