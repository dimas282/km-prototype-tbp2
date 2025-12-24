export type ContributionStatus = 'pending' | 'approved' | 'rejected';

export interface KnowledgeContribution {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  tagLevel1: string; // Jenis Dokumen Aset Pengetahuan
  tagLevel2: string[]; // Topik Pengetahuan Prioritas (optional, multiple)
  tagLevel3: string[]; // Topik Pengetahuan Spesifik (mandatory, multiple)
  status: ContributionStatus;
  contributorId: string;
  contributorName: string;
  contributorEmail: string;
  submissionDate: string;
  reviewerId?: string;
  reviewerName?: string;
  reviewDate?: string;
  rejectionReason?: string;
  version: number;
}

// Tag Level 1 - Jenis Dokumen Aset Pengetahuan
export const tagLevel1Options = [
  { id: 'metode', name: 'Metode', nameEn: 'Method' },
  { id: 'curriculum', name: 'Curriculum & Training Center', nameEn: 'Curriculum & Training Center' },
  { id: 'innovation', name: 'Innovation', nameEn: 'Innovation' },
  { id: 'laporan-akhir', name: 'Laporan Akhir', nameEn: 'Final Report' },
  { id: 'manual-book', name: 'Manual Book', nameEn: 'Manual Book' },
  { id: 'spesifikasi', name: 'Spesifikasi', nameEn: 'Specification' },
  { id: 'lesson-learned', name: 'Lesson Learned/Kumpulan Kasus', nameEn: 'Lesson Learned/Case Collection' },
  { id: 'knowledge-sharing', name: 'Materi Knowledge Sharing', nameEn: 'Knowledge Sharing Material' },
  { id: 'hasil-cop', name: 'Hasil CoP', nameEn: 'CoP Results' },
  { id: 'knowledge-capture', name: 'Knowledge Capture', nameEn: 'Knowledge Capture' },
  { id: 'prosedur', name: 'Prosedur', nameEn: 'Procedure' },
  { id: 'instruksi-kerja', name: 'Instruksi Kerja', nameEn: 'Work Instruction' },
  { id: 'standar', name: 'Standar', nameEn: 'Standard' },
  { id: 'peraturan', name: 'Peraturan Perundangan', nameEn: 'Regulations' },
  { id: 'referensi', name: 'Referensi', nameEn: 'Reference' },
];

// Tag Level 2 - Topik Pengetahuan Prioritas
export const tagLevel2Options = [
  { id: 'deep-basement', name: 'Deep Basement (> 5 Basement)', nameEn: 'Deep Basement (> 5 Basement)' },
  { id: 'mep', name: 'MEP Related', nameEn: 'MEP Related' },
  { id: 'data-center', name: 'Data Center Related', nameEn: 'Data Center Related' },
  { id: 'super-tall', name: 'Super Tall Building', nameEn: 'Super Tall Building' },
  { id: 'mix-used', name: 'Super Complex Mix Used Building', nameEn: 'Super Complex Mix Used Building' },
  { id: 'design-build', name: 'Design & Build', nameEn: 'Design & Build' },
  { id: 'trustworthy', name: 'Trustworthy Reliable People', nameEn: 'Trustworthy Reliable People' },
];
