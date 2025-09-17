import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await login(username, password);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled in the login function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Back to Home Button - Fixed Position */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="text-white/80 hover:text-white transition-colors text-sm inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 backdrop-blur-sm"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Back to Home</span>
        </Link>
      </div>
      {/* Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
      
      {/* Animated Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-80" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-50" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 right-2/3 w-1 h-1 bg-purple-200 rounded-full animate-pulse opacity-70" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-cyan-200 rounded-full animate-pulse opacity-60" style={{animationDelay: '3s'}}></div>
      </div>
      
      {/* Floating Cosmic Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="w-full max-w-md animate-bounce-in">
        <Card className="border border-purple-500/20 shadow-2xl backdrop-blur-md bg-slate-900/80 hover:shadow-purple-500/20 transition-all duration-500 relative z-10">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
              <CardDescription className="text-gray-300">
                Sign in to your CareerCompass account
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="transition-all duration-300 focus:shadow-glow/20"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10 transition-all duration-300 focus:shadow-glow/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit"
                size="lg" 
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold px-8 py-4 rounded-lg border-2 border-white/40 hover:from-cyan-600 hover:to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="w-full h-px bg-white/20 my-6"></div>
            <Link
              to="/signup"
              className="w-full flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-white/30 text-white font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-300 text-sm"
            >
              Don't have an account? <span className="font-semibold ml-1">Sign up</span> <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Login;