import type { Role } from '@/shared/types';

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Admin',
  collaborator: 'Collaborator',
  user: 'Viewer',
};

export const ROLE_COLORS: Record<Role, string> = {
  admin: 'bg-roseGold/20 text-roseGold border-roseGold/40',
  collaborator: 'bg-pastelPurple/30 text-purple-700 border-pastelPurple/50',
  user: 'bg-babypink/40 text-pink-700 border-babypink/60',
};

export const PERMISSIONS = {
  admin: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canUpload: true,
    canManageUsers: true,
    canViewStats: true,
  },
  collaborator: {
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canUpload: true,
    canManageUsers: false,
    canViewStats: false,
  },
  user: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canUpload: false,
    canManageUsers: false,
    canViewStats: false,
  },
} as const;
