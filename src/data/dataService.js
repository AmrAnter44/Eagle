import { supabase, getImageUrl } from '../lib/supabase';

class DataService {
  constructor() {
    // Default branch context - will be set by BranchContext
    this.currentBranchId = null;
    this.currentGymSlug = 'eagle-gym';
    this.currentBranchSlug = 'fostat';  // تم تصحيح الـ slug
  }

  // ==================== BRANCH MANAGEMENT ====================

  /**
   * Set current branch context
   * @param {string} gymSlug - Gym slug (e.g., 'eagle-gym')
   * @param {string} branchSlug - Branch slug (e.g., 'fustat')
   */
  async setBranch(gymSlug, branchSlug) {
    this.currentGymSlug = gymSlug;
    this.currentBranchSlug = branchSlug;

    // Fetch and cache branch_id
    const { data, error } = await supabase
      .from('branches')
      .select('id')
      .eq('slug', branchSlug)
      .single();

    if (error) {
      console.error('Error fetching branch:', error);
      return { data: null, error };
    }

    this.currentBranchId = data?.id;
    return { data, error: null };
  }

  /**
   * Get all available gyms
   */
  async getGyms() {
    const { data, error } = await supabase
      .from('gyms')
      .select('*')
      .order('name_en');

    return { data, error };
  }

  /**
   * Get branches for a specific gym
   * @param {string} gymSlug - Gym slug
   */
  async getBranches(gymSlug = null) {
    if (gymSlug) {
      // First get the gym by slug
      const { data: gymData, error: gymError } = await supabase
        .from('gyms')
        .select('id')
        .eq('slug', gymSlug)
        .single();

      if (gymError) {
        console.error('Error fetching gym:', gymError);
        return { data: [], error: gymError };
      }

      // Then get branches for this gym
      const { data, error } = await supabase
        .from('branches')
        .select(`
          *,
          gym:gyms(*)
        `)
        .eq('gym_id', gymData.id)
        .eq('is_active', true)
        .order('name_en');

      return { data, error };
    }

    // If no gymSlug, return all active branches
    const { data, error } = await supabase
      .from('branches')
      .select(`
        *,
        gym:gyms(*)
      `)
      .eq('is_active', true)
      .order('name_en');

    return { data, error };
  }

  /**
   * Ensure branch context is set
   */
  async ensureBranchContext() {
    if (!this.currentBranchId) {
      await this.setBranch(this.currentGymSlug, this.currentBranchSlug);
    }
    return this.currentBranchId;
  }

  // ==================== DATA FETCHING ====================

  /**
   * Generic method to fetch branch data by type
   * @param {string} dataType - Type of data ('coach', 'class', 'membership', 'pt_package', 'offer')
   * @param {object} options - Additional query options
   */
  async getBranchData(dataType, options = {}) {
    await this.ensureBranchContext();

    if (!this.currentBranchId) {
      return { data: [], error: new Error('No branch selected') };
    }

    let query = supabase
      .from('branch_data')
      .select('*')
      .eq('branch_id', this.currentBranchId)
      .eq('data_type', dataType)
      .eq('is_active', true);

    // Apply additional filters
    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending !== false });
    } else {
      query = query.order('display_order', { ascending: true });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching ${dataType}:`, error);
      return { data: [], error };
    }

    return { data, error: null };
  }

  // ==================== MEMBERSHIPS (OFFERS) ====================

  async getOffers() {
    const { data, error } = await this.getBranchData('membership');

    if (error) return { data: [], error };

    // Transform to match old format
    const transformed = data.map(item => ({
      id: item.id,
      duration: item.title_en,
      // price = السعر القديم (قبل الخصم) - هيظهر مشطوب
      price: item.original_price?.toString() || item.price?.toString() || '0',
      // price_new = السعر الجديد (بعد الخصم) - هيظهر بالأحمر
      price_new: item.original_price && item.original_price > item.price
        ? item.price?.toString()  // في حالة في خصم
        : '0',  // لو مافيش خصم
      private: this.extractPTSessions(item.features),  // عدد جلسات الـ PT
      invite: this.extractInvitations(item.features),
      freezing: this.extractFreezing(item.features),
      nutrition: this.extractNutrition(item.features) || item.metadata?.nutrition_consultations?.toString() || '0',  // عدد استشارات التغذية
      // Additional fields for compatibility
      title_en: item.title_en,
      title_ar: item.title_ar,
      description_en: item.description_en,
      description_ar: item.description_ar,
      features: item.features,
      metadata: item.metadata
    }));

    return { data: transformed, error: null };
  }

  // ==================== PT PACKAGES ====================

  async getPtPackages() {
    const { data, error } = await this.getBranchData('pt_package');

    if (error) return { data: [], error };

    // Transform to match old format
    const transformed = data.map(item => ({
      id: item.id,
      sessions: item.metadata?.sessions || 0,
      price: item.price?.toString() || '0',
      price_discount: item.original_price && item.original_price > item.price
        ? item.price?.toString()
        : '0',
      // Additional fields for compatibility
      title_en: item.title_en,
      title_ar: item.title_ar,
      description_en: item.description_en,
      description_ar: item.description_ar,
      features: item.features,
      metadata: item.metadata
    }));

    return { data: transformed, error: null };
  }

  // ==================== COACHES ====================

  async getCoaches() {
    const { data, error } = await this.getBranchData('coach');

    if (error) return { data: [], error };

    // Transform to match old format with image URLs
    const transformed = data.map(item => ({
      id: item.id,
      name: item.title_en,
      name_ar: item.title_ar,
      img: getImageUrl(item.image_url),
      title: item.description_en,
      title_ar: item.description_ar,
      // Additional fields
      specialization: item.metadata?.specialization,
      experience_years: item.metadata?.experience_years
    }));

    return { data: transformed, error: null };
  }

  // ==================== CLASSES ====================

  async getClasses() {
    const { data, error } = await this.getBranchData('class');

    if (error) return { data: [], error };

    // Transform to match old format
    const transformed = data.map(item => ({
      id: item.id,
      classname: item.title_en,
      classname_ar: item.title_ar,
      day: item.schedule?.day || '',
      day_ar: item.schedule?.day_ar || '',
      time1: item.schedule?.time || '',
      duration: item.schedule?.duration || '',
      coachname: item.metadata?.coach || '',
      mix: item.metadata?.type || 'Mixed', // 'Ladies', 'Men', 'Mixed'
      mem: !item.metadata?.is_membership_included, // true if out of membership
      // Additional fields
      description_en: item.description_en,
      description_ar: item.description_ar,
      schedule: item.schedule,
      metadata: item.metadata
    }));

    return { data: transformed, error: null };
  }

  // ==================== SPECIAL OFFERS ====================

  async getSpecialOffers(offerType = null) {
    const options = offerType ? {
      filter: { 'metadata->offer_type': offerType }
    } : {};

    const { data, error } = await this.getBranchData('offer', options);

    if (error) return { data: [], error };

    // Transform with all details
    const transformed = data.map(item => ({
      id: item.id,
      title_en: item.title_en,
      title_ar: item.title_ar,
      description_en: item.description_en,
      description_ar: item.description_ar,
      price: item.price,
      original_price: item.original_price,
      features: item.features,
      offer_type: item.metadata?.offer_type,
      valid_until: item.metadata?.valid_until,
      duration_days: item.metadata?.duration_days,
      display_order: item.display_order
    }));

    return { data: transformed, error: null };
  }

  // ==================== HELPER METHODS ====================

  /**
   * Extract invitations count from features array
   */
  extractInvitations(features) {
    if (!features || !Array.isArray(features)) return '0';

    const inviteFeature = features.find(f => {
      const lower = f.toLowerCase();
      return lower.includes('invitation') ||
             lower.includes('invite') ||
             lower.includes('guest');
    });

    if (!inviteFeature) return '0';

    const match = inviteFeature.match(/(\d+)/);
    return match ? match[1] : '0';
  }

  /**
   * Extract freezing period from features array
   */
  extractFreezing(features) {
    if (!features || !Array.isArray(features)) return '';

    const freezingFeature = features.find(f =>
      f.toLowerCase().includes('freezing')
    );

    if (!freezingFeature) return '';

    // Extract the freezing period (e.g., "2 Weeks", "1 Month")
    const match = freezingFeature.match(/(\d+\s+(?:Week|Month)s?)/i);
    return match ? match[1] : '';
  }

  /**
   * Extract PT sessions count from features array
   */
  extractPTSessions(features) {
    if (!features || !Array.isArray(features)) return '0';

    const ptFeature = features.find(f =>
      f.toLowerCase().includes('pt session') ||
      f.toLowerCase().includes('pt sessions') ||
      f.toLowerCase().includes('personal training')
    );

    if (!ptFeature) return '0';

    const match = ptFeature.match(/(\d+)/);
    return match ? match[1] : '0';
  }

  /**
   * Extract nutrition consultations count from features array
   */
  extractNutrition(features) {
    if (!features || !Array.isArray(features)) return '0';

    const nutritionFeature = features.find(f =>
      f.toLowerCase().includes('nutrition') ||
      f.toLowerCase().includes('diet') ||
      f.toLowerCase().includes('meal plan')
    );

    if (!nutritionFeature) return '0';

    const match = nutritionFeature.match(/(\d+)/);
    return match ? match[1] : '0';
  }
}

// إنشاء instance واحد فقط
export const dataService = new DataService();
