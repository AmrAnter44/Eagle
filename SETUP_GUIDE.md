# Multi-Branch Gym System Setup Guide

This guide will help you set up the Eagle Gym - Fustat Branch in your Supabase database and get the multi-branch system running.

## 📋 Overview

Your gym website now supports multiple branches with:
- **Branch-specific data**: Each branch has its own coaches, classes, memberships, PT packages, and offers
- **Branch selector**: Users can switch between branches from the navigation bar
- **Supabase integration**: All data is stored in Supabase with proper relationships
- **Supabase Storage**: Images are stored in Supabase Storage bucket

## 🗄️ Database Setup

### Step 1: Run the SQL Script

1. Go to your Supabase project: https://wotcgehfqxucsgpbmulz.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql`
5. Paste into the SQL editor
6. Click **Run** (or press Ctrl+Enter)

This script will:
- ✅ Create the `gyms`, `branches`, and `branch_data` tables (if they don't exist)
- ✅ Add Eagle Gym and Fustat Branch
- ✅ Insert sample data for coaches, classes, memberships, PT packages, and offers
- ✅ Set up Row Level Security (RLS) policies
- ✅ Create indexes for better performance

### Step 2: Set Up Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Create a bucket named `gym-media` (if it doesn't exist)
3. Make it **public** for read access
4. Upload your coach images to `gym-media/coaches/` folder

Example structure:
```
gym-media/
├── coaches/
│   ├── mostafa.png
│   ├── abdelrhmanf.png
│   ├── amr.png
│   ├── ibrahim.png
│   ├── norhan.png
│   ├── abdelrhman.png
│   ├── tayson.png
│   └── sdek.png
```

### Step 3: Verify Database Setup

Run this query to verify your data:

```sql
SELECT
  g.name_en as gym_name,
  b.name_en as branch_name,
  bd.data_type,
  bd.title_en,
  bd.price,
  bd.display_order
FROM branch_data bd
JOIN branches b ON bd.branch_id = b.id
JOIN gyms g ON b.gym_id = g.id
WHERE g.slug = 'eagle-gym' AND b.slug = 'fostat'
ORDER BY bd.data_type, bd.display_order;
```

You should see:
- 8 coaches
- 6 classes
- 4 memberships
- 4 PT packages
- 2 special offers

## 🚀 Frontend Setup

### What's Been Updated

The following files have been modified to support multi-branch functionality:

1. **src/lib/supabase.js** (NEW)
   - Supabase client initialization
   - Image URL helper function

2. **src/context/BranchContext.jsx** (NEW)
   - Branch state management
   - Branch switching logic

3. **src/comp/BranchSelector.jsx** (NEW)
   - Dropdown component for branch selection

4. **src/data/dataService.js** (UPDATED)
   - Now fetches data from Supabase instead of JSON
   - Filters data by selected branch
   - Transforms Supabase data to match existing format

5. **src/main.jsx** (UPDATED)
   - Wrapped with BranchProvider

6. **src/Nav.jsx** (UPDATED)
   - Added BranchSelector to navigation

7. **Component Updates**:
   - **src/comp/Home.jsx** - Reloads data on branch change
   - **src/comp/Coaches.jsx** - Filters coaches by branch
   - **src/comp/Classes.jsx** - Filters classes by branch
   - **src/comp/BlackFridayOffer.jsx** - Shows branch-specific offers

### Testing Locally

1. Make sure your `.env` file has the correct credentials:
```env
VITE_SUPABASE_URL='https://wotcgehfqxucsgpbmulz.supabase.co'
VITE_SUPABASE_ANON_KEY='your-anon-key-here'
```

2. Install dependencies (if needed):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and test:
   - The branch selector should appear in the navigation
   - You should see "Fustat Branch" selected by default
   - All data (coaches, classes, memberships) should load from Supabase

## 📊 Data Structure

### Gyms Table
```
- id (UUID, Primary Key)
- slug (TEXT, Unique) - e.g., "eagle-gym"
- name_en (TEXT) - e.g., "Eagle Gym"
- name_ar (TEXT) - e.g., "إيجل جيم"
```

### Branches Table
```
- id (UUID, Primary Key)
- gym_id (UUID, Foreign Key to gyms)
- slug (TEXT) - e.g., "fostat"
- name_en (TEXT) - e.g., "Fustat Branch"
- name_ar (TEXT) - e.g., "فرع الفسطاط"
- phone (TEXT)
- whatsapp (TEXT)
- address_en (TEXT)
- address_ar (TEXT)
- is_active (BOOLEAN)
```

### Branch Data Table
```
- id (UUID, Primary Key)
- branch_id (UUID, Foreign Key to branches)
- data_type (TEXT) - 'coach', 'class', 'membership', 'pt_package', 'offer'
- title_en (TEXT)
- title_ar (TEXT)
- description_en (TEXT)
- description_ar (TEXT)
- image_url (TEXT) - Path in Supabase Storage
- price (NUMERIC)
- original_price (NUMERIC) - For showing discounts
- features (JSONB) - Array of features
- schedule (JSONB) - For classes: day, time, etc.
- metadata (JSONB) - Flexible field for extra data
- display_order (INTEGER)
- is_active (BOOLEAN)
```

## 🔄 Adding More Branches

To add another branch (e.g., "Maadi Branch"):

1. Run this SQL:
```sql
DO $$
DECLARE
  eagle_gym_id UUID;
  maadi_branch_id UUID;
BEGIN
  SELECT id INTO eagle_gym_id FROM gyms WHERE slug = 'eagle-gym';

  INSERT INTO branches (gym_id, slug, name_en, name_ar, phone, whatsapp, address_en, address_ar, is_active)
  VALUES (
    eagle_gym_id,
    'maadi',
    'Maadi Branch',
    'فرع المعادي',
    '201234567890',
    '201234567890',
    'Maadi, Cairo, Egypt',
    'المعادي، القاهرة، مصر',
    true
  )
  RETURNING id INTO maadi_branch_id;

  -- Add coaches, classes, etc. for this branch
  -- (Similar to the Fustat branch inserts)
END $$;
```

2. The branch will automatically appear in the BranchSelector dropdown

## 🎨 Key Patterns Maintained

### Price Display Logic
- If `original_price > price`: Show both with discount styling
- If no `original_price` or `original_price <= price`: Show only `price`

### Image URLs
- Images are stored in Supabase Storage bucket `gym-media`
- The `getImageUrl()` helper function automatically generates public URLs
- Example: `coaches/mostafa.png` → Full Supabase Storage URL

### Features Array
- Stored as JSONB array: `["Feature 1", "Feature 2", "Feature 3"]`
- Displayed with checkmark icons in components

### Data Transformation
- Supabase data is transformed to match the old JSON format
- This ensures existing components work without major changes

## 🔧 Troubleshooting

### Issue: No data showing
**Solution**:
1. Check if the SQL script ran successfully
2. Verify RLS policies are set up (check the SQL script)
3. Make sure images are uploaded to Supabase Storage

### Issue: Branch selector not appearing
**Solution**:
1. Verify BranchProvider is wrapping the App in `main.jsx`
2. Check that branches are being fetched from Supabase

### Issue: Images not loading
**Solution**:
1. Verify the `gym-media` bucket exists and is public
2. Check that image paths in the database match the uploaded files
3. Ensure `VITE_SUPABASE_URL` is correct in `.env`

## 📝 Notes

- The old `public/data/data.json` file is no longer used but kept for reference
- All data now comes from Supabase database
- Each branch can have completely different data
- You can add new data types by simply using a new `data_type` value in `branch_data` table

## 🎯 Next Steps

1. **Run the SQL script** to set up the database
2. **Upload coach images** to Supabase Storage
3. **Test locally** to verify everything works
4. **Deploy to Vercel** (your existing deployment should work automatically)
5. **Add more branches** as needed

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the Supabase logs in Dashboard → Logs
3. Verify your `.env` variables are correct
4. Make sure RLS policies are properly set up

---

**Happy Training! 🏋️‍♂️**
