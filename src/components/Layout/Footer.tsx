import React from 'react';
import { Heart, Shield, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ek-bg-main/95 border-t border-ek-text-muted/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-ek-accent-gold rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-ek-bg-main" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ek-accent-gold">Everlasting Kin</h3>
                <p className="text-sm text-ek-accent-mint">Connecting families with dignity</p>
              </div>
            </div>
            <p className="text-ek-text-muted max-w-md">
              A respectful platform dedicated to helping families find their lost loved ones, 
              supporting mortuary staff, police, and the public in their time of need.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-ek-text-main mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-ek-text-muted">
                <Phone className="w-4 h-4" />
                <span>24/7 Support Line</span>
              </div>
              <div className="flex items-center space-x-3 text-ek-text-muted">
                <Mail className="w-4 h-4" />
                <span>support@everlastingkin.org</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-ek-text-main mb-4">Resources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-ek-text-muted hover:text-ek-accent-gold transition-colors duration-200">
                Family Support
              </a>
              <a href="#" className="block text-ek-text-muted hover:text-ek-accent-gold transition-colors duration-200">
                Professional Training
              </a>
              <a href="#" className="block text-ek-text-muted hover:text-ek-accent-gold transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="block text-ek-text-muted hover:text-ek-accent-gold transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ek-text-muted/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-ek-text-muted text-sm">
            © 2024 Everlasting Kin. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-ek-text-muted text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-ek-error" />
            <span>for families in need</span>
          </div>
        </div>
      </div>
    </footer>
  );
}