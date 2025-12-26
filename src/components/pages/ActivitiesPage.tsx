import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { 
  Briefcase, 
  Music, 
  Calendar, 
  Users, 
  Lightbulb, 
  Mic, 
  Camera,
  Sparkles,
  ArrowRight 
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ActivitiesPage() {
  const activities = [
    {
      icon: <Briefcase className="w-8 h-8 text-white" />,
      title: 'Corporate Events',
      description: 'Professional event planning and management for corporate gatherings, product launches, team building activities, and brand activations. We create memorable experiences that align with your business objectives.',
      features: ['Team Building', 'Product Launches', 'Brand Activations', 'Conference Management'],
      gradient: 'from-orange-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1551677629-c3e314ecf29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMHRlYW18ZW58MXx8fHwxNzY2MDI2MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: <Music className="w-8 h-8 text-white" />,
      title: 'Music & Bands',
      description: 'Live music performances featuring both emerging and established artists. From intimate acoustic sets to full band productions, we showcase diverse musical talent and create unforgettable concert experiences.',
      features: ['Live Performances', 'Artist Development', 'Music Production', 'Concert Series'],
      gradient: 'from-purple-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGJhbmQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjYwMjY0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: <Calendar className="w-8 h-8 text-white" />,
      title: 'Festivals / Future Fest',
      description: 'Annual youth-centered festivals that celebrate creativity, culture, and community. Future Fest is our flagship event bringing together music, art, food, and education in a multi-day celebration.',
      features: ['Multi-Day Events', 'Multiple Stages', 'Art Installations', 'Youth Workshops'],
      gradient: 'from-blue-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1559060680-36abfac01944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGZlc3RpdmFsJTIwY29uY2VydHxlbnwxfHx8fDE3NjYwNTY4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: 'Youth Workshops',
      description: 'Educational workshops and training sessions designed to develop practical skills in music production, event management, marketing, and creative arts. Led by industry professionals.',
      features: ['Skill Development', 'Industry Mentors', 'Hands-on Training', 'Certificates'],
      gradient: 'from-orange-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1760996610930-4318aab182ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGNyZWF0aXZlJTIwYXJ0aXN0fGVufDF8fHx8MTc2NjA1NjgwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: <Mic className="w-8 h-8 text-white" />,
      title: 'Talent Showcases',
      description: 'Open mic nights and talent showcases providing platforms for emerging artists to perform, network, and gain exposure. A supportive environment for artists to develop their craft.',
      features: ['Open Mic Nights', 'Talent Competitions', 'Networking Events', 'Performance Coaching'],
      gradient: 'from-purple-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGJhbmQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjYwMjY0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: <Camera className="w-8 h-8 text-white" />,
      title: 'Media Production',
      description: 'Professional photo and video production services for events, promotional content, and artist portfolios. We help capture and share your story with high-quality content.',
      features: ['Event Photography', 'Video Production', 'Live Streaming', 'Content Creation'],
      gradient: 'from-blue-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1654288891700-95f67982cbcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmF8ZW58MXx8fHwxNzY2MDU2ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-purple-300">Explore Our Programs</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl">Our Activities</h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              From corporate events to youth development programs, discover the diverse range of 
              activities and services we offer to empower and entertain.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="space-y-12">
          {activities.map((activity, index) => (
            <Card key={index} hover={false}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Image */}
                <div className="w-full md:w-2/5">
                  <div className="w-full h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden bg-gray-700">
                    <ImageWithFallback 
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-3/5 space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${activity.gradient} rounded-xl flex items-center justify-center`}>
                    {activity.icon}
                  </div>
                  <h2 className="text-white text-3xl">{activity.title}</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {activity.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {activity.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center space-y-6">
            <Lightbulb className="w-16 h-16 text-orange-400 mx-auto" />
            <h2 className="text-white text-3xl md:text-4xl">Have a Custom Project in Mind?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We love collaborating on unique projects. Let's discuss how we can bring your vision to life.
            </p>
            <Button size="lg">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
