import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, Briefcase, GraduationCap } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-background/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-rainbow bg-[length:400%_400%] animate-rainbow rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-rainbow bg-[length:400%_400%] animate-rainbow bg-clip-text text-transparent">
              EduCareer
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="nav" className="group">
              <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Chat
            </Button>
            <Button variant="nav" className="group">
              <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Test/Results
            </Button>
            <Button variant="nav" className="group">
              <Briefcase className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Jobs
            </Button>
            <Button variant="nav" className="group">
              <GraduationCap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Colleges
            </Button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="rainbow" className="shadow-rainbow hover:shadow-vibrant">
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