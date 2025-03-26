
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Project {
  id: string;
  name: string;
  createdAt: string;
  lastModified: string;
}

interface UserContextType {
  user: User | null;
  projects: Project[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
      // Load mock projects for the demo
      const mockProjects = [
        { 
          id: "proj-1", 
          name: "Jungle Adventure", 
          createdAt: "2023-08-15", 
          lastModified: "2023-09-20" 
        },
        { 
          id: "proj-2", 
          name: "Space Mystery", 
          createdAt: "2023-09-05", 
          lastModified: "2023-09-18" 
        },
        { 
          id: "proj-3", 
          name: "Pirate's Treasure", 
          createdAt: "2023-10-01", 
          lastModified: "2023-10-05" 
        },
      ];
      setProjects(mockProjects);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock login - in a real app, you'd validate against a backend
    console.log("Logging in with:", email, password);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a mock user
    const newUser = { 
      id: "user-" + Math.floor(Math.random() * 10000),
      name: email.split('@')[0], 
      email 
    };
    
    // Save to local storage
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    
    // Set mock projects
    const mockProjects = [
      { 
        id: "proj-1", 
        name: "Jungle Adventure", 
        createdAt: "2023-08-15", 
        lastModified: "2023-09-20" 
      },
      { 
        id: "proj-2", 
        name: "Space Mystery", 
        createdAt: "2023-09-05", 
        lastModified: "2023-09-18" 
      },
      { 
        id: "proj-3", 
        name: "Pirate's Treasure", 
        createdAt: "2023-10-01", 
        lastModified: "2023-10-05" 
      },
    ];
    setProjects(mockProjects);
  };

  const signup = async (name: string, email: string, password: string) => {
    // This is a mock signup - in a real app, you'd create a user in a backend
    console.log("Signing up:", name, email, password);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a new user
    const newUser = { 
      id: "user-" + Math.floor(Math.random() * 10000),
      name, 
      email 
    };
    
    // Save to local storage
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    
    // Initialize with empty projects for new users
    setProjects([]);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setProjects([]);
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        projects,
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
