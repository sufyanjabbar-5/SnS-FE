import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

interface Offering {
  id: number;
  type: 'live_bootcamp' | 'self_study' | 'corporate' | 'one_on_one';
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
}

interface Certification {
  id: number;
  shortName: string;
  longName: string;
  slug: string;
  icon: string;
  description: string;
  displayOrder: number;
  offerings?: Offering[];
}

interface CertificationContextType {
  certifications: Certification[];
  appInfo: Record<string, any>;
  upcomingBatches: any[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  getCertificationBySlug: (slug: string) => Certification | undefined;
}

const CertificationContext = createContext<CertificationContextType | undefined>(undefined);

export const CertificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [appInfo, setAppInfo] = useState<Record<string, any>>({});
  const [upcomingBatches, setUpcomingBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiService.request('/api/app/config');
      if (response.success) {
        setCertifications(response.data.certifications);
        setAppInfo(response.data.info);
        setUpcomingBatches(response.data.upcomingBatches);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch application data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCertificationBySlug = (slug: string) => {
    return certifications.find(c => c.slug === slug);
  };

  return (
    <CertificationContext.Provider value={{ 
      certifications, 
      appInfo,
      upcomingBatches,
      loading, 
      error, 
      refreshData: fetchData,
      getCertificationBySlug
    }}>
      {children}
    </CertificationContext.Provider>
  );
};

export const useCertifications = () => {
  const context = useContext(CertificationContext);
  if (context === undefined) {
    throw new Error('useCertifications must be used within a CertificationProvider');
  }
  return context;
};
