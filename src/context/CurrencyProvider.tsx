import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  rate: number;
}

const currencies: Currency[] = [
  { code: 'CA$', symbol: 'CA$', name: 'Canadian Dollar', flag: '🇨🇦', rate: 1.35 },
  { code: 'USD', symbol: 'USD$', name: 'US Dollar', flag: '🇺🇸', rate: 1.0 },
  { code: 'EUR', symbol: 'Euro€', name: 'Euro', flag: '🇪🇺', rate: 0.92 },
  { code: 'GBP', symbol: 'GBP£', name: 'British Pound', flag: '🇬🇧', rate: 0.79 },
];

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: Currency[];
  formatPrice: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('selectedCurrency');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return currencies.find(c => c.code === parsed.code) || currencies[0];
      } catch (e) {
        return currencies[0];
      }
    }
    return currencies[0];
  });

  useEffect(() => {
    localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
  }, [selectedCurrency]);

  const formatPrice = (usdAmount: number): string => {
    const amount = usdAmount * selectedCurrency.rate;
    if (selectedCurrency.code === 'USD') return `$${Math.round(amount)}`;
    if (selectedCurrency.code === 'CA$') return `$${Math.round(amount)}`;
    if (selectedCurrency.code === 'EUR') return `€${Math.round(amount)}`;
    if (selectedCurrency.code === 'GBP') return `£${Math.round(amount)}`;
    return `${selectedCurrency.symbol}${Math.round(amount)}`;
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, currencies, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
