
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface Project {
  id: string;
  name: string;
  date: string;
  theme: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    // Mock projects data - would be fetched from a real database
    setProjects([
      { 
        id: '1', 
        name: 'Pirate Adventure', 
        date: '2023-10-15', 
        theme: 'Pirates'
      },
      { 
        id: '2', 
        name: 'Space Odyssey', 
        date: '2023-11-20', 
        theme: 'Space'
      },
      { 
        id: '3', 
        name: 'Mystery Mansion', 
        date: '2023-12-05', 
        theme: 'Mystery'
      }
    ]);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return "U";
    if (user.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user.email.substring(0, 2).toUpperCase();
  };
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <header className="py-6 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-display text-teal">Escape Room Designer</a>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" /> Home
            </Button>
            <Button 
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="py-12 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-teal text-white text-xl">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-display">{user.name || 'User'}'s Profile</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        
        <section>
          <h2 className="text-2xl font-display mb-6">Your Projects</h2>
          
          {projects.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">You haven't created any escape rooms yet.</p>
              <Button onClick={() => navigate('/create')}>
                Create Your First Escape Room
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div 
                  key={project.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-lg mb-2">{project.name}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>Theme: {project.theme}</span>
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/result/${project.id}`)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        // Handle duplicate functionality
                        toast({
                          title: "Project duplicated",
                          description: `A copy of ${project.name} has been created.`
                        });
                      }}
                    >
                      Duplicate
                    </Button>
                  </div>
                </div>
              ))}
              
              {/* Create New Project Card */}
              <div 
                className="bg-gray-50 rounded-lg border border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => navigate('/create')}
              >
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-1">Create New Project</h3>
                <p className="text-sm text-gray-500">Design a new escape room adventure</p>
              </div>
            </div>
          )}
        </section>
      </main>
      
      <footer className="py-8 px-6 border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Escape Room Designer</p>
          <div className="flex space-x-6">
            <a href="#" className="text-charcoal-light hover:text-teal transition-colors">Privacy Policy</a>
            <a href="#" className="text-charcoal-light hover:text-teal transition-colors">Terms of Service</a>
            <a href="#" className="text-charcoal-light hover:text-teal transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
