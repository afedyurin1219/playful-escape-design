
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AuthButtons = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, isLoading } = useAuth();
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return "U";
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user.email?.substring(0, 2).toUpperCase() || "U";
  };

  // Render user menu if logged in, or login/signup buttons if not
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 outline-none">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-teal text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden md:inline-block">
              {profile?.full_name || profile?.username || user.email?.split('@')[0]}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <User className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => navigate('/auth')}
        disabled={isLoading}
      >
        <LogIn className="h-4 w-4" />
        Login
      </Button>
      
      <Button 
        className="flex items-center gap-2"
        onClick={() => {
          navigate('/auth');
          // Set signup tab active after navigation
          setTimeout(() => {
            const tabTrigger = document.querySelector('[data-state="inactive"][value="signup"]');
            if (tabTrigger) {
              (tabTrigger as HTMLButtonElement).click();
            }
          }, 100);
        }}
        disabled={isLoading}
      >
        <UserPlus className="h-4 w-4" />
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
