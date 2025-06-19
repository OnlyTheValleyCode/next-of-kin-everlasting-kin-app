import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { StaffDashboard } from './StaffDashboard';
import { PublicDashboard } from './PublicDashboard';

export function Dashboard() {
  const { user, userProfile } = useAuth();

  if (!user || !userProfile) {
    return null;
  }

  switch (userProfile.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'mortuary_staff':
    case 'police':
      return <StaffDashboard />;
    case 'public_user':
      return <PublicDashboard />;
    default:
      return null;
  }
}