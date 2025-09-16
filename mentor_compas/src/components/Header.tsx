import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, Briefcase, GraduationCap, Mail, X } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="w-full bg-background/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Logo size="md" className="group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CareerCompass
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link to="#" className="group">
              <Button variant="nav" className="group-hover:bg-white/5">
                <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Chat
              </Button>
            </Link>
            <Link to="#" className="group">
              <Button variant="nav" className="group-hover:bg-white/5">
                <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Test/Results
              </Button>
            </Link>
            <Link to="#" className="group">
              <Button variant="nav" className="group-hover:bg-white/5">
                <Briefcase className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Jobs
              </Button>
            </Link>
            <Link to="#" className="group">
              <Button variant="nav" className="group-hover:bg-white/5">
                <GraduationCap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Colleges
              </Button>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button 
                variant="outline" 
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60 hover:text-white transition-all duration-300 px-6 py-5"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                variant="default" 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 px-6 py-5"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;