import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AdminRequest } from '../types';

export function useAdminRequests() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_requests')
        .select(`
          *,
          user:users(*)
        `)
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (requestId: string, reviewerId: string) => {
    try {
      const { error } = await supabase
        .from('admin_requests')
        .update({
          status: 'approved',
          reviewed_by: reviewerId,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (error) throw error;
      await fetchRequests();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to approve request');
    }
  };

  const rejectRequest = async (requestId: string, reviewerId: string) => {
    try {
      const { error } = await supabase
        .from('admin_requests')
        .update({
          status: 'rejected',
          reviewed_by: reviewerId,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (error) throw error;
      await fetchRequests();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to reject request');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    fetchRequests,
    approveRequest,
    rejectRequest,
  };
}