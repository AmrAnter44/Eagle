// الحل: نقرأ من JSON مباشرة من public folder
class DataService {
  constructor() {
    // الملف موجود في public/data/data.json
    // Vercel هيقدر يوصله من /data/data.json
    this.dataUrl = '/data/data.json';
  }

  async loadData() {
    try {
      // fetch يقرأ الملف مباشرة من public folder
      const response = await fetch(this.dataUrl + '?t=' + Date.now());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading data:', error);
      // في حالة الخطأ، نرجع بيانات افتراضية
      return this.getDefaultData();
    }
  }

  getDefaultData() {
    return {
      offers: [],
      pt_packages: [],
      coaches: [],
      classes: []
    };
  }

  // ==================== OFFERS ====================
  async getOffers() {
    const data = await this.loadData();
    return {
      data: data.offers || [],
      error: null
    };
  }

  // ==================== PT PACKAGES ====================
  async getPtPackages() {
    const data = await this.loadData();
    return {
      data: data.pt_packages || [],
      error: null
    };
  }

  // ==================== COACHES ====================
  async getCoaches() {
    const data = await this.loadData();
    return {
      data: data.coaches || [],
      error: null
    };
  }

  // ==================== CLASSES ====================
  async getClasses() {
    const data = await this.loadData();
    return {
      data: data.classes || [],
      error: null
    };
  }
}

// إنشاء instance واحد فقط
export const dataService = new DataService();
