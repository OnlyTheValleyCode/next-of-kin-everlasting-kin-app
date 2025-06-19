import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Filter, Calendar, MapPin, User, Eye } from 'lucide-react';
import { useDeceasedRecords } from '../../hooks/useDeceasedRecords';
import { DeceasedRecord } from '../../types';
import { format } from 'date-fns';

interface SearchPopupProps {
  onClose: () => void;
}

export function SearchPopup({ onClose }: SearchPopupProps) {
  const [query, setQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<DeceasedRecord | null>(null);
  const { records, loading, searchRecords } = useDeceasedRecords();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await searchRecords(query);
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

  if (selectedRecord) {
    return (
      <div className="popup-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="popup-content max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-ek-text-main">Record Details</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-ek-text-muted hover:text-ek-text-main transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  onClick={onClose}
                  className="text-ek-text-muted hover:text-ek-text-main transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
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

              {selectedRecord.photo_url && (
                <div className="flex justify-center">
                  <img
                    src={selectedRecord.photo_url}
                    alt="Deceased person"
                    className="w-48 h-48 object-cover rounded-lg border border-ek-text-muted/20"
                  />
                </div>
              )}

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

              <div className="bg-ek-accent-gold/10 border border-ek-accent-gold/20 p-4 rounded-lg">
                <p className="text-ek-text-main text-sm">
                  <strong>Important:</strong> If you believe this record matches someone you know, 
                  please contact the authorities immediately. Do not attempt to handle this situation alone.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="popup-content max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-ek-text-main">Search Database</h2>
            <button
              onClick={onClose}
              className="text-ek-text-muted hover:text-ek-text-main transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ek-text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Search by name, case ID, or location..."
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {records.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-ek-text-muted mx-auto mb-4" />
                <p className="text-ek-text-muted">
                  {query ? 'No records found matching your search.' : 'Enter a search term to begin.'}
                </p>
              </div>
            ) : (
              records.map((record) => (
                <div key={record.id} className="card hover:bg-ek-text-muted/10 cursor-pointer transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-ek-text-main">
                            {record.name || 'Unknown'}
                          </h3>
                          <p className="text-sm text-ek-text-muted">Case ID: {record.case_id}</p>
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
      </motion.div>
    </div>
  );
}