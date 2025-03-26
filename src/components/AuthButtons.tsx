
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

// Define form schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthButtons = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  
  // Handle login submission
  const onLoginSubmit = (data: LoginFormValues) => {
    // This would be replaced with actual auth implementation
    console.log("Login attempt:", data);
    // Simulate successful login
    localStorage.setItem('user', JSON.stringify({ email: data.email }));
    toast({
      title: "Success!",
      description: "You have successfully logged in.",
    });
    setIsLoginOpen(false);
  };
  
  // Handle signup submission
  const onSignupSubmit = (data: SignupFormValues) => {
    // This would be replaced with actual auth implementation
    console.log("Signup attempt:", data);
    // Simulate successful signup
    localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
    toast({
      title: "Account created!",
      description: "Your account has been created successfully.",
    });
    setIsSignupOpen(false);
  };

  // Handle Google auth
  const handleGoogleAuth = () => {
    // This would be replaced with actual Google auth implementation
    console.log("Google auth attempted");
    // Simulate successful Google login
    const googleUser = {
      name: "Google User",
      email: "user@gmail.com",
      avatar: "https://lh3.googleusercontent.com/a/default-user"
    };
    localStorage.setItem('user', JSON.stringify(googleUser));
    toast({
      title: "Google login successful!",
      description: "You have logged in with Google.",
    });
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };
  
  return (
    <div className="flex items-center gap-3">
      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login to your account</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your projects
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4">
            {/* Google Login Button */}
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={handleGoogleAuth}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Sign in with Google
            </Button>

            <div className="flex items-center gap-2 my-2">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Email/Password Login Form */}
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="youremail@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Login with Email</Button>
              </form>
            </Form>
          </div>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button 
              className="text-teal hover:underline" 
              onClick={() => {
                setIsLoginOpen(false);
                setTimeout(() => setIsSignupOpen(true), 100);
              }}
            >
              Sign Up
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Signup Dialog */}
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an account</DialogTitle>
            <DialogDescription>
              Sign up to track and manage your escape room projects
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4">
            {/* Google Sign Up Button */}
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={handleGoogleAuth}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Sign up with Google
            </Button>

            <div className="flex items-center gap-2 my-2">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Email/Password Signup Form */}
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="youremail@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Create Account with Email</Button>
              </form>
            </Form>
          </div>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button 
              className="text-teal hover:underline" 
              onClick={() => {
                setIsSignupOpen(false);
                setTimeout(() => setIsLoginOpen(true), 100);
              }}
            >
              Login
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthButtons;
