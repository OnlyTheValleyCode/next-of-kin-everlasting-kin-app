import React from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Shield, Phone } from 'lucide-react';

export function PublicDashboard() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-ek-text-main mb-4">
            Welcome to Everlasting Kin
          </h1>
          <p className="text-xl text-ek-text-muted max-w-2xl mx-auto">
            A respectful platform dedicated to helping families find their lost loved ones
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="card text-center">
            <div className="w-16 h-16 bg-ek-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-ek-accent-gold" />
            </div>
            <h3 className="text-lg font-semibold text-ek-text-main mb-2">Search Database</h3>
            <p className="text-ek-text-muted">
              Search our comprehensive database to find information about lost loved ones
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-ek-accent-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-ek-accent-mint" />
            </div>
            <h3 className="text-lg font-semibold text-ek-text-main mb-2">Family Support</h3>
            <p className="text-ek-text-muted">
              Access resources and support services for families during difficult times
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-ek-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-ek-success" />
            </div>
            <h3 className="text-lg font-semibold text-ek-text-main mb-2">Secure & Private</h3>
            <p className="text-ek-text-muted">
              Your privacy and security are our top priorities in this sensitive process
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card bg-ek-accent-gold/10 border-ek-accent-gold/20"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Phone className="w-6 h-6 text-ek-accent-gold" />
            <h3 className="text-lg font-semibold text-ek-text-main">24/7 Support Available</h3>
          </div>
          <p className="text-ek-text-muted mb-4">
            If you need immediate assistance or have found information about a loved one, 
            please contact our support team immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Contact Support
            </button>
            <button className="btn-secondary">
              Emergency Services
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-ek-text-main mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-ek-accent-gold rounded-full flex items-center justify-center mx-auto mb-4 text-ek-bg-main font-bold text-lg">
              1
            </div>
            <h4 className="font-semibold text-ek-text-main mb-2">Search</h4>
            <p className="text-ek-text-muted text-sm">
              Use our search function to look for information about your loved one
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-ek-accent-gold rounded-full flex items-center justify-center mx-auto mb-4 text-ek-bg-main font-bold text-lg">
              2
            </div>
            <h4 className="font-semibold text-ek-text-main mb-2">Review</h4>
            <p className="text-ek-text-muted text-sm">
              Carefully review any matches found in our database
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-ek-accent-gold rounded-full flex items-center justify-center mx-auto mb-4 text-ek-bg-main font-bold text-lg">
              3
            </div>
            <h4 className="font-semibold text-ek-text-main mb-2">Contact</h4>
            <p className="text-ek-text-muted text-sm">
              Contact authorities immediately if you find a potential match
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}