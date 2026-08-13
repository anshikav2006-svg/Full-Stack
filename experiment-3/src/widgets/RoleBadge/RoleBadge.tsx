import type { ReactNode } from 'react';
import { Badge } from '@/shared/components';
import { ROLE_LABELS } from '@/shared/constants';
import type { Role } from '@/shared/types';
import { Crown, PenSquare, Eye } from 'lucide-react';

const ROLE_ICONS: Record<Role, ReactNode> = {
  admin: <Crown className="h-3 w-3" />,
  collaborator: <PenSquare className="h-3 w-3" />,
  user: <Eye className="h-3 w-3" />,
};

const ROLE_TONES: Record<Role, 'gold' | 'purple' | 'pink'> = {
  admin: 'gold',
  collaborator: 'purple',
  user: 'pink',
};

export function RoleBadge({ role }: { role: Role }) {
  return (
    <Badge tone={ROLE_TONES[role]}>
      {ROLE_ICONS[role]}
      {ROLE_LABELS[role]}
    </Badge>
  );
}
