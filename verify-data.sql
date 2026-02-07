-- تحقق من البيانات الموجودة لفرع الفسطاط

-- 1. شوف الفروع الموجودة
SELECT
  b.id,
  b.slug,
  b.name_en,
  b.name_ar,
  b.phone,
  b.is_active,
  g.name_en as gym_name
FROM branches b
JOIN gyms g ON b.gym_id = g.id
WHERE g.slug = 'eagle-gym';

-- 2. احسب عدد البيانات لكل نوع في فرع الفسطاط
SELECT
  bd.data_type,
  COUNT(*) as count
FROM branch_data bd
JOIN branches b ON bd.branch_id = b.id
WHERE b.slug = 'fostat' AND bd.is_active = true
GROUP BY bd.data_type
ORDER BY bd.data_type;

-- 3. شوف الكوتشيز في فرع الفسطاط
SELECT
  title_en as name,
  description_en as title,
  image_url,
  display_order
FROM branch_data bd
JOIN branches b ON bd.branch_id = b.id
WHERE b.slug = 'fostat'
  AND bd.data_type = 'coach'
  AND bd.is_active = true
ORDER BY bd.display_order;

-- 4. شوف الكلاسات في فرع الفسطاط
SELECT
  title_en as class_name,
  schedule->>'day' as day,
  schedule->>'time' as time,
  metadata->>'coach' as coach,
  metadata->>'type' as type
FROM branch_data bd
JOIN branches b ON bd.branch_id = b.id
WHERE b.slug = 'fostat'
  AND bd.data_type = 'class'
  AND bd.is_active = true
ORDER BY bd.display_order;

-- 5. شوف العضويات (Memberships)
SELECT
  title_en,
  price,
  original_price,
  jsonb_array_length(features) as features_count
FROM branch_data bd
JOIN branches b ON bd.branch_id = b.id
WHERE b.slug = 'fostat'
  AND bd.data_type = 'membership'
  AND bd.is_active = true
ORDER BY bd.display_order;
