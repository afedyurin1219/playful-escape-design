
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const { isMobile } = useMobile();

  // Get user initials for the avatar
  const getInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const AuthButtons = () => (
    <div className="flex gap-2">
      <Button variant="outline" asChild className="gap-1">
        <Link to="/auth?tab=login">
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Login</span>
        </Link>
      </Button>
      <Button asChild className="gap-1">
        <Link to="/auth?tab=signup">
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Up</span>
        </Link>
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <div>
        {isAuthenticated ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" className="rounded-full p-0 w-10 h-10">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Account</DrawerTitle>
                <DrawerDescription>
                  Signed in as {user?.email}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-3">
                <Button onClick={handleProfileClick} variant="outline" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </Button>
                <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <AuthButtons />
        )}
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0 w-10 h-10">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Account</DialogTitle>
              <DialogDescription>
                Signed in as {user?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 space-y-3">
              <Button onClick={handleProfileClick} variant="outline" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                My Profile
              </Button>
              <Button onClick={handleLogout} variant="outline" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <AuthButtons />
      )}
    </div>
  );
};

export default UserMenu;
