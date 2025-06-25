import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Candidate, Employer } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'candidate' | 'employer') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users data
const mockUsers: (Candidate | Employer)[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Smith',
    role: 'candidate',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150',
    createdAt: '2024-01-15',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    experience: 5,
    location: 'San Francisco, CA',
    cvUploaded: true,
    jobPreferences: {
      salary: { min: 80000, max: 120000 },
      location: ['San Francisco', 'Remote'],
      jobType: 'full-time'
    }
  },
  {
    id: '2',
    email: 'sarah@techcorp.com',
    name: 'Sarah Johnson',
    role: 'employer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
    createdAt: '2024-01-10',
    company: 'TechCorp Inc.',
    industry: 'Technology',
    companySize: '50-200'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('matchpro_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'candidate' | 'employer') => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('matchpro_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('matchpro_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
