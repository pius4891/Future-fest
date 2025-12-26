import { Card } from '../Card';
import { Button } from '../Button';
import { Award, TrendingUp, Users, Heart, Zap } from 'lucide-react';

export function SponsorPage() {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: 'Brand Visibility',
      description:
        'Prominent brand placement across events, digital platforms, and marketing materials'
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: 'Community Impact',
      description:
        'Direct involvement in youth development and community empowerment initiatives'
    },
    {
      icon: <Heart className="w-6 h-6 text-white" />,
      title: 'Social Responsibility',
      description:
        'Demonstrate your commitment to creating positive change in the community'
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: 'Exclusive Access',
      description:
        'VIP access to events, networking opportunities, and behind-the-scenes experiences'
    }
  ];

  const impactStats = [
    { number: '50+', label: 'Active Partners', icon: '🤝' },
    { number: '10K+', label: 'Youth Reached', icon: '🌟' },
    { number: '$500K+', label: 'Community Investment', icon: '💰' },
    { number: '100+', label: 'Events Annually', icon: '🎉' }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-2 mb-4">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-purple-300">Join Our Mission</span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl tracking-tight max-w-4xl mx-auto">
              Become a Sponsor
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Partner with Logic Spark Entertainment to create meaningful impact while growing your brand.
              Together, we can empower the next generation of leaders and innovators.
            </p>
            <Button size="lg">Partner With Us</Button>
          </div>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-5xl mb-4">
            Why Sponsor With Us?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your partnership creates lasting impact while providing valuable brand opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-white text-xl">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-5xl mb-4">
            Our Collective Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what we've accomplished together with our sponsor partners
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <Card key={index} hover={false}>
              <div className="text-center space-y-3">
                <div className="text-4xl">{stat.icon}</div>
                <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Current Partners */}
      <section className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center space-y-6">
            <h2 className="text-white text-4xl md:text-5xl">
              Join Leading Organizations
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We're proud to partner with forward-thinking companies and organizations committed to youth empowerment
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              {['Tech Co', 'Creative Agency', 'Global Brand', 'Innovation Hub'].map(
                (partner, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-lg">{partner}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <Card hover={false} className="bg-gradient-to-br from-gray-800/80 to-gray-800/50 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-white text-4xl">Ready to Make an Impact?</h2>
            <p className="text-gray-300 text-lg">
              Let's discuss how we can create a partnership that aligns with your goals and
              makes a real difference in the lives of young people.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg">Schedule a Meeting</Button>
              <Button variant="outline" size="lg">
                Download Sponsorship Deck
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
