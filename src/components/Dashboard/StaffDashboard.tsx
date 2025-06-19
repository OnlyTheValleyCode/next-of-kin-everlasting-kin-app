import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Eye, Calendar, MapPin, User } from 'lucide-react';
import { useDeceasedRecords } from '../../hooks/useDeceasedRecords';
import { useAuth } from '../../contexts/AuthContext';
import { DeceasedRecord } from '../../types';
import { format } from 'date-fns';

export function StaffDashboard() {
  const { userProfile } = useAuth();
  const { records, loading, searchRecords } = useDeceasedRecords();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<DeceasedRecord | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchRecords(searchQuery);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'identified':
        return 'status-identified';
      case 'unidentified':
        return 'status-unidentified';
      default:
        return 'status-pending';
    }
  };

  const stats = [
    {
      title: 'Total Cases',
      value: records.length,
      icon: FileText,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      title: 'Identified',
      value: records.filter(r => r.status === 'identified').length,
      icon: User,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      title: 'Pending',
      value: records.filter(r => r.status === 'unidentified').length,
      icon: Search,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ek-text-main mb-2">
          {userProfile?.role === 'police' ? 'Police' : 'Staff'} Dashboard
        </h1>
        <p className="text-ek-text-muted">
          Welcome back, {userProfile?.first_name}. View and search case records.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-ek-text-muted text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-ek-text-main">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-ek-text-main mb-4">Search Records</h3>
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ek-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
              placeholder="Search by name, case ID, or location..."
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Records List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-ek-text-main mb-6">Case Records</h3>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="loading-spinner mx-auto"></div>
              <p className="text-ek-text-muted mt-2">Loading records...</p>
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-ek-text-muted mx-auto mb-4" />
              <p className="text-ek-text-muted">No records found.</p>
            </div>
          ) : (
            records.map((record) => (
              <div key={record.id} className="border border-ek-text-muted/20 rounded-lg p-4 hover:bg-ek-text-muted/5 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-ek-text-main">
                          {record.name || 'Unknown'} - {record.case_id}
                        </h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-ek-text-muted">
                          {record.date_of_death && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{format(new Date(record.date_of_death), 'PP')}</span>
                            </div>
                          )}
                          {record.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{record.location}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Created: {format(new Date(record.created_at), 'PP')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`status-badge ${getStatusColor(record.status)}`}>
                          {record.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="flex items-center space-x-1 text-ek-accent-gold hover:text-ek-accent-mint transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="popup-overlay" onClick={() => setSelectedRecord(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="popup-content max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-ek-text-main">Case Details</h2>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-ek-text-muted hover:text-ek-text-main transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-ek-text-main">
                      {selectedRecord.name || 'Unknown'}
                    </h3>
                    <p className="text-ek-text-muted">Case ID: {selectedRecord.case_id}</p>
                  </div>
                  <span className={`status-badge ${getStatusColor(selectedRecord.status)}`}>
                    {selectedRecord.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-ek-text-muted mb-1">
                        Date of Death
                      </label>
                      <div className="flex items-center space-x-2 text-ek-text-main">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {selectedRecord.date_of_death
                            ? format(new Date(selectedRecord.date_of_death), 'PPP')
                            : 'Unknown'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ek-text-muted mb-1">
                        Location
                      </label>
                      <div className="flex items-center space-x-2 text-ek-text-main">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedRecord.location || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-ek-text-muted mb-1">
                        Status
                      </label>
                      <span className={`status-badge ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ek-text-muted mb-1">
                        Record Created
                      </label>
                      <span className="text-ek-text-main">
                        {format(new Date(selectedRecord.created_at), 'PPP')}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedRecord.mortuary_details && (
                  <div>
                    <label className="block text-sm font-medium text-ek-text-muted mb-2">
                      Mortuary Details
                    </label>
                    <div className="bg-ek-text-muted/5 p-4 rounded-lg">
                      <p className="text-ek-text-main">{selectedRecord.mortuary_details}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}