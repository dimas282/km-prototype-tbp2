export type Language = 'en' | 'id';

export const translations = {
  en: {
    // Header
    header: {
      brand: 'Total Bangun Persada',
      subtitle: 'Knowledge Management Portal',
      browse: 'Browse',
      communities: 'Communities',
      askExpert: 'Ask Expert',
      admin: 'Admin',
      notifications: 'Notifications',
      help: 'Help',
      settings: 'Settings',
      logout: 'Logout',
    },
    // Roles
    roles: {
      admin: 'KM Admin',
      sme: 'Subject Matter Expert',
      user: 'General User',
    },
    // Hero
    hero: {
      companyBadge: 'PT Total Bangun Persada Tbk.',
      title: 'Find the Knowledge You Need',
      subtitle: 'Search documents, SOPs, experts, and community insights across our organization',
      searchPlaceholder: 'Search for documents, SOPs, tags, experts, or CoP content...',
      search: 'Search',
      quickSuggestions: 'Quick suggestions',
      popular: 'Popular:',
      popularTags: ['Safety Guidelines', 'HR Policies', 'IT Procedures', 'Compliance'],
    },
    // Categories
    categories: {
      title: 'Browse by Knowledge Topics',
      subtitle: 'Explore knowledge organized by domain',
      viewAll: 'View All Categories',
      items: 'items',
      names: {
        safety: 'Safety',
        humanResources: 'Human Resources',
        engineering: 'Engineering',
        compliance: 'Compliance',
        itTechnology: 'IT & Technology',
        legal: 'Legal',
        operations: 'Operations',
        healthWellness: 'Health & Wellness',
      },
    },
    // Knowledge Section
    knowledge: {
      recommended: 'Recommended',
      recentlyAdded: 'Recently Added',
      browseAll: 'Browse All',
    },
    // Task Widget
    tasks: {
      adminDashboard: 'Admin Dashboard',
      expertDashboard: 'Expert Dashboard',
      myDashboard: 'My Dashboard',
      viewAll: 'View All',
      pendingTasks: 'Pending Tasks',
      // Admin actions
      manageTaxonomies: 'Manage Taxonomies',
      manageSMEs: 'Manage SMEs',
      manageCoP: 'Manage CoP Activities',
      uploadOfficial: 'Upload Official Knowledge',
      // SME actions
      approvalQueue: 'Approval Queue',
      answerQuestions: 'Answer Questions',
      uploadExpert: 'Upload Expert Knowledge',
      // User actions
      contributeKnowledge: 'Contribute Knowledge',
      joinCoP: 'Join CoP Activities',
      askAnExpert: 'Ask an Expert',
      exploreCoP: 'Explore Community of Practices (CoP)',
      // Admin tasks
      reviewTaxonomy: 'Review taxonomy updates',
      assignSME: 'Assign SME to Safety domain',
      approveCoP: 'Approve CoP publication',
      pendingCategoryChanges: 'pending category changes',
      newSMERequest: 'New SME request pending',
      engineeringCoPQ4: 'Engineering CoP Q4 Report',
      // SME tasks
      reviewContributions: 'Review contributions',
      pendingSubmissions: 'Pending user submissions',
      answerExpertQuestions: 'Answer expert questions',
      openThreads: 'Open threads in your domain',
      updateDomainKnowledge: 'Update domain knowledge',
      lastUpdated: 'Last updated 14 days ago',
      // User tasks
      completeDraft: 'Complete draft submission',
      safetyProcedureUpdate: 'Safety procedure update',
      checkAnswered: 'Check answered questions',
      questionsAnswered: 'Your questions were answered',
      joinUpcoming: 'Join upcoming CoP event',
      meetupTomorrow: 'Engineering CoP meetup tomorrow',
    },
    // Stats
    stats: {
      totalDocuments: 'Total Documents',
      activeSMEs: 'Active SMEs',
      questionsAnswered: 'Questions Answered',
      monthlyViews: 'Monthly Views',
      pendingApprovals: 'Pending Approvals',
      openTickets: 'Open Tickets',
      systemHealth: 'System Health',
      pendingReviews: 'Pending Reviews',
      yourDocuments: 'Your Documents',
      openQuestions: 'Open Questions',
      domainScore: 'Domain Score',
    },
    // Ask Expert
    askExpert: {
      title: 'Ask The Expert',
      subtitle: 'Get answers from domain experts',
      askQuestion: 'Ask Question',
      featuredExperts: 'Featured Experts',
      by: 'by',
      answered: 'answered',
      pending: 'pending',
    },
    // CoP
    cop: {
      title: 'Community of Practice',
      subtitle: 'Upcoming events and latest publications',
      viewAll: 'View All',
      event: 'event',
      publication: 'publication',
      discussion: 'discussion',
    },
    // Footer
    footer: {
      brand: 'Knowledge Hub',
      helpCenter: 'Help Center',
      documentation: 'Documentation',
      contact: 'Contact',
      privacy: 'Privacy',
      version: 'Version',
    },
    // Login
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to access the Knowledge Management Portal',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      invalidCredentials: 'Invalid email or password',
      companyName: 'PT Total Bangun Persada Tbk.',
      portalName: 'Knowledge Management Portal',
    },
    // Explorer
    explorer: {
      title: 'Knowledge Explorer',
      subtitle: 'Browse knowledge by department and topic',
      departments: 'Departments',
      manageTopics: 'Manage Topics',
      addKnowledge: 'Add Knowledge',
      allDepartments: 'All Departments',
      selectDepartment: 'Select a department to view knowledge assets',
      browseHint: 'Browse the department tree on the left to explore topics',
      noAssets: 'No knowledge assets found',
      noAssetsHint: 'Try selecting a different topic or department',
      showing: 'Showing',
      assets: 'assets',
      view: 'View',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      new: 'new',
      stable: 'stable',
    },
  },
  id: {
    // Header
    header: {
      brand: 'Total Bangun Persada',
      subtitle: 'Portal Manajemen Pengetahuan',
      browse: 'Jelajahi',
      communities: 'Komunitas',
      askExpert: 'Tanya Ahli',
      admin: 'Admin',
      notifications: 'Notifikasi',
      help: 'Bantuan',
      settings: 'Pengaturan',
      logout: 'Keluar',
    },
    // Roles
    roles: {
      admin: 'Admin KM',
      sme: 'Pakar Bidang',
      user: 'Pengguna Umum',
    },
    // Hero
    hero: {
      companyBadge: 'PT Total Bangun Persada Tbk.',
      title: 'Temukan Pengetahuan yang Anda Butuhkan',
      subtitle: 'Cari dokumen, SOP, pakar, dan wawasan komunitas di seluruh organisasi kami',
      searchPlaceholder: 'Cari dokumen, SOP, tag, pakar, atau konten CoP...',
      search: 'Cari',
      quickSuggestions: 'Saran cepat',
      popular: 'Populer:',
      popularTags: ['Panduan Keselamatan', 'Kebijakan SDM', 'Prosedur TI', 'Kepatuhan'],
    },
    // Categories
    categories: {
      title: 'Jelajahi berdasarkan Topik Pengetahuan',
      subtitle: 'Eksplorasi pengetahuan berdasarkan domain',
      viewAll: 'Lihat Semua Kategori',
      items: 'item',
      names: {
        safety: 'Keselamatan',
        humanResources: 'Sumber Daya Manusia',
        engineering: 'Rekayasa',
        compliance: 'Kepatuhan',
        itTechnology: 'TI & Teknologi',
        legal: 'Hukum',
        operations: 'Operasional',
        healthWellness: 'Kesehatan & Kebugaran',
      },
    },
    // Knowledge Section
    knowledge: {
      recommended: 'Direkomendasikan',
      recentlyAdded: 'Baru Ditambahkan',
      browseAll: 'Jelajahi Semua',
    },
    // Task Widget
    tasks: {
      adminDashboard: 'Dasbor Admin',
      expertDashboard: 'Dasbor Pakar',
      myDashboard: 'Dasbor Saya',
      viewAll: 'Lihat Semua',
      pendingTasks: 'Tugas Tertunda',
      // Admin actions
      manageTaxonomies: 'Kelola Taksonomi',
      manageSMEs: 'Kelola Pakar',
      manageCoP: 'Kelola Aktivitas CoP',
      uploadOfficial: 'Unggah Pengetahuan Resmi',
      // SME actions
      approvalQueue: 'Antrian Persetujuan',
      answerQuestions: 'Jawab Pertanyaan',
      uploadExpert: 'Unggah Pengetahuan Pakar',
      // User actions
      contributeKnowledge: 'Kontribusi Pengetahuan',
      joinCoP: 'Gabung Aktivitas CoP',
      askAnExpert: 'Tanya Pakar',
      exploreCoP: 'Jelajahi Komunitas Praktik (CoP)',
      // Admin tasks
      reviewTaxonomy: 'Tinjau pembaruan taksonomi',
      assignSME: 'Tetapkan Pakar untuk domain Keselamatan',
      approveCoP: 'Setujui publikasi CoP',
      pendingCategoryChanges: 'perubahan kategori tertunda',
      newSMERequest: 'Permintaan pakar baru tertunda',
      engineeringCoPQ4: 'Laporan Rekayasa CoP Q4',
      // SME tasks
      reviewContributions: 'Tinjau kontribusi',
      pendingSubmissions: 'Kiriman pengguna tertunda',
      answerExpertQuestions: 'Jawab pertanyaan pakar',
      openThreads: 'Thread terbuka di domain Anda',
      updateDomainKnowledge: 'Perbarui pengetahuan domain',
      lastUpdated: 'Terakhir diperbarui 14 hari lalu',
      // User tasks
      completeDraft: 'Selesaikan draf kiriman',
      safetyProcedureUpdate: 'Pembaruan prosedur keselamatan',
      checkAnswered: 'Periksa pertanyaan terjawab',
      questionsAnswered: 'Pertanyaan Anda telah dijawab',
      joinUpcoming: 'Gabung acara CoP mendatang',
      meetupTomorrow: 'Pertemuan Rekayasa CoP besok',
    },
    // Stats
    stats: {
      totalDocuments: 'Total Dokumen',
      activeSMEs: 'Pakar Aktif',
      questionsAnswered: 'Pertanyaan Dijawab',
      monthlyViews: 'Tampilan Bulanan',
      pendingApprovals: 'Persetujuan Tertunda',
      openTickets: 'Tiket Terbuka',
      systemHealth: 'Kesehatan Sistem',
      pendingReviews: 'Tinjauan Tertunda',
      yourDocuments: 'Dokumen Anda',
      openQuestions: 'Pertanyaan Terbuka',
      domainScore: 'Skor Domain',
    },
    // Ask Expert
    askExpert: {
      title: 'Tanya Pakar',
      subtitle: 'Dapatkan jawaban dari pakar domain',
      askQuestion: 'Ajukan Pertanyaan',
      featuredExperts: 'Pakar Unggulan',
      by: 'oleh',
      answered: 'terjawab',
      pending: 'tertunda',
    },
    // CoP
    cop: {
      title: 'Komunitas Praktik',
      subtitle: 'Acara mendatang dan publikasi terbaru',
      viewAll: 'Lihat Semua',
      event: 'acara',
      publication: 'publikasi',
      discussion: 'diskusi',
    },
    // Footer
    footer: {
      brand: 'Pusat Pengetahuan',
      helpCenter: 'Pusat Bantuan',
      documentation: 'Dokumentasi',
      contact: 'Kontak',
      privacy: 'Privasi',
      version: 'Versi',
    },
    // Login
    login: {
      title: 'Selamat Datang Kembali',
      subtitle: 'Masuk untuk mengakses Portal Manajemen Pengetahuan',
      email: 'Email',
      emailPlaceholder: 'Masukkan email Anda',
      password: 'Kata Sandi',
      passwordPlaceholder: 'Masukkan kata sandi Anda',
      signIn: 'Masuk',
      signingIn: 'Sedang masuk...',
      invalidCredentials: 'Email atau kata sandi tidak valid',
      companyName: 'PT Total Bangun Persada Tbk.',
      portalName: 'Portal Manajemen Pengetahuan',
    },
    // Explorer
    explorer: {
      title: 'Penjelajah Pengetahuan',
      subtitle: 'Jelajahi pengetahuan berdasarkan departemen dan topik',
      departments: 'Departemen',
      manageTopics: 'Kelola Topik',
      addKnowledge: 'Tambah Pengetahuan',
      allDepartments: 'Semua Departemen',
      selectDepartment: 'Pilih departemen untuk melihat aset pengetahuan',
      browseHint: 'Jelajahi pohon departemen di sebelah kiri untuk mengeksplorasi topik',
      noAssets: 'Tidak ada aset pengetahuan ditemukan',
      noAssetsHint: 'Coba pilih topik atau departemen yang berbeda',
      showing: 'Menampilkan',
      assets: 'aset',
      view: 'Lihat',
    },
    // Common
    common: {
      loading: 'Memuat...',
      error: 'Kesalahan',
      success: 'Berhasil',
      cancel: 'Batal',
      save: 'Simpan',
      delete: 'Hapus',
      edit: 'Edit',
      new: 'baru',
      stable: 'stabil',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
