-- ==================== SCHEMA SETUP ====================
-- This script sets up the multi-branch gym database and adds Eagle Gym - Fustat Branch

-- ==================== CREATE TABLES ====================

-- Gyms table (parent)
CREATE TABLE IF NOT EXISTS gyms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Branches table (child of gyms)
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  address_en TEXT,
  address_ar TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gym_id, slug)
);

-- Branch data table (stores all content types)
CREATE TABLE IF NOT EXISTS branch_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL, -- 'coach', 'class', 'membership', 'pt_package', 'offer'
  title_en TEXT,
  title_ar TEXT,
  description_en TEXT,
  description_ar TEXT,
  image_url TEXT, -- Path in Supabase Storage
  price NUMERIC(10,2),
  original_price NUMERIC(10,2), -- For showing discounts
  features JSONB, -- Array of features
  schedule JSONB, -- For classes: day, time, etc.
  metadata JSONB, -- Flexible field for extra data
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_branches_gym_id ON branches(gym_id);
CREATE INDEX IF NOT EXISTS idx_branch_data_branch_id ON branch_data(branch_id);
CREATE INDEX IF NOT EXISTS idx_branch_data_type ON branch_data(data_type);
CREATE INDEX IF NOT EXISTS idx_branch_data_active ON branch_data(is_active);

-- ==================== INSERT GYMS ====================

-- Insert Eagle Gym
INSERT INTO gyms (slug, name_en, name_ar)
VALUES ('eagle-gym', 'Eagle Gym', 'إيجل جيم')
ON CONFLICT (slug) DO NOTHING;

-- Get gym_id for Eagle Gym
DO $$
DECLARE
  eagle_gym_id UUID;
  fostat_branch_id UUID;
BEGIN
  -- Get Eagle Gym ID
  SELECT id INTO eagle_gym_id FROM gyms WHERE slug = 'eagle-gym';

-- ==================== INSERT BRANCHES ====================

  -- Insert Fustat Branch
  INSERT INTO branches (gym_id, slug, name_en, name_ar, phone, whatsapp, address_en, address_ar, is_active)
  VALUES (
    eagle_gym_id,
    'fostat',
    'Fustat Branch',
    'فرع الفسطاط',
    '201507817517',
    '201507817517',
    'Fustat, Cairo, Egypt',
    'الفسطاط، القاهرة، مصر',
    true
  )
  ON CONFLICT (gym_id, slug) DO NOTHING
  RETURNING id INTO fostat_branch_id;

  -- If branch already exists, get its ID
  IF fostat_branch_id IS NULL THEN
    SELECT id INTO fostat_branch_id FROM branches WHERE gym_id = eagle_gym_id AND slug = 'fostat';
  END IF;

-- ==================== INSERT COACHES ====================

  INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, description_ar, image_url, metadata, display_order, is_active)
  VALUES
    (fostat_branch_id, 'coach', 'Mostafa', 'مصطفى', 'General Manager', 'المدير العام', 'coaches/mostafa.png', '{"specialization": "Management", "experience_years": 10}', 1, true),
    (fostat_branch_id, 'coach', 'AbdElrhman', 'عبدالرحمن', 'Fitness Manager', 'مدير اللياقة', 'coaches/abdelrhmanf.png', '{"specialization": "Fitness Management", "experience_years": 8}', 2, true),
    (fostat_branch_id, 'coach', 'Amr', 'عمرو', 'Senior Trainer', 'مدرب أول', 'coaches/amr.png', '{"specialization": "Strength Training", "experience_years": 7}', 3, true),
    (fostat_branch_id, 'coach', 'Ibrahim', 'إبراهيم', 'Personal Trainer', 'مدرب شخصي', 'coaches/ibrahim.png', '{"specialization": "Personal Training", "experience_years": 5}', 4, true),
    (fostat_branch_id, 'coach', 'Norhan', 'نورهان', 'Personal Trainer', 'مدربة شخصية', 'coaches/norhan.png', '{"specialization": "Ladies Training", "experience_years": 6}', 5, true),
    (fostat_branch_id, 'coach', 'Abdelrhman', 'عبدالرحمن', 'Personal Trainer', 'مدرب شخصي', 'coaches/abdelrhman.png', '{"specialization": "CrossFit", "experience_years": 4}', 6, true),
    (fostat_branch_id, 'coach', 'Tayson', 'تايسون', 'Personal Trainer', 'مدرب شخصي', 'coaches/tayson.png', '{"specialization": "Boxing", "experience_years": 5}', 7, true),
    (fostat_branch_id, 'coach', 'Ahmed Sedeek', 'أحمد صديق', 'Senior Trainer', 'مدرب أول', 'coaches/sdek.png', '{"specialization": "Bodybuilding", "experience_years": 9}', 8, true);

-- ==================== INSERT CLASSES ====================

  INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, description_ar, schedule, metadata, display_order, is_active)
  VALUES
    (fostat_branch_id, 'class', 'CrossFit', 'كروس فت', 'High-intensity functional training', 'تدريب وظيفي عالي الكثافة',
     '{"day": "Saturday", "day_ar": "السبت", "time": "6:00 PM", "duration": "60 min"}',
     '{"coach": "Abdelrhman", "type": "Mixed", "is_membership_included": false}', 1, true),

    (fostat_branch_id, 'class', 'Ladies Fitness', 'لياقة السيدات', 'Special fitness program for ladies', 'برنامج لياقة خاص للسيدات',
     '{"day": "Sunday", "day_ar": "الأحد", "time": "10:00 AM", "duration": "45 min"}',
     '{"coach": "Norhan", "type": "Ladies", "is_membership_included": false}', 2, true),

    (fostat_branch_id, 'class', 'Boxing', 'ملاكمة', 'Learn boxing fundamentals and techniques', 'تعلم أساسيات وتقنيات الملاكمة',
     '{"day": "Monday", "day_ar": "الإثنين", "time": "7:00 PM", "duration": "60 min"}',
     '{"coach": "Tayson", "type": "Men", "is_membership_included": true}', 3, true),

    (fostat_branch_id, 'class', 'Strength Training', 'تدريب القوة', 'Build strength and muscle mass', 'بناء القوة والكتلة العضلية',
     '{"day": "Tuesday", "day_ar": "الثلاثاء", "time": "5:00 PM", "duration": "75 min"}',
     '{"coach": "Ahmed Sedeek", "type": "Mixed", "is_membership_included": true}', 4, true),

    (fostat_branch_id, 'class', 'HIIT', 'هيت', 'High Intensity Interval Training', 'تدريب متقطع عالي الكثافة',
     '{"day": "Wednesday", "day_ar": "الأربعاء", "time": "6:30 PM", "duration": "45 min"}',
     '{"coach": "Amr", "type": "Mixed", "is_membership_included": false}', 5, true),

    (fostat_branch_id, 'class', 'Yoga', 'يوجا', 'Improve flexibility and mindfulness', 'تحسين المرونة والوعي الذهني',
     '{"day": "Thursday", "day_ar": "الخميس", "time": "9:00 AM", "duration": "60 min"}',
     '{"coach": "Norhan", "type": "Ladies", "is_membership_included": true}', 6, true);

-- ==================== INSERT MEMBERSHIPS (OFFERS) ====================

  INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, price, original_price, features, metadata, display_order, is_active)
  VALUES
    (fostat_branch_id, 'membership', '1 Month', 'شهر واحد', 'Monthly membership with basic features', 800, 1000,
     '["1 PT Session", "2 Invitations", "Access to all equipment", "Free consultation"]'::jsonb,
     '{"duration_days": 30, "freezing_days": 0, "nutrition_consultations": 0}', 1, true),

    (fostat_branch_id, 'membership', '3 Months', '3 أشهر', 'Quarterly membership with extended benefits', 1800, 2500,
     '["2 PT Sessions", "6 Invitations", "2 Weeks Freezing", "1 Nutrition Plan", "Access to all classes"]'::jsonb,
     '{"duration_days": 90, "freezing_days": 14, "nutrition_consultations": 1}', 2, true),

    (fostat_branch_id, 'membership', '6 Months', '6 أشهر', 'Semi-annual membership with premium features', 2800, 3500,
     '["3 PT Sessions", "10 Invitations", "1 Month Freezing", "2 Nutrition Plans", "Priority class booking"]'::jsonb,
     '{"duration_days": 180, "freezing_days": 30, "nutrition_consultations": 2}', 3, true),

    (fostat_branch_id, 'membership', '12 Months', '12 شهر', 'Annual membership with VIP benefits', 3500, 5000,
     '["4 PT Sessions", "12 Invitations", "2 Months Freezing", "4 Nutrition Plans", "VIP locker", "Priority support"]'::jsonb,
     '{"duration_days": 365, "freezing_days": 60, "nutrition_consultations": 4}', 4, true);

-- ==================== INSERT PT PACKAGES ====================

  INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, price, original_price, features, metadata, display_order, is_active)
  VALUES
    (fostat_branch_id, 'pt_package', '10 Sessions', '10 جلسات', 'Personal Training - 10 Sessions', 2500, NULL,
     '["Customized workout plan", "Progress tracking", "Nutrition guidance", "1-on-1 training"]'::jsonb,
     '{"sessions": 10, "validity_days": 60}', 1, true),

    (fostat_branch_id, 'pt_package', '20 Sessions', '20 جلسة', 'Personal Training - 20 Sessions', 4000, NULL,
     '["Customized workout plan", "Progress tracking", "Detailed nutrition plan", "1-on-1 training", "Body composition analysis"]'::jsonb,
     '{"sessions": 20, "validity_days": 90}', 2, true),

    (fostat_branch_id, 'pt_package', '30 Sessions', '30 جلسة', 'Personal Training - 30 Sessions', 5000, NULL,
     '["Customized workout plan", "Progress tracking", "Comprehensive nutrition plan", "1-on-1 training", "Weekly body analysis"]'::jsonb,
     '{"sessions": 30, "validity_days": 120}', 3, true),

    (fostat_branch_id, 'pt_package', '40 Sessions', '40 جلسة', 'Personal Training - 40 Sessions (Best Value)', 4500, 6000,
     '["Customized workout plan", "Progress tracking", "Premium nutrition plan", "1-on-1 training", "Bi-weekly body analysis", "Supplement guidance"]'::jsonb,
     '{"sessions": 40, "validity_days": 150}', 4, true);

-- ==================== INSERT SPECIAL OFFERS ====================

  INSERT INTO branch_data (branch_id, data_type, title_en, title_ar, description_en, price, original_price, features, metadata, display_order, is_active)
  VALUES
    (fostat_branch_id, 'offer', 'Black Friday Special', 'عرض الجمعة السوداء', 'Limited time offer - 3 months + 2 free', 2000, 2500,
     '["3 Months membership", "2 Free months", "4 PT sessions", "8 Invitations", "3 Weeks freezing", "2 Nutrition plans"]'::jsonb,
     '{"offer_type": "black_friday", "valid_until": "2025-11-29", "duration_days": 150}', 1, true),

    (fostat_branch_id, 'offer', 'New Year Transformation', 'عرض التحول للعام الجديد', 'Start your transformation journey', 3000, 4000,
     '["6 Months membership", "8 PT sessions", "Unlimited invitations", "2 Months freezing", "Full nutrition program", "Free body scan"]'::jsonb,
     '{"offer_type": "new_year", "valid_until": "2026-01-31", "duration_days": 180}', 2, true);

END $$;

-- ==================== ENABLE ROW LEVEL SECURITY (RLS) ====================

ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE branch_data ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on gyms"
  ON gyms FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on branches"
  ON branches FOR SELECT
  USING (is_active = true);

CREATE POLICY "Allow public read access on branch_data"
  ON branch_data FOR SELECT
  USING (is_active = true);

-- ==================== STORAGE SETUP ====================
-- Note: You need to create the 'gym-media' bucket in Supabase Dashboard
-- Then set it to public access for the coaches, classes folders

-- Storage policies (run these in Supabase SQL Editor after creating the bucket)
/*
-- Allow public read access to gym-media bucket
CREATE POLICY "Public read access to gym-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gym-media');

-- Allow authenticated users to upload to gym-media
CREATE POLICY "Authenticated users can upload to gym-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gym-media' AND auth.role() = 'authenticated');
*/

-- ==================== HELPFUL QUERIES ====================

-- View all data for Fustat branch
/*
SELECT
  g.name_en as gym_name,
  b.name_en as branch_name,
  bd.data_type,
  bd.title_en,
  bd.price,
  bd.original_price,
  bd.display_order
FROM branch_data bd
JOIN branches b ON bd.branch_id = b.id
JOIN gyms g ON b.gym_id = g.id
WHERE g.slug = 'eagle-gym' AND b.slug = 'fostat'
ORDER BY bd.data_type, bd.display_order;
*/

-- Count data by type for each branch
/*
SELECT
  b.name_en as branch_name,
  bd.data_type,
  COUNT(*) as count
FROM branch_data bd
JOIN branches b ON bd.branch_id = b.id
WHERE b.is_active = true AND bd.is_active = true
GROUP BY b.name_en, bd.data_type
ORDER BY b.name_en, bd.data_type;
*/
