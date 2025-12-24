import React, { createContext, useContext, useState, ReactNode } from 'react';
import { KnowledgeContribution, ContributionStatus } from '@/types/contribution';

interface ContributionContextType {
  contributions: KnowledgeContribution[];
  addContribution: (contribution: Omit<KnowledgeContribution, 'id' | 'status' | 'submissionDate' | 'version'>) => void;
  updateContributionStatus: (
    id: string,
    status: ContributionStatus,
    reviewerId: string,
    reviewerName: string,
    rejectionReason?: string
  ) => void;
  getContributionsByStatus: (status: ContributionStatus) => KnowledgeContribution[];
  getContributionsByContributor: (contributorId: string) => KnowledgeContribution[];
  resubmitContribution: (id: string, updates: Partial<KnowledgeContribution>) => void;
}

const ContributionContext = createContext<ContributionContextType | undefined>(undefined);

// Sample initial contributions for demo
const initialContributions: KnowledgeContribution[] = [
  {
    id: 'contrib-1',
    title: 'Metode Konstruksi Deep Basement',
    fileName: 'metode-deep-basement.pdf',
    fileUrl: '/sample.pdf',
    tagLevel1: 'metode',
    tagLevel2: ['deep-basement'],
    tagLevel3: ['Excavation Method', 'Shoring System'],
    status: 'pending',
    contributorId: 'user1',
    contributorName: 'Ahmad Fauzi',
    contributorEmail: 'user1@km.local',
    submissionDate: '2024-01-15T10:30:00Z',
    version: 1,
  },
  {
    id: 'contrib-2',
    title: 'Panduan Safety MEP Installation',
    fileName: 'safety-mep-guide.pdf',
    fileUrl: '/sample.pdf',
    tagLevel1: 'instruksi-kerja',
    tagLevel2: ['mep'],
    tagLevel3: ['Electrical Safety', 'HVAC Installation'],
    status: 'pending',
    contributorId: 'user2',
    contributorName: 'Budi Santoso',
    contributorEmail: 'user2@km.local',
    submissionDate: '2024-01-16T14:20:00Z',
    version: 1,
  },
];

export const ContributionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contributions, setContributions] = useState<KnowledgeContribution[]>(initialContributions);

  const addContribution = (contribution: Omit<KnowledgeContribution, 'id' | 'status' | 'submissionDate' | 'version'>) => {
    const newContribution: KnowledgeContribution = {
      ...contribution,
      id: `contrib-${Date.now()}`,
      status: 'pending',
      submissionDate: new Date().toISOString(),
      version: 1,
    };
    setContributions(prev => [newContribution, ...prev]);
  };

  const updateContributionStatus = (
    id: string,
    status: ContributionStatus,
    reviewerId: string,
    reviewerName: string,
    rejectionReason?: string
  ) => {
    setContributions(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              status,
              reviewerId,
              reviewerName,
              reviewDate: new Date().toISOString(),
              rejectionReason: status === 'rejected' ? rejectionReason : undefined,
            }
          : c
      )
    );
  };

  const getContributionsByStatus = (status: ContributionStatus) => {
    return contributions.filter(c => c.status === status);
  };

  const getContributionsByContributor = (contributorId: string) => {
    return contributions.filter(c => c.contributorId === contributorId);
  };

  const resubmitContribution = (id: string, updates: Partial<KnowledgeContribution>) => {
    setContributions(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              ...updates,
              status: 'pending' as ContributionStatus,
              submissionDate: new Date().toISOString(),
              version: c.version + 1,
              reviewerId: undefined,
              reviewerName: undefined,
              reviewDate: undefined,
              rejectionReason: undefined,
            }
          : c
      )
    );
  };

  return (
    <ContributionContext.Provider
      value={{
        contributions,
        addContribution,
        updateContributionStatus,
        getContributionsByStatus,
        getContributionsByContributor,
        resubmitContribution,
      }}
    >
      {children}
    </ContributionContext.Provider>
  );
};

export const useContribution = () => {
  const context = useContext(ContributionContext);
  if (!context) {
    throw new Error('useContribution must be used within a ContributionProvider');
  }
  return context;
};
