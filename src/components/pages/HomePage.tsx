import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Sparkles, Briefcase, Music, Calendar, ArrowRight } from 'lucide-react';
import { PageType } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-purple-300">Empowering the Next Generation</span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl tracking-tight max-w-4xl mx-auto">
              Future Fest & Youth Development
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Where creativity meets opportunity. We empower young minds through entertainment, 
              education, and mentorship, creating platforms for the next generation of leaders.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => onNavigate('activities')}>
                Explore Activities
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate('sponsor')}>
                Become a Sponsor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-5xl mb-4">What We Offer</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From corporate events to music festivals, we create unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Corporate Events */}
          <Card>
            <div className="space-y-4">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-700">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1551677629-c3e314ecf29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMHRlYW18ZW58MXx8fHwxNzY2MDI2MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Corporate Events"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-2xl">Corporate Events</h3>
              <p className="text-gray-400 leading-relaxed">
                Professional event management for corporate gatherings, team building, and brand activations
              </p>
              <Button variant="outline" onClick={() => onNavigate('activities')}>
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Music & Bands */}
          <Card>
            <div className="space-y-4">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-700">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGJhbmQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjYwMjY0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Music & Bands"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-2xl">Music & Bands</h3>
              <p className="text-gray-400 leading-relaxed">
                Showcasing emerging talent and established artists through live performances and recordings
              </p>
              <Button variant="outline" onClick={() => onNavigate('activities')}>
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Festivals */}
          <Card>
            <div className="space-y-4">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-700">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1559060680-36abfac01944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGZlc3RpdmFsJTIwY29uY2VydHxlbnwxfHx8fDE3NjYwNTY4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Festivals"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-2xl">Festivals</h3>
              <p className="text-gray-400 leading-relaxed">
                Annual Future Fest and other youth-centered festivals celebrating creativity and culture
              </p>
              <Button variant="outline" onClick={() => onNavigate('activities')}>
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center space-y-6">
            <h2 className="text-white text-3xl md:text-4xl">Ready to Make an Impact?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join us in empowering the next generation of creators, leaders, and innovators
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" onClick={() => onNavigate('contact')}>
                Get in Touch
              </Button>
              <Button variant="secondary" size="lg" onClick={() => onNavigate('sponsor')}>
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
