import type { ElementType } from 'react';
import { Crown, PenSquare, Eye } from 'lucide-react';
import { cn } from '@/shared/lib';
import { ROLE_LABELS } from '@/shared/constants';
import type { Role } from '@/shared/types';

interface RoleSelectProps {
  value: Role;
  onChange: (role: Role) => void;
}

const ROLE_OPTIONS: { role: Role; icon: ElementType; desc: string }[] = [
  { role: 'admin', icon: Crown, desc: 'Full control over posts & collaborators' },
  { role: 'collaborator', icon: PenSquare, desc: 'Create & edit your own posts' },
  { role: 'user', icon: Eye, desc: 'Browse, search & read posts' },
];

export function RoleSelect({ value, onChange }: RoleSelectProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {ROLE_OPTIONS.map(({ role, icon: Icon, desc }) => (
        <button
          type="button"
          key={role}
          onClick={() => onChange(role)}
          className={cn(
            'flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all font-body',
            value === role
              ? 'border-roseGold bg-babypink/20 shadow-soft'
              : 'border-babypink/30 bg-white/50 hover:border-babypink/60',
          )}
        >
          <span
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl',
              value === role ? 'bg-gradient-to-br from-babypink to-pastelPurple text-white' : 'bg-babypink/20 text-roseGold',
            )}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-gray-700">{ROLE_LABELS[role]}</span>
            <span className="block text-xs text-gray-400">{desc}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
