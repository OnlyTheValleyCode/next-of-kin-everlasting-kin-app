import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Shield, AlertTriangle, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { useDeceasedRecords } from '../../hooks/useDeceasedRecords';
import { useAdminRequests } from '../../hooks/useAdminRequests';
import { useAuth } from '../../contexts/AuthContext';
import { DeceasedRecord } from '../../types';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

export function AdminDashboard() {
  const { userProfile } = useAuth();
  const { records, loading: recordsLoading, createRecord, updateRecord, deleteRecord } = useDeceasedRecords();
  const { requests, loading: requestsLoading, approveRequest, rejectRequest } = useAdminRequests();
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'requests' | 'users'>('overview');
  const [editingRecord, setEditingRecord] = useState<DeceasedRecord | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleApproveRequest = async (requestId: string) => {
    try {
      await approveRequest(requestId, userProfile!.id);
      toast.success('Request approved successfully');
    } catch (error) {
      toast.error('Failed to approve request');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectRequest(requestId, userProfile!.id);
      toast.success('Request rejected');
    } catch (error) {
      toast.error('Failed to reject request');
    }
  };

  const stats = [
    {
      title: 'Total Records',
      value: records.length,
      icon: FileText,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      title: 'Pending Requests',
      value: requests.filter(r => r.status === 'pending').length,
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
    },
    {
      title: 'Identified Cases',
      value: records.filter(r => r.status === 'identified').length,
      icon: Check,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      title: 'Active Users',
      value: '24', // This would come from a users query
      icon: Users,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'requests', label: 'Requests', icon: AlertTriangle },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ek-text-main mb-2">Admin Dashboard</h1>
        <p className="text-ek-text-muted">Manage records, users, and system settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      {/* Tabs */}
      <div className="border-b border-ek-text-muted/20 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-ek-accent-gold text-ek-accent-gold'
                  : 'border-transparent text-ek-text-muted hover:text-ek-text-main hover:border-ek-text-muted/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-ek-text-main mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {records.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-ek-text-main font-medium">
                        {record.name || 'Unknown'} - {record.case_id}
                      </p>
                      <p className="text-sm text-ek-text-muted">
                        {format(new Date(record.created_at), 'PPp')}
                      </p>
                    </div>
                    <span className={`status-badge status-${record.status.replace('_', '-')}`}>
                      {record.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-ek-text-main mb-4">Pending Requests</h3>
              <div className="space-y-3">
                {requests.filter(r => r.status === 'pending').slice(0, 5).map((request) => (
                  <div key={request.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-ek-text-main font-medium">
                        {request.user?.first_name} {request.user?.last_name}
                      </p>
                      <p className="text-sm text-ek-text-muted capitalize">
                        {request.user?.role?.replace('_', ' ')} access request
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApproveRequest(request.id)}
                        className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-ek-text-main">Deceased Records</h3>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Record</span>
              </button>
            </div>

            <div className="space-y-4">
              {recordsLoading ? (
                <div className="text-center py-8">
                  <div className="loading-spinner mx-auto"></div>
                  <p className="text-ek-text-muted mt-2">Loading records...</p>
                </div>
              ) : (
                records.map((record) => (
                  <div key={record.id} className="card">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-ek-text-main">
                          {record.name || 'Unknown'} - {record.case_id}
                        </h4>
                        <p className="text-sm text-ek-text-muted">
                          {record.location} • {format(new Date(record.created_at), 'PP')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`status-badge status-${record.status.replace('_', '-')}`}>
                          {record.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <button
                          onClick={() => setEditingRecord(record)}
                          className="p-2 text-ek-accent-gold hover:text-ek-accent-mint transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="p-2 text-ek-error hover:text-red-400 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            <h3 className="text-lg font-semibold text-ek-text-main mb-6">Access Requests</h3>
            <div className="space-y-4">
              {requestsLoading ? (
                <div className="text-center py-8">
                  <div className="loading-spinner mx-auto"></div>
                  <p className="text-ek-text-muted mt-2">Loading requests...</p>
                </div>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="card">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-ek-text-main">
                          {request.user?.first_name} {request.user?.last_name}
                        </h4>
                        <p className="text-sm text-ek-text-muted">
                          {request.user?.email} • {request.user?.role?.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-ek-text-muted">
                          Requested: {format(new Date(request.requested_at), 'PPp')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`status-badge status-${request.status}`}>
                          {request.status.toUpperCase()}
                        </span>
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveRequest(request.id)}
                              className="btn-primary text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request.id)}
                              className="btn-danger text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h3 className="text-lg font-semibold text-ek-text-main mb-6">User Management</h3>
            <div className="card">
              <p className="text-ek-text-muted">User management features coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}