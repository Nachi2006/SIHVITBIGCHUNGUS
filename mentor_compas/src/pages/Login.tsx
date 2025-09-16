import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Eye, EyeOff, GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
            {/* Social Login Options */}
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-11 border-2 border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 text-white"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>
            </div>

            {/* Email/Password Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="transition-all duration-300 focus:shadow-glow/20"
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
            </div>

            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold px-8 py-4 rounded-lg border-2 border-white/40 hover:from-cyan-600 hover:to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              Login
            </Button>

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