import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || 
        !formData.username.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      setIsLoading(true);
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (error) {
      // Error is handled in the register function
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
      
      {/* Animated Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-1/5 left-1/5 w-1 h-1 bg-white rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-2/5 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/5 left-2/5 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-80" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/5 right-1/5 w-1 h-1 bg-white rounded-full animate-pulse opacity-50" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-2/5 right-3/5 w-1 h-1 bg-purple-200 rounded-full animate-pulse opacity-70" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-4/5 left-3/5 w-1 h-1 bg-cyan-200 rounded-full animate-pulse opacity-60" style={{animationDelay: '3s'}}></div>
      </div>
      
      {/* Floating Cosmic Elements */}
      <div className="absolute top-10 right-10 w-28 h-28 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-36 h-36 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="w-full max-w-md animate-bounce-in">
        <Card className="border border-purple-500/20 shadow-2xl backdrop-blur-md bg-slate-900/80 hover:shadow-purple-500/20 transition-all duration-500 relative z-10">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center animate-pulse-glow shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Join CareerCompass</CardTitle>
              <CardDescription className="text-gray-300">
                Create your account to start your learning journey
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className="transition-all duration-300 focus:shadow-glow/20"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="transition-all duration-300 focus:shadow-glow/20"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="transition-all duration-300 focus:shadow-glow/20"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  className="transition-all duration-300 focus:shadow-glow/20"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pr-10 transition-all duration-300 focus:shadow-glow/20"
                    value={formData.password}
                    onChange={handleInputChange}
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pr-10 transition-all duration-300 focus:shadow-glow/20"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="w-full h-px bg-white/20 my-6"></div>
            <Link
              to="/login"
              className="w-full flex items-center justify-center px-6 py-2.5 rounded-full border-2 border-white/30 text-white font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-300 text-sm"
            >
              Already have an account? <span className="font-semibold ml-1">Sign in</span> <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Signup;