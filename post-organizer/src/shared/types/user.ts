export type Role = 'admin' | 'collaborator' | 'user';

export interface AuthUser {
  id: string;
  name: string;
  role: Role;
  avatar: string;
}
