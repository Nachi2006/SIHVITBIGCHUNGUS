import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle, FileText, Briefcase, GraduationCap, Users, TrendingUp, Award, Mail, X } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/Logo";

const ContactPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  
  const email = "adithyanachiyapan@gmail.com";
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl relative border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-cyan-50 dark:bg-cyan-900/30 mb-4">
            <Mail className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Contact Us</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're here to help! Reach out to us at:
          </p>
          <a 
            href={https://mail.google.com/mail/?view=cm&fs=1&to=${email}}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-cyan-500/30"
          >
            <Mail className="w-5 h-5 mr-2" />
            {email}
          </a>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-starfield py-20 px-4">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-bounce-in bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Your Future Starts
            <span className="block bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent animate-pulse font-extrabold">
              Here
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in">
            Discover your potential with personalized career guidance, skill assessments, and opportunities that match your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" className="bg-cosmic text-white hover:bg-opacity-90 shadow-vibrant animate-pulse-glow mr-4">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" className="bg-gradient-electric text-white font-bold px-8 py-4 rounded-lg border-2 border-white/60 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-glow">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-cosmic rounded-full opacity-30 animate-bounce shadow-rainbow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-neon rounded-full opacity-40 animate-bounce shadow-glow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-tropical rounded-full opacity-35 animate-bounce shadow-vibrant" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-gradient-fire rounded-full opacity-30 animate-bounce shadow-rainbow" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-gradient-electric rounded-full opacity-40 animate-bounce shadow-glow" style={{animationDelay: '1.5s'}}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform combines AI-powered guidance with real opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <Card className="group hover:shadow-vibrant transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-0 shadow-sm hover:rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:animate-pulse-glow">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">AI Chat Support</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  Get instant answers and personalized guidance from our AI career counselor
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-vibrant transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-0 shadow-sm hover:-rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 group-hover:animate-pulse-glow">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">Skill Assessment</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  Comprehensive tests to identify your strengths and areas for improvement
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-vibrant transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-0 shadow-sm hover:rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:animate-pulse-glow">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-pink-400 transition-colors">Job Opportunities</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  Access thousands of curated job listings that match your profile
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-vibrant transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-0 shadow-sm hover:-rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-forest rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 group-hover:animate-pulse-glow">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">College Guidance</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors">
                  Find the perfect educational path with our college recommendation system
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-cosmic">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">50K+</h3>
              <p className="text-white/80 group-hover:text-white transition-colors">Students Guided</p>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:animate-pulse-glow transition-all duration-500 shadow-vibrant">
                <TrendingUp className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">95%</h3>
              <p className="text-white/80 group-hover:text-white transition-colors">Success Rate</p>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-forest rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:animate-pulse-glow transition-all duration-500 shadow-vibrant">
                <Award className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">1000+</h3>
              <p className="text-white/80 group-hover:text-white transition-colors">Partner Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-rainbow bg-[length:400%_400%] animate-rainbow text-white py-12 px-4">
        <div className="container mx-auto flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Logo size="md" className="" />
              <span className="text-xl font-bold">CareerCompass</span>
            </div>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="flex items-center justify-center space-x-2 bg-white/90 hover:bg-white text-cyan-700 font-medium rounded-full px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-2"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </button>
          </div>
          <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
      </footer>
    </div>
  );
};

export default Index;