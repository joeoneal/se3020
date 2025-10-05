import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Crime {
  id: string;
  title: string;
  description: string;
  date: Date;
  isSolved: boolean;
}

interface CrimeContextType {
  crimes: Crime[];
  addCrime: (crime: Omit<Crime, 'id'>) => void;
}

const CrimeContext = createContext<CrimeContextType | undefined>(undefined);

export const CrimeProvider = ({ children }: { children: ReactNode }) => {
  const [crimes, setCrimes] = useState<Crime[]>([]);

  const addCrime = (crimeData: Omit<Crime, 'id'>) => {
    const newCrime = { ...crimeData, id: Date.now().toString() };
    console.log("New Crime Added:", newCrime)
    setCrimes(prevCrimes => [...prevCrimes, newCrime]);
  };

  return (
    <CrimeContext.Provider value={{ crimes, addCrime }}>
      {children}
    </CrimeContext.Provider>
  );
};

export const useCrimes = () => {
  const context = useContext(CrimeContext);
  if (context === undefined) {
    throw new Error('useCrimes must be used within a CrimeProvider');
  }
  return context;
};
