import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { UserRole, User } from '@/types/roles';

interface AuthUser extends User {
  password: string;
}

// Dummy accounts - 9 users (3 per role)
const dummyUsers: AuthUser[] = [
  // KM Admin accounts
  { id: '1', email: 'admin1@km.local', password: 'Admin123!', name: 'Sarah Mitchell', role: 'admin', department: 'Knowledge Management' },
  { id: '2', email: 'admin2@km.local', password: 'Admin123!', name: 'Robert Anderson', role: 'admin', department: 'Knowledge Management' },
  { id: '3', email: 'admin3@km.local', password: 'Admin123!', name: 'Michelle Lee', role: 'admin', department: 'Knowledge Management' },
  // SME accounts
  { id: '4', email: 'sme1@km.local', password: 'Sme123!', name: 'Dr. James Chen', role: 'sme', department: 'Engineering' },
  { id: '5', email: 'sme2@km.local', password: 'Sme123!', name: 'Dr. Linda Martinez', role: 'sme', department: 'Safety' },
  { id: '6', email: 'sme3@km.local', password: 'Sme123!', name: 'Dr. David Wilson', role: 'sme', department: 'Compliance' },
  // General User accounts
  { id: '7', email: 'user1@km.local', password: 'User123!', name: 'Alex Thompson', role: 'user', department: 'Operations' },
  { id: '8', email: 'user2@km.local', password: 'User123!', name: 'Emily Davis', role: 'user', department: 'HR' },
  { id: '9', email: 'user3@km.local', password: 'User123!', name: 'Chris Johnson', role: 'user', department: 'IT' },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('km-auth-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem('km-auth-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = dummyUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('km-auth-user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }

    return { success: false, error: 'invalidCredentials' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('km-auth-user');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
