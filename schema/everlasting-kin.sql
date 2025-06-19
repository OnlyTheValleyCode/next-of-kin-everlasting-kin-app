-- User Roles
CREATE TYPE user_role AS ENUM ('public_user', 'mortuary_staff', 'police', 'admin');

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role user_role DEFAULT 'public_user',
  approval_status TEXT DEFAULT 'approved', -- 'approved', 'pending', 'rejected'
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- OTP Verification
CREATE TABLE otp_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deceased Records
CREATE TABLE deceased_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id TEXT UNIQUE NOT NULL,
  name TEXT,
  date_of_death DATE,
  location TEXT,
  fingerprint_hash TEXT,
  photo_url TEXT,
  mortuary_details TEXT,
  status TEXT DEFAULT 'unidentified',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Police Reports
CREATE TABLE police_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id TEXT REFERENCES deceased_records(case_id),
  fingerprint_match_status TEXT,
  officer_notes TEXT,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Next of Kin
CREATE TABLE next_of_kin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deceased_id UUID REFERENCES deceased_records(id),
  name TEXT,
  relationship TEXT,
  contact TEXT,
  notification_status TEXT DEFAULT 'pending',
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT,
  table_name TEXT,
  record_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Requests
CREATE TABLE admin_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ
);

-- Notification Logs
CREATE TABLE notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  email TEXT,
  notification_type TEXT,
  subject TEXT,
  content TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'sent'
);

-- RLS Policies (examples, tailor as needed)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE deceased_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE police_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_of_kin ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Users: only admins can edit, all can read own or approved public data
CREATE POLICY "Users view" ON users
  FOR SELECT USING (role = 'admin' OR auth.uid() = id);

CREATE POLICY "Users update" ON users
  FOR UPDATE USING (role = 'admin');

-- Deceased Records: all roles can read, only admin can edit
CREATE POLICY "Deceased read" ON deceased_records
  FOR SELECT USING (true);

CREATE POLICY "Deceased edit" ON deceased_records
  FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- Similar policies for police_reports, next_of_kin, audit_logs, admin_requests, notification_logs...

-- Add triggers/functions for OTP, audit, notification logging as described in previous answers.