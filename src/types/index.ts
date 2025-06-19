export type UserRole = 'public_user' | 'mortuary_staff' | 'police' | 'admin';

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  approval_status: 'approved' | 'pending' | 'rejected';
  approved_by?: string;
  approved_at?: string;
  created_at: string;
}

export interface DeceasedRecord {
  id: string;
  case_id: string;
  name?: string;
  date_of_death?: string;
  location?: string;
  fingerprint_hash?: string;
  photo_url?: string;
  mortuary_details?: string;
  status: 'identified' | 'unidentified' | 'pending_identification';
  created_by?: string;
  created_at: string;
}

export interface PoliceReport {
  id: string;
  case_id: string;
  fingerprint_match_status?: string;
  officer_notes?: string;
  updated_by?: string;
  updated_at: string;
}

export interface NextOfKin {
  id: string;
  deceased_id: string;
  name?: string;
  relationship?: string;
  contact?: string;
  notification_status: 'pending' | 'notified' | 'contacted';
  notified_at?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  table_name: string;
  record_id?: string;
  details?: any;
  created_at: string;
}

export interface AdminRequest {
  id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  reviewed_by?: string;
  reviewed_at?: string;
  user?: User;
}

export interface NotificationLog {
  id: string;
  user_id?: string;
  email?: string;
  notification_type: string;
  subject?: string;
  content?: string;
  sent_at: string;
  status: 'sent' | 'failed' | 'pending';
}

export interface OTPVerification {
  id: string;
  email: string;
  otp_code: string;
  expires_at: string;
  verified: boolean;
  created_at: string;
}