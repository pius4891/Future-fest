import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { ShoppingBag, Bell, Package, TrendingUp } from 'lucide-react';

export function ShopPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  const comingSoonProducts = [
    {
      category: 'Apparel',
      items: ['T-Shirts', 'Hoodies', 'Hats', 'Accessories'],
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      category: 'Festival Merch',
      items: ['Future Fest Gear', 'Limited Editions', 'Artist Collaborations', 'Collectibles'],
      icon: <Package className="w-8 h-8 text-white" />,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      category: 'Digital Products',
      items: ['Music Downloads', 'Event Tickets', 'Workshop Access', 'Exclusive Content'],
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      gradient: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center space-y-6">
            <ShoppingBag className="w-20 h-20 text-orange-400 mx-auto" />
            <h1 className="text-white text-5xl md:text-6xl">Merchandise Coming Soon</h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              We're preparing an exciting collection of merchandise, apparel, and exclusive items. 
              Be the first to know when our shop launches!
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-5xl mb-4">What's Coming</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Preview the categories we're working on
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {comingSoonProducts.map((product, index) => (
            <Card key={index}>
              <div className="space-y-4 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-xl flex items-center justify-center mx-auto`}>
                  {product.icon}
                </div>
                <h3 className="text-white text-2xl">{product.category}</h3>
                <ul className="space-y-2 pt-2">
                  {product.items.map((item, idx) => (
                    <li key={idx} className="text-gray-400 flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Notify Me Form */}
        <Card hover={false} className="max-w-2xl mx-auto bg-gradient-to-br from-gray-800/80 to-gray-800/50">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-3xl">Stay Updated</h3>
            <p className="text-gray-300 text-lg">
              Enter your email to receive notifications when our shop launches and get exclusive early access deals.
            </p>
            
            {submitted ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
                <p className="text-green-400 text-lg">
                  Thanks! We'll notify you when the shop launches.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNotifyMe} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-gray-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
                <Button type="submit" size="lg" className="w-full">
                  Notify Me
                  <Bell className="w-5 h-5" />
                </Button>
              </form>
            )}
          </div>
        </Card>
      </section>

      {/* Feature Highlights */}
      <section className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">🎨</div>
              <h4 className="text-white text-xl mb-2">Unique Designs</h4>
              <p className="text-gray-400">
                Original artwork by local artists
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">🌱</div>
              <h4 className="text-white text-xl mb-2">Sustainable</h4>
              <p className="text-gray-400">
                Eco-friendly materials and practices
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">💜</div>
              <h4 className="text-white text-xl mb-2">Give Back</h4>
              <p className="text-gray-400">
                Proceeds support youth programs
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
