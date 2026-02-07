import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '../data/dataService';

const BranchContext = createContext();

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};

export const BranchProvider = ({ children }) => {
  const [gyms, setGyms] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedGym, setSelectedGym] = useState('eagle-gym');
  const [selectedBranch, setSelectedBranch] = useState('fostat');  // تم تصحيح الـ slug
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load gyms on mount
  useEffect(() => {
    loadGyms();
  }, []);

  // Load branches when gym changes
  useEffect(() => {
    if (selectedGym) {
      loadBranches(selectedGym);
    }
  }, [selectedGym]);

  // Update dataService when branch changes
  useEffect(() => {
    if (selectedGym && selectedBranch) {
      dataService.setBranch(selectedGym, selectedBranch);
    }
  }, [selectedGym, selectedBranch]);

  const loadGyms = async () => {
    setLoading(true);
    const { data, error } = await dataService.getGyms();

    if (error) {
      console.error('Error loading gyms:', error);
      setError(error);
    } else {
      setGyms(data || []);
      // Set first gym as default if none selected
      if (data && data.length > 0 && !selectedGym) {
        setSelectedGym(data[0].slug);
      }
    }
    setLoading(false);
  };

  const loadBranches = async (gymSlug) => {
    setLoading(true);
    const { data, error } = await dataService.getBranches(gymSlug);

    if (error) {
      console.error('Error loading branches:', error);
      setError(error);
    } else {
      setBranches(data || []);
      // Set first branch as default if none selected
      if (data && data.length > 0 && !selectedBranch) {
        setSelectedBranch(data[0].slug);
      }
    }
    setLoading(false);
  };

  const changeBranch = (gymSlug, branchSlug) => {
    setSelectedGym(gymSlug);
    setSelectedBranch(branchSlug);
  };

  const getCurrentBranch = () => {
    return branches.find(b => b.slug === selectedBranch);
  };

  const getCurrentGym = () => {
    return gyms.find(g => g.slug === selectedGym);
  };

  const value = {
    gyms,
    branches,
    selectedGym,
    selectedBranch,
    loading,
    error,
    changeBranch,
    getCurrentBranch,
    getCurrentGym,
    refreshBranches: () => loadBranches(selectedGym),
    refreshGyms: loadGyms
  };

  return (
    <BranchContext.Provider value={value}>
      {children}
    </BranchContext.Provider>
  );
};
