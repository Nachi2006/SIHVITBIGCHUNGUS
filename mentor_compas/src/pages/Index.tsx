import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle, FileText, Briefcase, GraduationCap, Users, TrendingUp, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-rainbow bg-[length:400%_400%] animate-rainbow py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-bounce-in">
            Your Future Starts
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
              Here
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up">
            Discover your potential with personalized career guidance, skill assessments, and opportunities that match your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button variant="sunset" size="lg" className="shadow-vibrant hover:animate-pulse-glow">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 border border-transparent hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-sunset rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-ocean rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-forest rounded-full opacity-25 animate-bounce" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines AI-powered guidance with real opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-vibrant transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-0 shadow-sm hover:rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:animate-pulse-glow">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">AI Chat Support</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Get instant answers and personalized guidance from our AI career counselor
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-vibrant transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-0 shadow-sm hover:-rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 group-hover:animate-pulse-glow">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Skill Assessment</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Comprehensive tests to identify your strengths and areas for improvement
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-vibrant transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-0 shadow-sm hover:rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:animate-pulse-glow">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Job Opportunities</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Access thousands of curated job listings that match your profile
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-vibrant transition-all duration-500 hover:-translate-y-3 hover:scale-105 border-0 shadow-sm hover:-rotate-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-forest rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500 group-hover:animate-pulse-glow">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">College Guidance</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Find the perfect educational path with our college recommendation system
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-muted/20 via-primary/5 to-muted/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:animate-pulse-glow transition-all duration-500 shadow-vibrant">
                <Users className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent group-hover:scale-110 transition-transform">50K+</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Students Guided</p>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:animate-pulse-glow transition-all duration-500 shadow-vibrant">
                <TrendingUp className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent group-hover:scale-110 transition-transform">95%</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Success Rate</p>
            </div>
            <div className="space-y-2 group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-forest rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:animate-pulse-glow transition-all duration-500 shadow-vibrant">
                <Award className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-forest bg-clip-text text-transparent group-hover:scale-110 transition-transform">1000+</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Partner Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold">EduCareer</span>
          </div>
          <p className="text-primary-foreground/80">
            Contact Us : adithyanachiyappan@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;