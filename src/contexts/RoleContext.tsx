import React, { createContext, useContext, ReactNode } from 'react';
import { UserRole, User } from '@/types/roles';
import { useAuth } from '@/contexts/AuthContext';

interface RoleContextType {
  currentRole: UserRole;
  currentUser: User;
}

const defaultUser: User = {
  id: '0',
  name: 'Guest',
  email: 'guest@km.local',
  role: 'user',
  department: 'N/A',
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const currentRole = user?.role || 'user';
  const currentUser = user || defaultUser;

  return (
    <RoleContext.Provider value={{ currentRole, currentUser }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
