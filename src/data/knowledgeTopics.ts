// Predefined Knowledge Topics with Specific Topics

export interface KnowledgeTopic {
  id: string;
  name: string;
  nameEn: string;
  specificTopics: string[];
}

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: 'design-engineering',
    name: 'Design & Engineering',
    nameEn: 'Design & Engineering',
    specificTopics: [
      'Site Plan Management',
      'BIM',
      'Struktur',
      'Arsitektur',
      'Geoteknik',
      'Infrastruktur',
      'External Works',
      'Safety',
      'Equipment',
    ],
  },
  {
    id: 'qhse',
    name: 'Quality & Health Safety Environment',
    nameEn: 'Quality & Health Safety Environment',
    specificTopics: ['Quality', 'Health Safety Environment'],
  },
  {
    id: 'logistik',
    name: 'Logistik',
    nameEn: 'Logistik',
    specificTopics: [
      'Tender',
      'Purchase Order',
      'Product Information',
      'Kontrak',
      'Logistik Knowledge',
    ],
  },
  {
    id: 'equipment',
    name: 'Equipment',
    nameEn: 'Equipment',
    specificTopics: ['Internal', 'External'],
  },
  {
    id: 'information-technology',
    name: 'Information Technology',
    nameEn: 'Information Technology',
    specificTopics: ['Software Development', 'Infrastructure & Networking', 'IT Governance'],
  },
  {
    id: 'human-capital',
    name: 'Human Capital & Development',
    nameEn: 'Human Capital & Development',
    specificTopics: [
      'Recruitment, Selection, & Placement',
      'Performance Management / Evaluasi Karyawan',
      'Learning & Development',
      'Career & Development',
      'Personnel Management',
      'Compensation & Benefit',
      'Industrial Relation',
      'Culture & System Development',
    ],
  },
  {
    id: 'corporate-secretary',
    name: 'Corporate Secretary',
    nameEn: 'Corporate Secretary',
    specificTopics: [
      'External Communication',
      'Internal Communication',
      'Prosedur Corporate Secretary',
      'Kompetensi',
    ],
  },
  {
    id: 'corporate-governance',
    name: 'Corporate Governance & Compliance',
    nameEn: 'Corporate Governance & Compliance',
    specificTopics: ['ISO', 'Risk Library', 'Corporate Plan', 'RSI Library'],
  },
  {
    id: 'estimation',
    name: 'Estimation',
    nameEn: 'Estimation',
    specificTopics: ['Quantity', 'Pricing', 'Referensi'],
  },
  {
    id: 'customer-care',
    name: 'Customer Care',
    nameEn: 'Customer Care',
    specificTopics: [
      'Penanganan Keluhan Pelanggan',
      'Pengukuran Kepuasan Pelanggan Eksternal',
      'Serah Terima Proyek',
      'CC Sharing',
    ],
  },
  {
    id: 'legal-general-affair',
    name: 'Legal & General Affair',
    nameEn: 'Legal & General Affair',
    specificTopics: ['General Affair', 'Legal'],
  },
  {
    id: 'accounting-cash',
    name: 'Accounting & Cash Operation',
    nameEn: 'Accounting & Cash Operation',
    specificTopics: [
      'Perpajakan',
      'Akuntansi',
      'Penerimaan Dana',
      'Pengeluaran Dana',
      'Pengelolaan Dana & Fasilitas',
      'Bank Garansi',
      'Pinjaman Dinas',
    ],
  },
  {
    id: 'project-control',
    name: 'Project Control',
    nameEn: 'Project Control',
    specificTopics: [
      'Kontrol Biaya Proyek',
      'Kontrol Tagihan Owner',
      'Lesson Learned Laporan Evaluasi Proyek (Internal)',
    ],
  },
  {
    id: 'property-building',
    name: 'Property & Building Management',
    nameEn: 'Property & Building Management',
    specificTopics: [
      'Marketing',
      'Repair & Maintenance',
      'Security',
      'Tenant Relation & Fit Out',
      'Laporan Pihak Ketiga',
      'Housekeeping',
    ],
  },
];
