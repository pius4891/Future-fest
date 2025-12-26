import React, { useState } from 'react';
import { Search, MapPin, GraduationCap, TrendingUp, Star, Heart, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LoginDialog } from './LoginDialog';
import type { School, User } from '../App';
import { mockSchools } from './mockData';

type HomePageProps = {
  onSchoolSelect: (school: School) => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  favorites: string[];
  onToggleFavorite: (schoolId: string) => void;
  onNavigateToDiagrams: () => void;
};

export const HomePage: React.FC<HomePageProps> = ({ 
  onSchoolSelect, 
  currentUser, 
  onLogin, 
  onLogout,
  favorites,
  onToggleFavorite,
  onNavigateToDiagrams
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [performanceFilter, setPerformanceFilter] = useState('all');
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const filteredSchools = mockSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || school.location === locationFilter;
    const matchesCategory = categoryFilter === 'all' || school.category === categoryFilter;
    const matchesPerformance = performanceFilter === 'all' || school.performance === performanceFilter;
    
    return matchesSearch && matchesLocation && matchesCategory && matchesPerformance;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-8 text-blue-600" />
              <h1 className="text-blue-600">School Finder</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onNavigateToDiagrams} className="gap-2">
                <FileText className="size-4" />
                View Diagrams
              </Button>
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
                  <Button variant="outline" onClick={onLogout}>Logout</Button>
                </div>
              ) : (
                <Button onClick={() => setShowLoginDialog(true)}>Login / Register</Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="mb-4">Find Your Perfect School</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Search through thousands of schools to find the one that matches your needs. 
              Filter by location, type, and performance ratings.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                  <Input
                    type="text"
                    placeholder="Search schools by name or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="size-5" />
                </Button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center gap-1">
                    <MapPin className="size-4" />
                    Location
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="all">All Locations</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Houston">Houston</option>
                    <option value="Boston">Boston</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center gap-1">
                    <GraduationCap className="size-4" />
                    School Type
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Charter">Charter</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center gap-1">
                    <TrendingUp className="size-4" />
                    Performance
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={performanceFilter}
                    onChange={(e) => setPerformanceFilter(e.target.value)}
                  >
                    <option value="all">All Ratings</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3>
              {filteredSchools.length} School{filteredSchools.length !== 1 ? 's' : ''} Found
            </h3>
            {currentUser && favorites.length > 0 && (
              <div className="text-sm text-gray-600">
                <Heart className="inline size-4 text-red-500" /> {favorites.length} Favorite{favorites.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <Card key={school.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div onClick={() => onSchoolSelect(school)}>
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <GraduationCap className="size-20 text-white opacity-50" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="flex-1">{school.name}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(school.id);
                        }}
                        className="ml-2 transition-colors"
                      >
                        <Heart 
                          className={`size-5 ${
                            favorites.includes(school.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{school.category}</Badge>
                      <Badge 
                        variant={
                          school.performance === 'Excellent' ? 'default' : 
                          school.performance === 'Good' ? 'secondary' : 
                          'outline'
                        }
                      >
                        {school.performance}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <MapPin className="size-4" />
                      {school.location}
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < school.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({school.rating}.0)</span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {school.description}
                    </p>

                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredSchools.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="size-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-600 mb-2">No schools found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Login Dialog */}
      <LoginDialog 
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onLogin={onLogin}
      />
    </div>
  );
};
