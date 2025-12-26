import React from 'react';
import { Card } from '../Card';
import { Target, Users, GraduationCap, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-white text-5xl md:text-6xl">About Logic Spark Entertainment</h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              We are a youth-focused entertainment company dedicated to creating opportunities, 
              fostering creativity, and building platforms where young talent can thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <Card hover={false} className="bg-gradient-to-br from-gray-800/80 to-gray-800/50">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-700">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1760996610930-4318aab182ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGNyZWF0aXZlJTIwYXJ0aXN0fGVufDF8fHx8MTc2NjA1NjgwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Young creative artist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2">
                <Target className="w-5 h-5 text-orange-400" />
                <span className="text-purple-300">Our Mission</span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl">Empowering Youth Through Creativity</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Logic Spark Entertainment was founded on the belief that every young person deserves 
                a platform to express their creativity, develop their talents, and make meaningful 
                connections. We bridge the gap between entertainment and education, creating experiences 
                that inspire, educate, and empower.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-5xl mb-4">What We Stand For</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our core values guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Youth Empowerment */}
          <Card>
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-2xl">Youth Empowerment</h3>
              <p className="text-gray-400 leading-relaxed">
                We create opportunities for young people to discover their passions, develop their skills, 
                and become confident leaders in their communities.
              </p>
            </div>
          </Card>

          {/* Entertainment */}
          <Card>
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-2xl">Entertainment</h3>
              <p className="text-gray-400 leading-relaxed">
                We produce high-quality events, festivals, and performances that celebrate creativity 
                and bring communities together through the power of entertainment.
              </p>
            </div>
          </Card>

          {/* Education & Mentorship */}
          <Card>
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-2xl">Education & Mentorship</h3>
              <p className="text-gray-400 leading-relaxed">
                We provide mentorship programs, workshops, and educational resources that help young 
                people develop practical skills and achieve their goals.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-orange-400 text-5xl mb-2">500+</div>
              <div className="text-gray-300 text-lg">Events Hosted</div>
            </div>
            <div>
              <div className="text-purple-400 text-5xl mb-2">10K+</div>
              <div className="text-gray-300 text-lg">Youth Reached</div>
            </div>
            <div>
              <div className="text-blue-400 text-5xl mb-2">50+</div>
              <div className="text-gray-300 text-lg">Corporate Partners</div>
            </div>
            <div>
              <div className="text-orange-400 text-5xl mb-2">100+</div>
              <div className="text-gray-300 text-lg">Artists Featured</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
