import React from 'react';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-purple-500/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white">Logic Spark Entertainment</div>
              <div className="text-gray-400 text-sm">Empowering Youth Through Creativity</div>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Logic Spark Entertainment. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
