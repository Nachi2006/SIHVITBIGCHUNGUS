import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Loader2, Search, GraduationCap, MapPin, Star, Users, 
  ArrowUp, ArrowUpRight, RefreshCw, BookOpen, Building, Award, TrendingUp 
} from 'lucide-react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

interface College {
  name: string;
  location: string;
  type: string;
  ranking?: string;
  programs: string[];
  description: string;
  website?: string;
  rating?: number;
  student_count?: string;
  established?: string;
  fees?: string;
}

const fetchColleges = async ({ queryKey }: { queryKey: [string, string, string] }) => {
  const [_, field, location] = queryKey;
  
  if (!field.trim()) return [];
  
  const response = await fetch('http://localhost:8000/api/colleges/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      field: field,
      location: location || 'India',
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch colleges');
  }
  
  const data = await response.json();
  return data.data || [];
};

export default function Colleges() {
  const [field, setField] = useState('');
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const { data: colleges = [], isLoading, isError, refetch } = useQuery<College[]>({
    queryKey: ['colleges', searchTerm, searchLocation],
    queryFn: fetchColleges as any,
    enabled: !!searchTerm,
    retry: 1,
  });

  const searchColleges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!field.trim()) {
      toast.error('Please enter a field of study');
      return;
    }
    setSearchTerm(field);
    setSearchLocation(location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-10"></div>
      </div>

      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mr-3">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              CareerCompass
            </h1>
          </div>
          <Button 
            variant="ghost" 
            className="text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 group"
            onClick={() => window.location.href = '/'}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Find Your Perfect College
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Discover colleges and universities that align with your academic interests and career aspirations
          </p>
        </div>

        {/* Search Card */}
        <div className="relative group">
          {/* Decorative Elements */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-12 border border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            
            <form onSubmit={searchColleges} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <BookOpen className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <Input
                      id="field"
                      type="text"
                      placeholder="Field of study, major, or program"
                      className="pl-12 h-12 sm:h-14 bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 text-sm sm:text-base transition-all duration-300 hover:bg-slate-700/70"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-5">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Location (city, state, or country)"
                      className="pl-12 h-12 sm:h-14 bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 text-sm sm:text-base transition-all duration-300 hover:bg-slate-700/70"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <Button 
                    type="submit" 
                    className="h-12 sm:h-14 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white text-sm sm:text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || !field.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
                        <span className="hidden sm:inline">Searching...</span>
                        <span className="sm:hidden">...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Find Colleges</span>
                        <span className="sm:hidden">Search</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
            
            {/* Popular Searches */}
            <div className="mt-8">
              <p className="text-sm text-slate-400 mb-3 flex items-center">
                <svg className="h-4 w-4 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Popular fields:
              </p>
              <div className="flex flex-wrap gap-2">
                <button 
                  type="button" 
                  onClick={() => {
                    setField('Computer Science');
                    setSearchTerm('Computer Science');
                    setSearchLocation(location);
                  }}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all duration-200 flex items-center group"
                >
                  <BookOpen className="h-4 w-4 mr-2 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>Computer Science</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setField('Business Administration');
                    setSearchTerm('Business Administration');
                    setSearchLocation(location);
                  }}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all duration-200 flex items-center group"
                >
                  <Building className="h-4 w-4 mr-2 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>Business Administration</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setField('Engineering');
                    setSearchTerm('Engineering');
                    setSearchLocation(location);
                  }}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all duration-200 flex items-center group"
                >
                  <Award className="h-4 w-4 mr-2 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>Engineering</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setField('Medicine');
                    setSearchTerm('Medicine');
                    setSearchLocation(location);
                  }}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all duration-200 flex items-center group"
                >
                  <TrendingUp className="h-4 w-4 mr-2 text-green-400 group-hover:scale-110 transition-transform" />
                  <span>Medicine</span>
                </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {searchTerm && (
            <div className="mb-12">
              <div className="w-full flex flex-col items-center mb-8">
                <div className="w-full max-w-4xl px-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 mr-3 animate-spin text-cyan-400" />
                        <span>Searching for colleges...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-1 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-slate-300">
                            {colleges.length} {colleges.length === 1 ? 'college' : 'colleges'} matching your search
                            {searchTerm && ` for "${searchTerm}"`}
                            {searchLocation && ` in ${searchLocation}`}
                          </span>
                        </div>
                        {colleges.length > 0 && (
                          <div className="flex justify-center text-sm text-slate-400">
                            <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-slate-800/50">
                              {colleges.length} {colleges.length === 1 ? 'result' : 'results'}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </h2>
                </div>
              </div>
              
              <div className="space-y-5">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-slate-800/30 rounded-2xl backdrop-blur-sm border border-slate-700/50">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
                      <Loader2 className="absolute inset-0 m-auto h-10 w-10 animate-spin text-cyan-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-lg text-slate-300 font-medium mb-2">Finding the best colleges for you...</p>
                      <p className="text-sm text-slate-500">This may take a moment</p>
                    </div>
                  </div>
                ) : isError ? (
                  <div className="text-center py-16 bg-slate-800/30 rounded-2xl backdrop-blur-sm border border-red-500/20">
                    <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                      <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Something went wrong</h3>
                    <p className="text-slate-300 mb-6 max-w-md mx-auto">We couldn't load the college listings. Please check your connection and try again.</p>
                    <Button 
                      variant="outline" 
                      className="bg-slate-700/50 border-slate-600 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-colors duration-300 group"
                      onClick={() => {
                        setSearchTerm(field);
                        setSearchLocation(location);
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                      Try Again
                    </Button>
                  </div>
                ) : colleges.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {colleges.map((college: College, index: number) => (
                      <div 
                        key={index} 
                        className="group relative bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-500 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 shadow-lg hover:shadow-cyan-500/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                                {college.name}
                              </h3>
                              <p className="text-cyan-300/90 mt-1 font-medium">
                                {college.type}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              {college.rating && (
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                  <span className="text-yellow-400 font-medium">{college.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-5">
                            <div className="flex items-center bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-600/50">
                              <MapPin className="h-4 w-4 mr-1.5 text-cyan-400" />
                              <span className="text-sm">{college.location}</span>
                            </div>
                            {college.ranking && (
                              <div className="flex items-center bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-600/50">
                                <Award className="h-4 w-4 mr-1.5 text-purple-400" />
                                <span className="text-sm">Rank #{college.ranking}</span>
                              </div>
                            )}
                            {college.student_count && (
                              <div className="flex items-center bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-600/50">
                                <Users className="h-4 w-4 mr-1.5 text-green-400" />
                                <span className="text-sm">{college.student_count} students</span>
                              </div>
                            )}
                            {college.established && (
                              <div className="flex items-center bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-600/50">
                                <Building className="h-4 w-4 mr-1.5 text-orange-400" />
                                <span className="text-sm">Est. {college.established}</span>
                              </div>
                            )}
                          </div>
                          
                          {college.programs && college.programs.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm text-slate-400 mb-2">Popular Programs:</p>
                              <div className="flex flex-wrap gap-1">
                                {college.programs.slice(0, 3).map((program, idx) => (
                                  <span key={idx} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                                    {program}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="text-slate-300 text-sm line-clamp-3 mb-6">
                            {college.description || 'No description available.'}
                          </div>
                          
                          <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center">
                            <a 
                              href={college.website || '#'} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 transform"
                            >
                              Visit Website
                              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <button 
                              className="text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                              onClick={() => {
                                toast.success('College saved to your list');
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark">
                                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchTerm && !isLoading ? (
                  <div className="text-center py-16 bg-slate-800/30 rounded-2xl backdrop-blur-sm border border-slate-700/50">
                    <div className="mx-auto w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                      <GraduationCap className="h-10 w-10 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No colleges found</h3>
                    <p className="text-slate-300 max-w-md mx-auto mb-6">We couldn't find any colleges matching "{searchTerm}" {searchLocation && `in ${searchLocation}`}. Try different keywords or location.</p>
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        className="bg-slate-700/50 border-slate-600 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-colors duration-300"
                        onClick={() => {
                          setField('');
                          setLocation('');
                          setSearchTerm('');
                          setSearchLocation('');
                          document.getElementById('field')?.focus();
                        }}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        New Search
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  </div>
);
}
