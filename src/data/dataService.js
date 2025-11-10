// الحل: نقرأ من JSON مباشرة بدون cache
class DataService {
  constructor() {
    // نحمل البيانات كل مرة من fetch
    this.dataUrl = '/src/data/data.json';
  }

  async loadData() {
    try {
      // fetch يقرأ الملف مباشرة بدون cache
      const response = await fetch(this.dataUrl + '?t=' + Date.now());
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
