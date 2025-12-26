import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Play, Headphones, Video, Mic, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function MediaPage() {
  const podcasts = [
    {
      title: 'Youth Voices: Stories of Change',
      episode: 'Episode 12',
      description: 'Inspiring conversations with young changemakers and entrepreneurs',
      duration: '45 min',
      image: 'https://images.unsplash.com/photo-1627667050609-d4ba6483a368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc2NjAyNTM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Behind the Scenes',
      episode: 'Episode 8',
      description: 'Go backstage and discover what it takes to produce major events',
      duration: '38 min',
      image: 'https://images.unsplash.com/photo-1627667050609-d4ba6483a368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc2NjAyNTM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Creative Spark',
      episode: 'Episode 15',
      description: 'Tips and insights on developing your creative talents',
      duration: '52 min',
      image: 'https://images.unsplash.com/photo-1627667050609-d4ba6483a368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwcmVjb3JkaW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc2NjAyNTM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const videos = [
    {
      title: 'Future Fest 2024 Highlights',
      description: 'Relive the best moments from our annual festival',
      duration: '8:24',
      views: '12.5K',
      image: 'https://images.unsplash.com/photo-1654288891700-95f67982cbcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmF8ZW58MXx8fHwxNzY2MDU2ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Artist Spotlight: The Rising Stars',
      description: 'Meet the talented artists shaping the music scene',
      duration: '12:15',
      views: '8.2K',
      image: 'https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGJhbmQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjYwMjY0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Workshop Series: Event Management 101',
      description: 'Learn the fundamentals of planning successful events',
      duration: '25:30',
      views: '15.7K',
      image: 'https://images.unsplash.com/photo-1551677629-c3e314ecf29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMHRlYW18ZW58MXx8fHwxNzY2MDI2MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Youth Impact Stories',
      description: 'How our programs are changing lives',
      duration: '10:42',
      views: '9.8K',
      image: 'https://images.unsplash.com/photo-1760996610930-4318aab182ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGNyZWF0aXZlJTIwYXJ0aXN0fGVufDF8fHx8MTc2NjA1NjgwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Corporate Partnership Success',
      description: 'Building meaningful collaborations with businesses',
      duration: '6:55',
      views: '5.3K',
      image: 'https://images.unsplash.com/photo-1551677629-c3e314ecf29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMHRlYW18ZW58MXx8fHwxNzY2MDI2MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Live Performance: Acoustic Sessions',
      description: 'Intimate live performances from local artists',
      duration: '18:20',
      views: '11.2K',
      image: 'https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGJhbmQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjYwMjY0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Video className="w-12 h-12 text-orange-400" />
              <Mic className="w-12 h-12 text-purple-400" />
            </div>
            <h1 className="text-white text-5xl md:text-6xl">Media & Content</h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our collection of podcasts, videos, and exclusive content featuring 
              inspiring stories, educational workshops, and memorable performances.
            </p>
          </div>
        </div>
      </section>

      {/* Podcasts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white text-4xl mb-2">Podcasts</h2>
            <p className="text-gray-400">Listen to inspiring conversations and insights</p>
          </div>
          <Headphones className="w-10 h-10 text-purple-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {podcasts.map((podcast, index) => (
            <Card key={index}>
              <div className="space-y-4">
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-700 group">
                  <ImageWithFallback 
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-gray-900/80 px-3 py-1 rounded-full text-white text-sm">
                    {podcast.duration}
                  </div>
                </div>
                <div>
                  <div className="text-purple-400 text-sm mb-1">{podcast.episode}</div>
                  <h3 className="text-white text-xl mb-2">{podcast.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{podcast.description}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Play className="w-4 h-4" />
                  Listen Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline">
            View All Podcasts
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Videos Section */}
      <section className="bg-gradient-to-r from-orange-500/5 via-purple-500/5 to-blue-500/5 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-white text-4xl mb-2">Videos</h2>
              <p className="text-gray-400">Watch highlights, workshops, and performances</p>
            </div>
            <Video className="w-10 h-10 text-orange-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {videos.map((video, index) => (
              <Card key={index}>
                <div className="space-y-3">
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-gray-700 group cursor-pointer">
                    <ImageWithFallback 
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Play className="w-7 h-7 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-gray-900/80 px-2 py-1 rounded text-white text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white text-lg mb-1">{video.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{video.description}</p>
                    <div className="text-purple-400 text-xs">{video.views} views</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline">
              View All Videos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <Card hover={false} className="bg-gradient-to-br from-gray-800/80 to-gray-800/50 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-3xl">Stay Connected</h3>
            <p className="text-gray-300 text-lg">
              Subscribe to our channels to get notified about new podcasts, videos, and exclusive behind-the-scenes content.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button>Subscribe to Podcast</Button>
              <Button variant="secondary">Subscribe to Channel</Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
