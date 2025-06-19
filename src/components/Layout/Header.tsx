import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, UserCheck, Search, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onOpenPopup: (popup: 'login' | 'signup' | 'search') => void;
}

export function Header({ onOpenPopup }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="relative bg-ek-bg-main/95 backdrop-blur-sm border-b border-ek-text-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="w-10 h-10 bg-ek-accent-gold rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-ek-bg-main" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-ek-accent-gold">Everlasting</h1>
                <p className="text-sm text-ek-accent-mint -mt-1">Kin</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => onOpenPopup('search')}
                className="flex items-center space-x-2 text-ek-text-main hover:text-ek-accent-gold transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
              
              {!user ? (
                <>
                  <button
                    onClick={() => onOpenPopup('login')}
                    className="text-ek-text-main hover:text-ek-accent-gold transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onOpenPopup('signup')}
                    className="btn-primary"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-ek-text-main">
                      {userProfile?.first_name} {userProfile?.last_name}
                    </p>
                    <p className="text-xs text-ek-text-muted capitalize">
                      {userProfile?.role?.replace('_', ' ')}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-ek-text-muted hover:text-ek-error transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-ek-text-main hover:text-ek-accent-gold transition-colors duration-200"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ek-bg-main border-t border-ek-text-muted/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  onOpenPopup('search');
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left px-3 py-2 text-ek-text-main hover:text-ek-accent-gold transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
              
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      onOpenPopup('login');
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-ek-text-main hover:text-ek-accent-gold transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onOpenPopup('signup');
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-ek-text-main hover:text-ek-accent-gold transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <div className="text-ek-text-main">
                    <p className="font-medium">
                      {userProfile?.first_name} {userProfile?.last_name}
                    </p>
                    <p className="text-sm text-ek-text-muted capitalize">
                      {userProfile?.role?.replace('_', ' ')}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-ek-error hover:text-red-400 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}