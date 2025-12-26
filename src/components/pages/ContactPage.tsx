import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ fullName: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center space-y-6">
            <MessageCircle className="w-16 h-16 text-orange-400 mx-auto" />
            <h1 className="text-white text-5xl md:text-6xl">Get in Touch</h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Have a question or want to work together? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card hover={false} className="h-full">
              <h2 className="text-white text-3xl mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-green-400 text-2xl mb-2">Message Sent!</h3>
                  <p className="text-gray-300">
                    Thank you for reaching out. We'll get back to you within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-white text-3xl mb-6">Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                Whether you're interested in our services, want to collaborate, or just have a question, 
                we're here to help. Reach out through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl mb-1">Email</h3>
                    <p className="text-gray-400">info@logicspark.com</p>
                    <p className="text-gray-400">partnerships@logicspark.com</p>
                  </div>
                </div>
              </Card>

              {/* Phone */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl mb-1">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-500 text-sm mt-1">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
              </Card>

              {/* Location */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl mb-1">Office</h3>
                    <p className="text-gray-400">
                      123 Creative Avenue<br />
                      Suite 400<br />
                      Innovation City, ST 12345
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Links */}
            <Card hover={false} className="bg-gradient-to-br from-gray-800/80 to-gray-800/50">
              <h3 className="text-white text-xl mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-purple-400">📘</span>
                </button>
                <button className="w-10 h-10 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-purple-400">📷</span>
                </button>
                <button className="w-10 h-10 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-purple-400">🐦</span>
                </button>
                <button className="w-10 h-10 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-purple-400">▶️</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center space-y-6">
            <h2 className="text-white text-3xl md:text-4xl">Looking to Partner With Us?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We're always interested in collaborating with brands and organizations that share our vision for youth empowerment.
            </p>
            <Button size="lg" variant="secondary">
              Explore Sponsorship Opportunities
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
