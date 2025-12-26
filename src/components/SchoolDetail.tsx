import React from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Star, Heart, GraduationCap, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { School, User } from '../App';

type SchoolDetailProps = {
  school: School;
  onBack: () => void;
  currentUser: User | null;
  isFavorite: boolean;
  onToggleFavorite: (schoolId: string) => void;
  onNavigateToDiagrams: () => void;
};

export const SchoolDetail: React.FC<SchoolDetailProps> = ({ 
  school, 
  onBack, 
  currentUser,
  isFavorite,
  onToggleFavorite,
  onNavigateToDiagrams
}) => {
  const [contactEmail, contactPhone, contactAddress] = school.contactInfo.split(' | ');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack} className="gap-2">
                <ArrowLeft className="size-4" />
                Back to Search
              </Button>
              <div className="flex items-center gap-2">
                <GraduationCap className="size-8 text-blue-600" />
                <h1 className="text-blue-600">School Finder</h1>
              </div>
            </div>
            <Button variant="outline" onClick={onNavigateToDiagrams} className="gap-2">
              <FileText className="size-4" />
              View Diagrams
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-white text-blue-600">
                  {school.category}
                </Badge>
                <Badge 
                  variant="secondary"
                  className={
                    school.performance === 'Excellent' 
                      ? 'bg-green-500 text-white' 
                      : school.performance === 'Good'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-500 text-white'
                  }
                >
                  {school.performance}
                </Badge>
              </div>
              
              <h2 className="mb-4">{school.name}</h2>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-6 ${
                      i < school.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white/30'
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg">{school.rating}.0 / 5.0</span>
              </div>

              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="size-5" />
                <span>{school.location}</span>
              </div>
            </div>

            <Button
              onClick={() => onToggleFavorite(school.id)}
              variant="secondary"
              className="gap-2"
              size="lg"
            >
              <Heart 
                className={`size-5 ${
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
              {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card className="p-6">
                <h3 className="mb-4">About This School</h3>
                <p className="text-gray-700 leading-relaxed">
                  {school.description}
                </p>
              </Card>

              {/* Programs */}
              <Card className="p-6">
                <h3 className="mb-4">Programs & Offerings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {school.programs.map((program, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{program}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Additional Info */}
              <Card className="p-6">
                <h3 className="mb-4">Why Choose {school.name}?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Experienced Faculty:</span> Our teachers bring years of expertise and passion to the classroom.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Modern Facilities:</span> State-of-the-art classrooms, labs, and recreational spaces.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Community Focus:</span> Strong parent-teacher partnerships and community engagement.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Proven Results:</span> Consistent track record of student success and achievement.
                      </p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="p-6">
                <h4 className="mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-sm break-all">{contactEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <p className="text-sm">{contactPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Address</p>
                      <p className="text-sm">{contactAddress}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Facts */}
              <Card className="p-6">
                <h4 className="mb-4">Quick Facts</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">School Type</span>
                    <span className="text-sm">{school.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Location</span>
                    <span className="text-sm">{school.location}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Performance</span>
                    <span className="text-sm">{school.performance}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Rating</span>
                    <span className="text-sm">{school.rating}.0 / 5.0</span>
                  </div>
                </div>
              </Card>

              {/* CTA */}
              <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <h4 className="mb-3">Interested in Enrollment?</h4>
                <p className="text-sm text-blue-100 mb-4">
                  Contact the school directly for enrollment information, tours, and application details.
                </p>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  Request Information
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
