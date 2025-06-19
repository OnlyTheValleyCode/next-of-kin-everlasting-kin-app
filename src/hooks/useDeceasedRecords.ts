import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DeceasedRecord } from '../types';

export function useDeceasedRecords() {
  const [records, setRecords] = useState<DeceasedRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deceased_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const searchRecords = async (query: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deceased_records')
        .select('*')
        .or(`name.ilike.%${query}%,case_id.ilike.%${query}%,location.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createRecord = async (record: Omit<DeceasedRecord, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('deceased_records')
        .insert([record])
        .select()
        .single();

      if (error) throw error;
      await fetchRecords(); // Refresh the list
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create record');
    }
  };

  const updateRecord = async (id: string, updates: Partial<DeceasedRecord>) => {
    try {
      const { data, error } = await supabase
        .from('deceased_records')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchRecords(); // Refresh the list
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update record');
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const { error } = await supabase
        .from('deceased_records')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchRecords(); // Refresh the list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete record');
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return {
    records,
    loading,
    error,
    fetchRecords,
    searchRecords,
    createRecord,
    updateRecord,
    deleteRecord,
  };
}