/**
 * Portfolio Admin Panel System
 * Enables dynamic modification of all sections, local storage persistence,
 * theme customizer, JSON backup/restore, and interactive forms.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'qois_portfolio_data';
  const AUTH_KEY = 'qois_portfolio_admin_auth';

  // Default initial portfolio data matching original index.html content
  const DEFAULT_DATA = {
    settings: {
      password: 'admin123',
      primaryColor: '#5e6ad2',
      primaryHoverColor: '#828fff',
      pageTitle: 'Qois Abdul Qudus - IT Officer & Systems Developer',
      metaDescription: 'Portofolio Profesional Qois Abdul Qudus - IT Infrastructure Officer, Fullstack Web & Android Developer.',
      geminiApiKey: '',
      jsonbinId: '6a7d76f2da38895dfede6a6f',
      jsonbinKey: ''
    },
    hero: {
      name: 'Qois Abdul Qudus',
      headline: 'IT Infrastructure Officer & Systems Developer',
      bio: 'Spesialis infrastruktur IT dan pengembang sistem digital berstandar industri. Berpengalaman menangani operasional jaringan CCTV & keamanan pabrik 24/7, serta merancang arsitektur aplikasi web enterprise, full-stack web development, dan solusi Android interaktif yang skalabel.',
      profileImage: 'profile.png',
      stats: [
        { num: '3+ Tahun', label: 'Pengalaman IT', highlight: false },
        { num: '11+ Proyek', label: 'Enterprise & Web', highlight: false },
        { num: 'AWS Certified', label: 'Cloud Practitioner', highlight: true }
      ],
      buttons: [
        { label: 'Contact Me', url: 'mailto:qoisabdulquduss@gmail.com', type: 'primary', target: '_self' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/qoisabdulqudus', type: 'secondary', target: '_blank' },
        { label: 'GitHub', url: 'https://github.com/doelkussoy', type: 'secondary', target: '_blank' }
      ]
    },
    filterCategories: [
      { id: 'all', label: 'All Projects' },
      { id: 'enterprise', label: 'Enterprise Systems (CBA)' },
      { id: 'web', label: 'Web Applications' },
      { id: 'mobile', label: 'Mobile & Game Dev' }
    ],
    projects: [
      {
        id: 'p1',
        title: 'Factory Network Control System',
        company: 'PT Centa Brasindo Abadi Chemical Industry',
        badge: 'Aug 2026 – Present',
        category: 'enterprise',
        image: 'networkfactory.png',
        description: 'Aplikasi monitoring & kontrol perangkat jaringan pabrik berbasis web (LAN). Memantau topologi dan kondisi perangkat jaringan secara real-time, grafik SLA, serta sistem alert otomatis.',
        techStack: ['Network Infrastructure', 'LAN Control', 'Real-time Monitoring'],
        linkUrl: 'https://networkfactory.cbapabrik.com/',
        linkText: 'Visit App ↗'
      },
      {
        id: 'p2',
        title: 'IT Asset Management (ITAM) Enterprise',
        company: 'PT Centa Brasindo Abadi Chemical Industry',
        badge: 'Jun 2026 – Present',
        category: 'enterprise',
        image: 'itam.png',
        description: 'Sistem Manajemen Aset IT & Helpdesk komprehensif berbasis Laravel 12. Membantu pelacakan aset IT, alokasi IP address, manajemen lisensi software, serta operasional layanan ticketing helpdesk.',
        techStack: ['Laravel 12', 'ITAM Enterprise', 'Helpdesk Ticketing'],
        linkUrl: 'https://itam.cbapabrik.com/',
        linkText: 'Visit App ↗'
      },
      {
        id: 'p3',
        title: 'P3K Digital Monitoring System',
        company: 'PT Centa Brasindo Abadi Chemical Industry',
        badge: 'May 2026 – Present',
        category: 'enterprise',
        image: 'kotakp3k.png',
        description: 'Solusi manajemen inventaris cerdas yang mentransformasi pemantauan kotak P3K konvensional di seluruh area pabrik menjadi platform digital yang efisien, transparan, dan akurat.',
        techStack: ['Safety & EHS', 'Inventory Tracking', 'Digital Monitoring'],
        linkUrl: 'https://kotakp3k.cbapabrik.com/',
        linkText: 'Visit App ↗'
      },
      {
        id: 'p4',
        title: 'Sistem Sarana Prasarana',
        company: 'PT Centa Brasindo Abadi Chemical Industry',
        badge: 'Apr 2026 – Present',
        category: 'enterprise',
        image: 'saranaprasarana.png',
        description: 'Aplikasi web internal perusahaan untuk memantau dan mencatat pemeliharaan fasilitas serta infrastruktur pabrik. Memudahkan tim maintenance mencatat inspeksi, kondisi aset, dan mencetak kartu riwayat pemeliharaan secara digital.',
        techStack: ['Facility Maintenance', 'Asset Management', 'Enterprise Web App'],
        linkUrl: 'https://saranaprasarana.cbapabrik.com/',
        linkText: 'Visit App ↗'
      },
      {
        id: 'p5',
        title: 'Patroli Keamanan Pabrik',
        company: 'PT Centa Brasindo Abadi Chemical Industry',
        badge: 'Sep 2025 – Present',
        category: 'enterprise',
        image: 'patroli.png',
        description: 'Sistem pencatatan log patroli keamanan terpusat. Petugas mencatat jadwal shift, rute patroli, timestamp, dan laporan kejadian yang dilengkapi bukti foto serta tanda tangan digital.',
        techStack: ['Security Operations', 'Digital Signatures', 'Audit Trail'],
        linkUrl: 'https://patrolikeamanan.cbapabrik.com/',
        linkText: 'Visit App ↗'
      },
      {
        id: 'p6',
        title: 'Tracking Bongkar Muat',
        company: 'PT Centa Brasindo Abadi Chemical Industry',
        badge: 'Aug 2025 – Present',
        category: 'enterprise',
        image: 'tracking.png',
        description: 'Aplikasi pelacakan logistik real-time untuk mengonsolidasi dan mengoptimalkan alur kerja kendaraan di pabrik. Memantau durasi setiap tahapan dari gate check-in hingga pemuatan barang secara transparan.',
        techStack: ['Logistics Tracking', 'Workflow Optimization', 'Real-time Monitoring'],
        linkUrl: 'https://tracking.cbapabrik.com/',
        linkText: 'Visit App ↗'
      },
      {
        id: 'p7',
        title: 'E-Raport System (Kinerja Karyawan)',
        company: 'PT Centa Brasindo Abadi Chemical Industry',
        badge: 'Dec 2024 – Present',
        category: 'enterprise',
        image: 'eraport.png',
        description: 'Sistem pelacakan kinerja karyawan HR yang mengelola kehadiran, pengajuan cuti, keterlambatan, riwayat training, serta evaluasi berkala dengan fitur ekspor laporan resmi.',
        techStack: ['HR Tech', 'Performance Assessment', 'Enterprise Reporting'],
        linkUrl: 'https://eraport.cbapabrik.com/',
        linkText: 'Visit App ↗'
      },
      {
        id: 'p8',
        title: 'Esthetic Cafe - Food Ordering Platform',
        company: 'Independent Project',
        badge: 'May 2025 – Aug 2025',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
        description: 'Platform pemesanan makanan berbasis web dengan fitur live order tracking dan admin panel manajemen menu, memungkinkan pelanggan memesan secara mandiri tanpa pelayanan manual.',
        techStack: ['Node.js', 'Laravel', 'Order Tracking'],
        linkUrl: 'https://estheticcafe.my.id',
        linkText: 'Visit Website ↗'
      },
      {
        id: 'p9',
        title: 'SerenityHub - Website Pengaduan Kota Serang',
        company: 'Universitas Bina Bangsa & Serang City Gov',
        badge: 'May 2024 – Sep 2024',
        category: 'web',
        image: 'serenityhub.png',
        description: 'Platform pengaduan publik yang dibangun bekerja sama dengan Pemerintah Kota Serang. Warga dapat mengirim laporan, melacak status penanganan, dan berkomunikasi dengan dinas terkait.',
        techStack: ['JavaScript', 'MongoDB', 'Civic Tech'],
        linkUrl: 'https://serenityhub.cbapabrik.com/',
        linkText: 'Visit Platform ↗'
      },
      {
        id: 'p10',
        title: 'BBQ Al-Kahfi Serang - Company Profile',
        company: 'Yayasan Al-Kahfi Serang',
        badge: 'Jan 2024 – Mar 2024',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
        description: 'Website company profile yang modern, responsif, dan mobile-first, dirancang untuk meningkatkan kredibilitas brand dan menyajikan navigasi yang intuitif.',
        techStack: ['PHP', 'MySQL', 'UI/UX Design'],
        linkUrl: 'https://bbqalkahfiserang.com/',
        linkText: 'Visit Website ↗'
      },
      {
        id: 'p11',
        title: 'Petualangan Barudak - Ethnomathematics Edu-Game',
        company: 'Universitas Bina Bangsa & Research Publication',
        badge: 'May 2024 – Aug 2024',
        category: 'mobile',
        image: 'barudak.jpg',
        description: 'Game edukasi Android interaktif yang mengajarkan konsep geometri melalui kebudayaan lokal Banten. Dipublikasikan secara resmi dalam Histogram: Jurnal Pendidikan Matematika (2024).',
        techStack: ['Unity 3D', 'Android C#', 'Research Paper'],
        linkUrl: 'https://garuda.kemdiktisaintek.go.id/documents/detail/4509823',
        linkText: 'View Publication ↗'
      }
    ],
    experience: [
      {
        id: 'exp1',
        meta: 'Nov 2024 – Present (1 thn 10 bln) • Cikande',
        title: 'Information Technology Officer',
        company: 'PT Centa Brasindo Abadi Chemical Industry',
        description: 'Menangani IT secara end-to-end. Mengelola jaringan CCTV & infrastruktur pengawasan pabrik 24/7 agar selalu online dan sesuai standar. Merancang serta memelihara aplikasi web internal operasional pabrik (pemeliharaan fasilitas, security patrol logging, monitoring logistik, dan asesmen kinerja karyawan), serta mengelola dukungan teknis hardware, software, dan jaringan.'
      },
      {
        id: 'exp2',
        meta: 'Aug 2023 – Jan 2024 (6 bln) • Bandung',
        title: 'Back End & Front End Web Developer (Internship)',
        company: 'Dicoding Indonesia',
        description: 'Program magang 6 bulan sebagai Fullstack Developer. Membangun fitur frontend yang responsif dan layanan backend (API & database), serta aktif mengikuti siklus kerja Agile dan code review profesional bersama tim engineering.'
      },
      {
        id: 'exp3',
        meta: 'Aug 2022 – Present (4 thn) • Cilegon',
        title: 'Brand Ambassador',
        company: 'Uwais Hijab',
        description: 'Pekerjaan freelance modeling untuk brand modest fashion, berfokus pada photoshoot dan konten kampanye. Melatih kemampuan kolaborasi dengan tim kreatif serta kerja adaptif sesuai tenggat waktu.'
      },
      {
        id: 'exp4',
        meta: 'Jan 2022 – Jan 2023 (1 thn) • Serang',
        title: 'Direct Sales Area',
        company: 'PT Smartfren Telecom Tbk',
        description: 'Peran sales lapangan dalam memasarkan produk Smartfren secara langsung kepada pelanggan. Memberikan fondasi yang kuat dalam komunikasi dan pencapaian target sebelum sepenuhnya fokus di bidang IT.'
      },
      {
        id: 'exp5',
        meta: 'Oct 2020 – Present (5 thn 11 bln) • Kota Serang',
        title: 'Information Technology & Private Teacher',
        company: 'Yayasan Al-Kahfi',
        description: 'Pekerjaan freelance jangka panjang. Membangun dan memelihara beberapa aplikasi web untuk operasional yayasan, sekaligus memberikan bimbingan belajar secara privat untuk siswa.'
      }
    ],
    education: [
      {
        id: 'edu1',
        meta: 'Oct 2020 – Oct 2024 (4 thn)',
        title: 'Sarjana Komputer (S.Kom)',
        company: 'Universitas Bina Bangsa',
        description: 'Bachelor\'s degree in Computer Science. Mempelajari rekayasa perangkat lunak, arsitektur komputasi, dan penyelesaian masalah berbasis teknologi.'
      }
    ],
    certifications: [
      {
        id: 'cert1',
        meta: 'Amazon Web Services (AWS) • Dicoding',
        title: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)',
        description: 'Arsitektur komputasi awan AWS, keamanan cloud, layanan komputasi, dan manajemen infrastruktur cloud modern.',
        linkUrl: 'https://www.linkedin.com/in/qoisabdulqudus/details/certifications/',
        linkText: 'Show Credential ↗'
      },
      {
        id: 'cert2',
        meta: 'Kemendikbudristek • Dicoding Indonesia',
        title: 'SIB Dicoding X Kampus Merdeka Angkatan 5',
        description: 'Studi Independen Bersertifikat intensif 6 bulan berfokus pada Fullstack Web Development & Microservices.',
        linkUrl: 'https://www.linkedin.com/in/qoisabdulqudus/details/certifications/',
        linkText: 'Show Credential ↗'
      },
      {
        id: 'cert3',
        meta: 'Dicoding Indonesia • ID: 6RPNG7NO8Z2M',
        title: 'Belajar Dasar AI (Artificial Intelligence)',
        description: 'Konsep dasar kecerdasan buatan, Machine Learning, pemrosesan data AI, dan penerapannya dalam solusi modern.',
        linkUrl: 'https://www.dicoding.com/certificates/6RPNG7NO8Z2M',
        linkText: 'Verify Credential ↗'
      },
      {
        id: 'cert4',
        meta: 'Dicoding Indonesia • ID: 2VX35034JPYQ',
        title: 'Belajar Penerapan Data Science dengan Microsoft Fabric',
        description: 'Penerapan analisis data science, pipeline data analytics, dan visualisasi tingkat lanjut menggunakan ekosistem Microsoft Fabric.',
        linkUrl: 'https://www.dicoding.com/certificates/2VX35034JPYQ',
        linkText: 'Verify Credential ↗'
      },
      {
        id: 'cert5',
        meta: 'Dicoding Indonesia • ID: MEPJ2O0QWP3V',
        title: 'Introduction to Financial Literacy',
        description: 'Prinsip literasi keuangan, pengelolaan anggaran proyek, dan perencanaan strategi finansial jangka panjang (DBS Foundation).',
        linkUrl: 'https://www.dicoding.com/certificates/MEPJ2O0QWP3V',
        linkText: 'Verify Credential ↗'
      },
      {
        id: 'cert6',
        meta: 'Dicoding Indonesia',
        title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
        description: 'Fondasi rekayasa perangkat lunak, logika algoritma, alur kerja pengembangan software, dan best practices sintaks.',
        linkUrl: 'https://www.linkedin.com/in/qoisabdulqudus/details/certifications/',
        linkText: 'Show Credential ↗'
      },
      {
        id: 'cert7',
        meta: 'Dicoding Indonesia',
        title: 'Belajar Dasar Visualisasi Data',
        description: 'Teknik analisis data, perancangan grafik intuitif, serta penyajian informasi dan wawasan data yang efektif.',
        linkUrl: 'https://www.linkedin.com/in/qoisabdulqudus/details/certifications/',
        linkText: 'Show Credential ↗'
      },
      {
        id: 'cert8',
        meta: 'Dicoding Indonesia',
        title: 'Memulai Pemrograman dengan Python',
        description: 'Penguasaan dasar bahasa pemrograman Python, struktur data, pemrosesan variabel, dan skrip otomatisasi.',
        linkUrl: 'https://www.linkedin.com/in/qoisabdulqudus/details/certifications/',
        linkText: 'Show Credential ↗'
      },
      {
        id: 'cert9',
        meta: 'Dicoding Indonesia',
        title: 'Belajar Dasar Git dengan GitHub',
        description: 'Manajemen versi kode terdistribusi, branching strategy, pull requests, dan kolaborasi tim engineering berbasis GitHub.',
        linkUrl: 'https://www.linkedin.com/in/qoisabdulqudus/details/certifications/',
        linkText: 'Show Credential ↗'
      },
      {
        id: 'cert10',
        meta: 'Dicoding Indonesia',
        title: 'Belajar Membuat Aplikasi Web dengan React',
        description: 'Pengembangan komponen frontend interaktif, React Hooks, manajemen state, dan konsumsi RESTful APIs.',
        linkUrl: 'https://www.linkedin.com/in/qoisabdulqudus/details/certifications/',
        linkText: 'Show Credential ↗'
      }
    ],
    socials: [
      { id: 's1', platform: 'LinkedIn', handle: 'qoisabdulqudus', url: 'https://www.linkedin.com/in/qoisabdulqudus', iconType: 'linkedin' },
      { id: 's2', platform: 'GitHub', handle: 'doelkussoy', url: 'https://github.com/doelkussoy', iconType: 'github' },
      { id: 's3', platform: 'Website', handle: 'qoisabdulqudus.netlify.app', url: 'https://qoisabdulqudus.netlify.app', iconType: 'website' },
      { id: 's4', platform: 'WhatsApp / Call', handle: '+62 851-9530-0828', url: 'https://wa.me/6285195300828', iconType: 'whatsapp' },
      { id: 's5', platform: 'Email', handle: 'qoisabdulquduss@gmail.com', url: 'mailto:qoisabdulquduss@gmail.com', iconType: 'email' },
      { id: 's6', platform: 'Telegram', handle: '@doelkussoy', url: 'https://t.me/doelkussoy', iconType: 'telegram' },
      { id: 's7', platform: 'Instagram', handle: '@doelkussoy', url: 'https://instagram.com/doelkussoy', iconType: 'instagram' },
      { id: 's8', platform: 'X (Twitter)', handle: '@doelkussoy', url: 'https://x.com/doelkussoy', iconType: 'twitter' }
    ],
    footer: {
      text: '© 2026 Qois Abdul Qudus. IT Enthusiast based in Serang, Banten, Indonesia.'
    },
    messages: []
  };

  // State
  let currentData = null;

  // Retrieve site data from localStorage or default
  async function getSiteData() {
    let data = JSON.parse(JSON.stringify(DEFAULT_DATA));

    // First, try local storage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        data = { ...data, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to parse stored portfolio data:', e);
    }

    // Then try JSONBin.io
    if (data.settings && data.settings.jsonbinId) {
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${data.settings.jsonbinId}?meta=false`, {
          headers: {
            'X-Master-Key': data.settings.jsonbinKey || ''
          }
        });
        if (response.ok) {
          const cloudData = await response.json();
          data = { ...data, ...cloudData };
          // Cache the latest cloud data locally
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } else {
          console.error("Failed to fetch from JSONBin:", response.statusText);
        }
      } catch (err) {
        console.error("Network error fetching from JSONBin:", err);
      }
    }

    return data;
  }

  // Save site data to localStorage and JSONBin
  async function saveSiteData(data, silent = false) {
    currentData = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    if (!silent) {
      renderAll(); // Update DOM immediately
    }

    // Push to JSONBin.io if configured
    if (data.settings && data.settings.jsonbinId && data.settings.jsonbinKey) {
      try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${data.settings.jsonbinId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': data.settings.jsonbinKey
          },
          body: JSON.stringify(data)
        });

        if (!silent && !response.ok) {
          showToast('Gagal menyimpan ke Cloud. Pastikan Master Key benar.', 'danger');
        }
      } catch (err) {
        if (!silent) showToast('Koneksi terputus saat menyimpan ke Cloud.', 'danger');
      }
    }
  }

  // Custom UI Confirm Modal
  function showConfirmModal(message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'admin-confirm-overlay'; // Use distinct class name
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    overlay.style.display = 'flex';
    overlay.style.zIndex = '100000'; // Make sure it's above everything
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    
    const modal = document.createElement('div');
    modal.className = 'admin-modal-content';
    modal.style.maxWidth = '400px';
    modal.style.textAlign = 'center';
    modal.style.padding = '32px';
    
    modal.innerHTML = `
      <h3 style="color: #fff; margin-bottom: 16px; font-size: 20px;">Konfirmasi Tindakan</h3>
      <p style="color: var(--color-ink-muted); margin-bottom: 32px; line-height: 1.5;">${escapeHtml(message)}</p>
      <div style="display: flex; gap: 16px; justify-content: center;">
        <button class="admin-btn admin-btn-secondary" id="confirm-cancel-btn">Batal</button>
        <button class="admin-btn admin-btn-danger" id="confirm-ok-btn">Ya, Lanjutkan</button>
      </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    const cancelBtn = overlay.querySelector('#confirm-cancel-btn');
    const okBtn = overlay.querySelector('#confirm-ok-btn');

    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.body.removeChild(overlay);
    });
    
    okBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.body.removeChild(overlay);
      if (onConfirm) onConfirm();
    });
  }

  // Toast Helper
  function showToast(message, type = 'success') {
    let container = document.getElementById('admin-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'admin-toast-container';
      container.className = 'admin-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `admin-toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠️'}</span> <span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // SVG Icon Map for Social Cards
  const SOCIAL_ICONS = {
    linkedin: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
    github: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>',
    website: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.81 2h2.95c.32 1.3.79 2.5 1.38 3.56A8.03 8.03 0 0 1 5.07 16zm2.95-8H5.07a8.03 8.03 0 0 1 3.53-3.56A15.65 15.65 0 0 0 7.22 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM4.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.84 5.56c.59-1.06 1.06-2.26 1.38-3.56h2.95a8.03 8.03 0 0 1-3.53 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>',
    whatsapp: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.27-2.42 5.82a8.2 8.2 0 0 1-5.82 2.41c-1.47 0-2.91-.39-4.17-1.14l-.3-.18-3.1 1.02.83-3.02-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.66.81-.81.98-.15.17-.3.19-.55.07a6.94 6.94 0 0 1-2.05-1.26 7.64 7.64 0 0 1-1.42-1.77c-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.41-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.58c.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.3z"/></svg>',
    email: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    telegram: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.26-2.04-.48-.82-.27-1.47-.42-1.42-.88.03-.24.36-.49.99-.75 3.88-1.69 6.47-2.8 7.78-3.34 3.7-1.54 4.47-1.81 4.97-1.82.11 0 .35.03.5.14.13.1.17.24.19.34.02.14.02.29-.01.44z"/></svg>',
    instagram: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    twitter: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
  };

  // DOM RENDERERS

  function renderTheme() {
    if (!currentData || !currentData.settings) return;
    const { primaryColor, primaryHoverColor, pageTitle, metaDescription } = currentData.settings;

    if (primaryColor) {
      document.documentElement.style.setProperty('--color-primary', primaryColor);
    }
    if (primaryHoverColor) {
      document.documentElement.style.setProperty('--color-primary-hover', primaryHoverColor);
    }
    if (pageTitle) {
      document.title = pageTitle;
    }
    if (metaDescription) {
      const metaEl = document.querySelector('meta[name="description"]');
      if (metaEl) metaEl.setAttribute('content', metaDescription);
    }
  }

  function renderHero() {
    const heroWrapper = document.getElementById('about');
    if (!heroWrapper || !currentData.hero) return;

    const { name, headline, bio, profileImage, stats, buttons } = currentData.hero;

    // Brand Name in Navbar
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) navBrand.textContent = name || 'Qois Abdul Qudus';

    let statsHtml = '';
    if (stats && Array.isArray(stats)) {
      statsHtml = stats.map(s => `
        <div class="stat-item">
          <div class="stat-num ${s.highlight ? 'highlight' : ''}">${escapeHtml(s.num)}</div>
          <div class="stat-label">${escapeHtml(s.label)}</div>
        </div>
      `).join('');
    }

    let buttonsHtml = '';
    if (buttons && Array.isArray(buttons)) {
      buttonsHtml = buttons.map(b => `
        <a href="${escapeHtml(b.url)}" target="${b.target || '_self'}" class="btn btn-${b.type || 'secondary'}">${escapeHtml(b.label)}</a>
      `).join('');
    }

    heroWrapper.innerHTML = `
      <div class="hero-content">
        <h1 class="display-xl">${escapeHtml(name)}</h1>
        <h2 class="headline" style="margin-top: 16px;">${escapeHtml(headline)}</h2>
        <p class="body-lg" style="line-height: 1.8; margin-top: 20px;">
          ${escapeHtml(bio)}
        </p>

        <div class="hero-stats">
          ${statsHtml}
        </div>
        <div class="hero-actions">
          ${buttonsHtml}
        </div>
      </div>
      <div class="hero-image-wrapper">
        <div class="profile-glow"></div>
        <img src="${escapeHtml(profileImage)}" alt="${escapeHtml(name)}" class="profile-img" decoding="async" fetchpriority="high">
      </div>
    `;
  }

  function renderProjects() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection || !currentData.projects) return;

    const categories = currentData.filterCategories || [];
    const projects = (currentData.projects || []).filter(p => !p.isHidden);

    let filterBtnsHtml = categories.map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${cat.id}">
        ${escapeHtml(cat.label)} ${cat.id === 'all' ? `(${projects.length})` : ''}
      </button>
    `).join('');

    let projectCardsHtml = projects.map(p => {
      const pills = (p.techStack || []).map(pill => `<span class="tech-pill">${escapeHtml(pill)}</span>`).join('');
      return `
        <div class="card project-card" data-category="${escapeHtml(p.category || 'web')}">
          <div class="project-img-wrapper">
            <span class="project-badge">${escapeHtml(p.badge || '')}</span>
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" class="project-img" loading="lazy" decoding="async">
          </div>
          <div class="project-content">
            <h3 class="card-title">${escapeHtml(p.title)}</h3>
            <div class="associated-tag">${escapeHtml(p.company || '')}</div>
            <p style="color: var(--color-ink-muted); font-size: 14px; margin-bottom: 16px;">
              ${escapeHtml(p.description || '')}
            </p>
            <div class="tech-stack">
              ${pills}
            </div>
            ${p.linkUrl ? `
              <a href="${escapeHtml(p.linkUrl)}" target="_blank" class="project-link-btn">
                ${escapeHtml(p.linkText || 'Visit App ↗')}
              </a>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    projectsSection.innerHTML = `
      <h2 class="display-lg" style="margin-bottom: 16px;">Featured Projects</h2>
      <p style="color: var(--color-ink-muted); margin-bottom: 32px;">Kumpulan proyek aplikasi sistem industri, web platforms, dan mobile game development yang telah saya bangun.</p>

      <div class="filter-container">
        ${filterBtnsHtml}
      </div>

      <div class="semantic-search-container" style="margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">
        <div style="display: flex; gap: 8px;">
          <input type="text" id="semantic-search-input" class="form-input" style="flex: 1;" placeholder="Cari cerdas (misal: aplikasi kasir berbasis web, react native)...">
          <button type="button" id="semantic-search-btn" class="btn btn-primary" style="display: flex; align-items: center; justify-content: center; min-width: 100px;">Cari ✨</button>
        </div>
        <div id="semantic-search-status" style="text-align: center; margin-top: 12px; font-size: 14px; color: var(--color-ink-muted); min-height: 20px;"></div>
      </div>

      <div class="grid-2">
        ${projectCardsHtml}
      </div>
    `;

    // Re-bind filter events
    bindProjectFilters();
  }

  function bindProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        // Reset search input if active
        const searchInput = document.getElementById('semantic-search-input');
        const searchStatus = document.getElementById('semantic-search-status');
        if (searchInput) searchInput.value = '';
        if (searchStatus) searchStatus.textContent = '';

        projectCards.forEach(card => {
          const isMatch = filter === 'all' || card.dataset.category === filter;
          if (isMatch) {
            card.style.display = 'flex';
            requestAnimationFrame(() => card.classList.remove('is-hidden'));
          } else {
            card.classList.add('is-hidden');
            setTimeout(() => {
              if (card.classList.contains('is-hidden')) {
                card.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });

    const searchBtn = document.getElementById('semantic-search-btn');
    const searchInput = document.getElementById('semantic-search-input');
    const searchStatus = document.getElementById('semantic-search-status');

    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (!query) {
          const activeFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
          if (activeFilterBtn) activeFilterBtn.click();
          if (searchStatus) searchStatus.textContent = '';
          return;
        }

        const apiKey = currentData.settings?.geminiApiKey || DEFAULT_DATA.settings.geminiApiKey;
        if (!apiKey) {
          searchStatus.innerHTML = "<span style='color: var(--color-danger);'>Mohon maaf, API Key AI belum dikonfigurasi.</span>";
          return;
        }

        searchBtn.disabled = true;
        searchBtn.innerHTML = 'Mencari... <span class="typing-indicator" style="margin:0; padding:0; height:auto;"><span>.</span><span>.</span><span>.</span></span>';
        searchStatus.textContent = "AI sedang membaca dan menganalisis seluruh proyek...";
        
        // Deactivate filter buttons visually to show we are in AI search mode
        filterButtons.forEach(b => b.classList.remove('active'));
        
        const projectsList = (currentData.projects || []).filter(p => !p.isHidden).map(p => ({
          title: p.title,
          description: p.description,
          techStack: p.techStack
        }));

        const sysPrompt = `Anda adalah mesin pencari semantik cerdas (Semantic Search AI) untuk portofolio Qois.
Pengguna mencari: "${query}"

Daftar proyek yang tersedia:
${JSON.stringify(projectsList)}

Tugas Anda:
Pilih proyek mana saja yang RELEVAN dengan niat/kata kunci pencarian pengguna.
Kembalikan respons Anda HANYA berupa array JSON berisi judul proyek yang relevan secara persis (contoh: ["Judul Proyek 1", "Judul Proyek 2"]). 
Jika tidak ada proyek yang cocok sama sekali, kembalikan array kosong [].
TIDAK BOLEH ADA TEKS TAMBAHAN SELAIN JSON ARRAY. JANGAN GUNAKAN FORMAT MARKDOWN (jangan gunakan \`\`\`json). KEMBALIKAN RAW JSON SAJA.`;

        try {
           const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: sysPrompt }] }]
              })
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0].content.parts[0].text) {
               const resultText = data.candidates[0].content.parts[0].text.trim();
               // Extract JSON array robustly
               const match = resultText.match(/\[.*\]/s);
               if (match) {
                 const matchedTitles = JSON.parse(match[0]);
                 
                 let matchCount = 0;
                 projectCards.forEach(card => {
                    const cardTitle = card.querySelector('.card-title').textContent.trim();
                    if (matchedTitles.includes(cardTitle)) {
                      card.style.display = 'flex';
                      requestAnimationFrame(() => card.classList.remove('is-hidden'));
                      matchCount++;
                    } else {
                      card.classList.add('is-hidden');
                      setTimeout(() => {
                        if (card.classList.contains('is-hidden')) card.style.display = 'none';
                      }, 300);
                    }
                 });
                 
                 if (matchCount > 0) {
                   searchStatus.innerHTML = `<span style="color: var(--color-primary);">✨ AI menemukan ${matchCount} proyek yang relevan.</span>`;
                 } else {
                   searchStatus.innerHTML = "<em>Tidak ditemukan proyek yang cocok dengan pencarian Anda.</em>";
                 }
               } else {
                 searchStatus.innerHTML = "<em>Gagal memproses hasil dari AI.</em>";
               }
            }
        } catch (e) {
            console.error(e);
            searchStatus.innerHTML = "<span style='color: var(--color-danger);'>Terjadi kesalahan jaringan atau AI saat mencari.</span>";
        } finally {
            searchBtn.disabled = false;
            searchBtn.innerHTML = 'Cari ✨';
        }
      });
      
      // Allow pressing Enter in search input
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          searchBtn.click();
        }
      });
    }
  }

  function renderExperience() {
    const expSection = document.getElementById('experience');
    if (!expSection || !currentData.experience) return;

    let itemsHtml = (currentData.experience || []).filter(item => !item.isHidden).map(item => `
      <div class="card">
        <div class="card-meta">${escapeHtml(item.meta || '')}</div>
        <h3 class="card-title">${escapeHtml(item.title || '')}</h3>
        <div style="color: var(--color-ink); margin-bottom: 16px; font-weight: 500;">${escapeHtml(item.company || '')}</div>
        <p style="color: var(--color-ink-muted); font-size: 14px; line-height: 1.7;">
          ${escapeHtml(item.description || '')}
        </p>
      </div>
    `).join('');

    expSection.innerHTML = `
      <h2 class="display-lg" style="margin-bottom: 48px;">Work Experience</h2>
      <div class="grid-2">
        ${itemsHtml}
      </div>
    `;
  }

  function renderEducation() {
    const eduSection = document.getElementById('education');
    if (!eduSection || !currentData.education) return;

    let itemsHtml = (currentData.education || []).filter(item => !item.isHidden).map(item => `
      <div class="card">
        <div class="card-meta">${escapeHtml(item.meta || '')}</div>
        <h3 class="card-title">${escapeHtml(item.title || '')}</h3>
        <div style="color: var(--color-ink); margin-bottom: 16px; font-weight: 500;">${escapeHtml(item.company || '')}</div>
        <p style="color: var(--color-ink-muted); font-size: 14px; line-height: 1.7;">
          ${escapeHtml(item.description || '')}
        </p>
      </div>
    `).join('');

    eduSection.innerHTML = `
      <h2 class="display-lg" style="margin-bottom: 48px;">Education</h2>
      <div class="grid-2">
        ${itemsHtml}
      </div>
    `;
  }

  function renderCertifications() {
    const certSection = document.getElementById('certifications');
    if (!certSection || !currentData.certifications) return;

    const certs = (currentData.certifications || []).filter(c => !c.isHidden);
    let itemsHtml = certs.map(cert => `
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="card-meta">${escapeHtml(cert.meta || '')}</div>
          <h3 class="card-title" style="font-size: 18px; margin-top: 4px;">${escapeHtml(cert.title || '')}</h3>
          <p style="color: var(--color-ink-muted); font-size: 14px; margin-top: 8px;">
            ${escapeHtml(cert.description || '')}
          </p>
        </div>
        ${cert.linkUrl ? `
          <a href="${escapeHtml(cert.linkUrl)}" target="_blank" class="project-link-btn" style="margin-top: 20px; align-self: flex-start;">
            ${escapeHtml(cert.linkText || 'Show Credential ↗')}
          </a>
        ` : ''}
      </div>
    `).join('');

    certSection.innerHTML = `
      <h2 class="display-lg" style="margin-bottom: 16px;">Certifications & Licenses (${certs.length})</h2>
      <p style="color: var(--color-ink-muted); margin-bottom: 32px;">Sertifikasi resmi dan kredensial profesional yang telah divalidasi oleh institusi global & nasional.</p>
      <div class="grid-2">
        ${itemsHtml}
      </div>
    `;
  }

  function renderAIRecruiter() {
    const section = document.getElementById('ai-recruiter');
    if (!section) return;

    section.innerHTML = `
      <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 40px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <div style="display: flex; flex-wrap: wrap; gap: 40px;">
          <div style="flex: 1; min-width: 300px;">
            <h2 class="display-lg" style="margin-bottom: 16px;">AI Cover Letter Generator 🤖</h2>
            <p style="color: var(--color-ink-muted); margin-bottom: 24px;">Khusus untuk Rekruter: Tempelkan (paste) Job Description lowongan Anda di sini. AI akan menganalisis kecocokan profil saya dan langsung membuatkan Cover Letter khusus untuk posisi tersebut.</p>
            
            <form id="ai-recruiter-form" class="smart-contact-form" style="display: block;">
              <div class="form-group">
                <textarea id="recruiter-jd" class="form-textarea" placeholder="Dibutuhkan spesialis IT dengan pengalaman infrastruktur..." required style="min-height: 150px; font-size: 14px;"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" id="recruiter-submit-btn" style="width: 100%; display: flex; justify-content: center; gap: 8px;">Cocokkan dengan Skill Qois ✨</button>
            </form>
          </div>
          
          <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
            <div id="ai-recruiter-response-container" class="ai-response-container" style="display: none; flex: 1; margin-top: 0; background: rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.03);">
              <div class="ai-bubble" style="max-width: 100%; width: 100%;">
                <div class="ai-avatar">🤖</div>
                <div class="ai-message" style="width: 100%;">
                  <span id="ai-recruiter-response-text" style="white-space: pre-wrap; display: block; line-height: 1.6; font-size: 14.5px;"></span>
                  <span id="ai-recruiter-typing-indicator" class="typing-indicator"><span>.</span><span>.</span><span>.</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const form = document.getElementById('ai-recruiter-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const apiKey = currentData.settings?.geminiApiKey || DEFAULT_DATA.settings.geminiApiKey;
        const jdText = document.getElementById('recruiter-jd').value;
        const respContainer = document.getElementById('ai-recruiter-response-container');
        const respText = document.getElementById('ai-recruiter-response-text');
        const typingIndicator = document.getElementById('ai-recruiter-typing-indicator');
        const submitBtn = document.getElementById('recruiter-submit-btn');

        if (!apiKey) {
          respContainer.style.display = 'flex';
          typingIndicator.style.display = 'none';
          respText.innerHTML = "<em>Mohon maaf, API Key AI belum dikonfigurasi.</em>";
          return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Menganalisis Kecocokan... <span class="typing-indicator" style="margin:0; padding:0; height:auto;"><span>.</span><span>.</span><span>.</span></span>';
        respContainer.style.display = 'flex';
        respText.innerHTML = '';
        typingIndicator.style.display = 'inline-block';

        const sysPrompt = `Anda adalah asisten AI yang bertindak sebagai representasi profesional dari Qois Abdul Qudus.
Tugas Anda: Membaca Job Description (JD) berikut, membandingkannya dengan profil Qois, lalu menuliskan **Cover Letter** (Surat Lamaran) yang sangat persuasif, profesional, dan menyoroti secara logis mengapa Qois sangat cocok dengan posisi tersebut berdasarkan pengalaman nyatanya.

Profil Singkat Qois:
${JSON.stringify(currentData.hero, null, 2)}
Pengalaman:
${JSON.stringify(currentData.experience, null, 2)}
Proyek:
${JSON.stringify(currentData.projects, null, 2)}
Sertifikasi:
${JSON.stringify(currentData.certifications, null, 2)}

Job Description dari Rekruter:
${jdText}

Instruksi Tambahan:
- Tuliskan dalam format Cover Letter langsung (Dear Hiring Manager, dst).
- Gunakan bahasa Indonesia baku yang elegan, sopan, namun percaya diri (bukan terkesan mengemis).
- Buat maksimal 3-4 paragraf yang padat dan jelas.
- Secara eksplisit sebutkan kecocokan antara syarat di JD dengan pengalaman/proyek Qois (jangan mengarang skill yang tidak ada di profil Qois).
- Jika ada skill di JD yang tidak dimiliki Qois, tekankan kemampuan Qois untuk belajar cepat beradaptasi.`;

        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: sysPrompt }] }]
            })
          });

          const data = await response.json();
          typingIndicator.style.display = 'none';

          if (data.candidates && data.candidates[0].content.parts[0].text) {
            let replyText = data.candidates[0].content.parts[0].text;
            let i = 0;
            respText.innerHTML = '';
            
            // Fast typewriter effect
            const typeWriter = setInterval(() => {
              if (i < replyText.length) {
                const char = replyText.charAt(i);
                respText.innerHTML += char === '\\n' ? '<br>' : char;
                i++;
              } else {
                clearInterval(typeWriter);
              }
            }, 10); // Very fast typing
          } else {
             respText.innerHTML = "<em>Gagal menganalisis. AI memberikan respons kosong.</em>";
          }
        } catch (err) {
          typingIndicator.style.display = 'none';
          respText.innerHTML = '<em>Terjadi kesalahan jaringan saat menghubungi AI. Silakan coba lagi.</em>';
          console.error(err);
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Cocokkan dengan Skill Qois ✨';
        }
      });
    }
  }

  function renderSocials() {
    const contactSection = document.getElementById('contact');
    if (!contactSection || !currentData.socials) return;

    let itemsHtml = (currentData.socials || []).filter(s => !s.isHidden).map(s => {
      const iconSvg = SOCIAL_ICONS[s.iconType] || SOCIAL_ICONS.website;
      return `
        <a href="${escapeHtml(s.url)}" target="_blank" class="social-card">
          <div class="social-icon">
            ${iconSvg}
          </div>
          <div class="social-info">
            <h4>${escapeHtml(s.platform)}</h4>
            <p>${escapeHtml(s.handle)}</p>
          </div>
        </a>
      `;
    }).join('');

    contactSection.innerHTML = `
      <div class="contact-wrapper">
        <!-- Smart Contact Form -->
        <div class="contact-form-side">
          <h2 class="display-lg" style="margin-bottom: 16px;">Tinggalkan Pesan</h2>
          <p style="color: var(--color-ink-muted); margin-bottom: 32px;">Pesan Anda akan direspons otomatis oleh asisten AI cerdas kami.</p>
          
          <form id="smart-contact-form" class="smart-contact-form">
            <div class="form-group">
              <label for="contact-name">Email Anda</label>
              <input type="email" id="contact-name" class="form-input" placeholder="Masukkan email..." required>
            </div>
            <div class="form-group">
              <label for="contact-msg">Pesan / Tawaran</label>
              <textarea id="contact-msg" class="form-textarea" placeholder="Hai Qois, kami tertarik untuk menawari Anda posisi..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" id="contact-submit-btn">Kirim Pesan ke AI 🚀</button>
          </form>

          <div id="ai-response-container" class="ai-response-container" style="display: none;">
            <div class="ai-bubble">
              <div class="ai-avatar">🤖</div>
              <div class="ai-message">
                <span id="ai-response-text"></span>
                <span id="ai-typing-indicator" class="typing-indicator"><span>.</span><span>.</span><span>.</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Socials -->
        <div class="contact-social-side">
          <h2 class="display-lg" style="margin-bottom: 16px;">Connect & Socials</h2>
          <p style="color: var(--color-ink-muted); margin-bottom: 32px;">Mari terhubung melalui jejaring profesional dan media sosial saya.</p>
          <div class="social-grid">
            ${itemsHtml}
          </div>
        </div>
      </div>
    `;

    // Smart Contact Form Logic
    const contactForm = document.getElementById('smart-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const apiKey = currentData.settings?.geminiApiKey || DEFAULT_DATA.settings.geminiApiKey;
        const name = document.getElementById('contact-name').value;
        const message = document.getElementById('contact-msg').value;
        const respContainer = document.getElementById('ai-response-container');
        const respText = document.getElementById('ai-response-text');
        const typingIndicator = document.getElementById('ai-typing-indicator');
        const submitBtn = document.getElementById('contact-submit-btn');

        // Simpan pesan ke history
        if (!currentData.messages) currentData.messages = [];
        currentData.messages.push({
          name: name,
          message: message,
          date: new Date().toISOString()
        });
        saveSiteData(currentData, true);

        if (!apiKey) {
          respContainer.style.display = 'flex';
          typingIndicator.style.display = 'none';
          respText.innerHTML = "<em>Mohon maaf, asisten AI sedang offline (API Key belum dikonfigurasi di Panel Pemilik). Pesan Anda tetap kami hargai.</em>";
          return;
        }

        // Tampilkan loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Mengirim...";
        respContainer.style.display = 'flex';
        respText.innerHTML = "";
        typingIndicator.style.display = 'inline-block';

        // Buat prompt untuk AI
        const promptText = `
        Anda adalah asisten virtual cerdas untuk portofolio Qois Abdul Qudus.
        Profil Qois: ${currentData.hero?.headline}. ${currentData.hero?.bio}.
        Pengirim pesan: ${name}
        Pesan: "${message}"
        Tugas Anda:
        Berikan balasan singkat, ramah, dan profesional dalam bahasa Indonesia. 
        Ucapkan terima kasih kepada ${name}. Jika pesannya berisi tawaran proyek atau pekerjaan, tunjukkan ketertarikan dan sampaikan bahwa Qois akan segera membalasnya via email. Jangan terlalu panjang, maksimal 3 kalimat.
        `;

        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }]
            })
          });

          const data = await response.json();
          typingIndicator.style.display = 'none';

          if (data.candidates && data.candidates[0].content.parts[0].text) {
            let replyText = data.candidates[0].content.parts[0].text;
            // Typewriter effect
            let i = 0;
            respText.innerHTML = '';
            const typeWriter = setInterval(() => {
              if (i < replyText.length) {
                respText.innerHTML += replyText.charAt(i);
                i++;
              } else {
                clearInterval(typeWriter);
              }
            }, 30);
          } else {
            respText.innerHTML = "Terima kasih atas pesannya! Qois akan segera merespons.";
          }
        } catch (error) {
          typingIndicator.style.display = 'none';
          respText.innerHTML = "Maaf, terjadi kesalahan saat menghubungi asisten AI. Qois akan segera mengecek pesan Anda.";
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Kirim Pesan ke AI 🚀";
        }
      });
    }
  }

  function renderFooter() {
    const footerEl = document.querySelector('footer');
    if (!footerEl || !currentData.footer) return;

    footerEl.innerHTML = `
            <p style = "color: var(--color-ink-subtle); font-size: 14px;" >
            ${escapeHtml(currentData.footer.text || '')
      }
      </p >
          `;
  }

  function renderAll() {
    renderTheme();
    renderHero();
    renderProjects();
    renderExperience();
    renderEducation();
    renderCertifications();
    renderAIRecruiter();
    renderSocials();
    renderFooter();
  }

  // ADMIN PANEL UI SYSTEM

  let activeTab = 'hero';

  function initAdminUI() {
    // Attach event to hardcoded Admin Button in Navbar
    const ownerBtn = document.getElementById('ownerBtn');
    if (ownerBtn) {
      ownerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAdminModal();
      });
    }

    // Secret shortcut to open Admin Panel: Alt + Q
    document.addEventListener('keydown', (e) => {
      if (e.altKey && !e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        openAdminModal();
      }
    });

    // Inject Backdrop Container for Modal/Login
    const backdrop = document.createElement('div');
    backdrop.className = 'admin-modal-backdrop';
    backdrop.id = 'admin-modal-backdrop';
    document.body.appendChild(backdrop);


  }

  function isAuthorized() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  function openAdminModal() {
    const backdrop = document.getElementById('admin-modal-backdrop');
    if (!backdrop) return;

    backdrop.innerHTML = '';
    backdrop.classList.add('active');

    if (!isAuthorized()) {
      renderLoginCard(backdrop);
    } else {
      renderAdminPanel(backdrop);
    }
  }

  function closeAdminModal() {
    const backdrop = document.getElementById('admin-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
    }
  }

  function renderLoginCard(container) {
    container.innerHTML = `
          <div class="admin-login-card" >
        <h3 class="admin-login-title">🔐 Panel Pemilik</h3>
        <p class="admin-login-subtitle">Masukkan Kata Sandi / PIN untuk melanjutkan</p>
        <div class="admin-form-group">
          <input type="password" id="admin-pass-input" class="admin-input" placeholder="Masukkan Kata Sandi" autofocus>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <button type="button" class="admin-btn admin-btn-secondary" style="flex:1;" id="admin-login-cancel">Batal</button>
          <button type="button" class="admin-btn admin-btn-primary" style="flex:1;" id="admin-login-submit">Masuk</button>
        </div>
      </div >
          `;

    const passInput = document.getElementById('admin-pass-input');
    const submitBtn = document.getElementById('admin-login-submit');
    const cancelBtn = document.getElementById('admin-login-cancel');

    function handleLogin() {
      const pwd = passInput.value;
      const expected = currentData.settings?.password || 'admin123';
      if (pwd === expected) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        showToast('Login berhasil!', 'success');
        renderAdminPanel(container);
      } else {
        showToast('Kata sandi salah!', 'danger');
        passInput.value = '';
        passInput.focus();
      }
    }

    submitBtn.addEventListener('click', handleLogin);
    passInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
    cancelBtn.addEventListener('click', closeAdminModal);
  }

  function renderAdminPanel(container) {
    container.innerHTML = `
          <div class="admin-panel-container" >
        <!--Header -->
        <div class="admin-header">
          <div class="admin-header-title">
            <span>⚙️ Panel Pengelola Tampilan</span>
            <span class="admin-header-badge">Live Editor</span>
          </div>
          <div class="admin-header-actions">
            <button class="admin-btn admin-btn-secondary" id="admin-logout-btn" title="Keluar Mode Admin">Logout</button>
            <button class="admin-close-btn" id="admin-close-btn" title="Tutup Modal">&times;</button>
          </div>
        </div>

        <!--Body -->
          <div class="admin-body">
            <!-- Sidebar Navigation -->
            <div class="admin-sidebar">
              <button class="admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}" data-tab="hero">👤 Hero & Profil</button>
              <button class="admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}" data-tab="projects">🚀 Projects (${currentData.projects.length})</button>
              <button class="admin-tab-btn ${activeTab === 'experience' ? 'active' : ''}" data-tab="experience">💼 Pengalaman</button>
              <button class="admin-tab-btn ${activeTab === 'education' ? 'active' : ''}" data-tab="education">🎓 Pendidikan</button>
              <button class="admin-tab-btn ${activeTab === 'certifications' ? 'active' : ''}" data-tab="certifications">📜 Sertifikasi</button>
              <button class="admin-tab-btn ${activeTab === 'socials' ? 'active' : ''}" data-tab="socials">🌐 Kontak & Sosmed</button>
              <button class="admin-tab-btn ${activeTab === 'theme' ? 'active' : ''}" data-tab="theme">🎨 Tema & Tampilan</button>
              <button class="admin-tab-btn ${activeTab === 'inbox' ? 'active' : ''}" data-tab="inbox">✉️ Inbox Pesan</button>
              <button class="admin-tab-btn ${activeTab === 'backup' ? 'active' : ''}" data-tab="backup">⚙️ Backup & Pengaturan</button>
            </div>

            <!-- Main Content Area -->
            <div class="admin-content" id="admin-content-area">
              <!-- Dynamic Content Form -->
            </div>
          </div>
      </div >
          `;

    document.getElementById('admin-close-btn').addEventListener('click', closeAdminModal);
    document.getElementById('admin-logout-btn').addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_KEY);
      showToast('Sudah keluar dari mode admin', 'success');
      closeAdminModal();
    });

    const tabBtns = container.querySelectorAll('.admin-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTab = btn.dataset.tab;
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        renderActiveTabContent();
      });
    });

    const activeBtn = container.querySelector('.admin-tab-btn.active');
    if (activeBtn) {
      setTimeout(() => {
        activeBtn.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
      }, 50);
    }

    renderActiveTabContent();
  }

  function renderActiveTabContent() {
    const area = document.getElementById('admin-content-area');
    if (!area) return;

    if (activeTab === 'hero') renderTabHero(area);
    else if (activeTab === 'projects') renderTabProjects(area);
    else if (activeTab === 'experience') renderTabExperience(area);
    else if (activeTab === 'education') renderTabEducation(area);
    else if (activeTab === 'certifications') renderTabCertifications(area);
    else if (activeTab === 'socials') renderTabSocials(area);
    else if (activeTab === 'theme') renderTabTheme(area);
    else if (activeTab === 'inbox') renderTabInbox(area);
    else if (activeTab === 'backup') renderTabBackup(area);
  }

  // TAB EDITORS

  // 1. HERO TAB
  function renderTabHero(container) {
    const hero = currentData.hero || {};
    const stats = hero.stats || [];

    let statsInputsHtml = stats.map((st, i) => `
          <div class="admin-row" style = "margin-bottom:12px; align-items:center;" >
        <div>
          <label class="admin-label">Angka Stat #${i + 1}</label>
          <input type="text" class="admin-input" id="hero-stat-num-${i}" value="${escapeHtml(st.num || '')}">
        </div>
        <div>
          <label class="admin-label">Label Stat #${i + 1}</label>
          <input type="text" class="admin-input" id="hero-stat-label-${i}" value="${escapeHtml(st.label || '')}">
        </div>
        <div style="display:flex; align-items:center; gap:8px; margin-top:20px;">
          <input type="checkbox" id="hero-stat-high-${i}" ${st.highlight ? 'checked' : ''}>
          <label for="hero-stat-high-${i}" style="color:#d0d5e0; font-size:13px;">Highlight Accent</label>
        </div>
      </div >
          `).join('');

    container.innerHTML = `
          <h3 class="admin-section-title" >👤 Kelola Hero & Profil Utama</h3 >
      <p class="admin-section-desc">Ubah nama lengkap, headline profesi, deskripsi bio, stat angka cepat, dan foto profil Anda.</p>

      <form id="hero-form">
        <div class="admin-row">
          <div class="admin-form-group">
            <label class="admin-label">Nama Lengkap</label>
            <input type="text" id="hero-name" class="admin-input" value="${escapeHtml(hero.name || '')}">
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Headline Profesioanal</label>
            <input type="text" id="hero-headline" class="admin-input" value="${escapeHtml(hero.headline || '')}">
          </div>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Bio Singkat / Ringkasan Diri</label>
          <textarea id="hero-bio" class="admin-textarea">${escapeHtml(hero.bio || '')}</textarea>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Foto Profil (URL atau Upload File Gambar)</label>
          <input type="text" id="hero-profile-img-url" class="admin-input" value="${escapeHtml(hero.profileImage || '')}" placeholder="Contoh: profile.png atau https://...">
          <div class="admin-img-preview-box">
            <img src="${escapeHtml(hero.profileImage || 'profile.png')}" id="hero-profile-img-preview" class="admin-img-preview" alt="Preview">
            <div class="admin-file-input-wrapper">
              <button type="button" class="admin-btn admin-btn-secondary">📁 Upload Gambar Baru</button>
              <input type="file" id="hero-img-file-input" accept="image/*">
            </div>
          </div>
        </div>

        <h4 style="color:#fff; font-size:16px; margin: 24px 0 12px 0;">📊 Quick Stats</h4>
        ${statsInputsHtml}

        <div style="margin-top: 32px;">
          <button type="submit" class="admin-btn admin-btn-primary">💾 Simpan Perubahan Hero</button>
        </div>
      </form>
        `;

    // Handle File Upload Preview
    const fileInput = document.getElementById('hero-img-file-input');
    const urlInput = document.getElementById('hero-profile-img-url');
    const imgPreview = document.getElementById('hero-profile-img-preview');

    fileInput.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        processImageFile(this.files[0], (base64Url) => {
          urlInput.value = base64Url;
          imgPreview.src = base64Url;
        });
      }
    });

    urlInput.addEventListener('input', function () {
      imgPreview.src = this.value;
    });

    // Form Submit
    document.getElementById('hero-form').addEventListener('submit', function (e) {
      e.preventDefault();
      currentData.hero.name = document.getElementById('hero-name').value;
      currentData.hero.headline = document.getElementById('hero-headline').value;
      currentData.hero.bio = document.getElementById('hero-bio').value;
      currentData.hero.profileImage = document.getElementById('hero-profile-img-url').value;

      stats.forEach((st, i) => {
        st.num = document.getElementById(`hero-stat-num-${i}`).value;
        st.label = document.getElementById(`hero-stat-label-${i}`).value;
        st.highlight = document.getElementById(`hero-stat-high-${i}`).checked;
      });

      saveSiteData(currentData);
      showToast('Profil Beranda berhasil disimpan!', 'success');
    });
  }

  // 2. PROJECTS TAB
  function renderTabProjects(container) {
    const projects = currentData.projects || [];
    const categories = currentData.filterCategories || [];

    let projectCardsHtml = projects.map((p, index) => {
      const categoryOptions = categories.filter(c => c.id !== 'all').map(c => `
          <option value = "${c.id}" ${p.category === c.id ? 'selected' : ''}> ${escapeHtml(c.label)}</option >
            `).join('');

      // On mobile/desktop, index 0 is open, others start collapsed for ultra clean view
      const isCollapsed = index > 0;

      return `
            <div class="admin-card-item ${isCollapsed ? 'collapsed' : ''}" data - index="${index}" >
          <div class="admin-card-header" title="Klik untuk buka/tutup rincian">
            <div class="admin-card-item-title">
              <span class="admin-card-chevron">▼</span>
              <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">🚀 #${index + 1} - ${escapeHtml(p.title || 'Proyek Tanpa Judul')}</span>
            </div>
            <div class="admin-card-actions">
              ${index > 0 ? `<button type="button" class="admin-btn admin-btn-secondary admin-btn-icon move-project-up-btn" data-index="${index}" title="Naikkan">⬆️</button>` : ''}
              ${index < projects.length - 1 ? `<button type="button" class="admin-btn admin-btn-secondary admin-btn-icon move-project-down-btn" data-index="${index}" title="Turunkan">⬇️</button>` : ''}
              <button type="button" class="admin-btn admin-btn-secondary admin-btn-icon proj-hide-btn" data-index="${index}" title="${p.isHidden ? 'Tampilkan di Portfolio' : 'Sembunyikan dari Portfolio'}">${p.isHidden ? '👁️‍🗨️' : '👁️'}</button>
              <button type="button" class="admin-btn admin-btn-danger admin-btn-icon delete-project-btn" data-index="${index}" title="Hapus Proyek">🗑️ Hapus</button>
            </div>
          </div>

          <div class="admin-card-body">
            <div class="admin-row">
              <div class="admin-form-group">
                <label class="admin-label">Judul Proyek</label>
                <input type="text" class="admin-input proj-title" value="${escapeHtml(p.title || '')}">
              </div>
              <div class="admin-form-group">
                <label class="admin-label">Perusahaan / Instansi Associated</label>
                <input type="text" class="admin-input proj-company" value="${escapeHtml(p.company || '')}">
              </div>
            </div>

            <div class="admin-row">
              <div class="admin-form-group">
                <label class="admin-label">Badge Periode (Waktu)</label>
                <input type="text" class="admin-input proj-badge" value="${escapeHtml(p.badge || '')}">
              </div>
              <div class="admin-form-group">
                <label class="admin-label">Kategori Filter</label>
                <select class="admin-select proj-category">
                  ${categoryOptions}
                </select>
              </div>
            </div>

            <div class="admin-form-group">
              <label class="admin-label">Deskripsi Singkat</label>
              <textarea class="admin-textarea proj-desc">${escapeHtml(p.description || '')}</textarea>
            </div>

            <div class="admin-row">
              <div class="admin-form-group">
                <label class="admin-label">Tech Stack (pisahkan dengan koma)</label>
                <input type="text" class="admin-input proj-tech" value="${escapeHtml((p.techStack || []).join(', '))}">
              </div>
              <div class="admin-form-group">
                <label class="admin-label">Tautan Proyek (URL)</label>
                <input type="text" class="admin-input proj-link-url" value="${escapeHtml(p.linkUrl || '')}">
              </div>
            </div>

            <div class="admin-form-group">
              <label class="admin-label">Gambar Proyek (URL atau Upload File)</label>
              <input type="text" class="admin-input proj-img-url" value="${escapeHtml(p.image || '')}">
              <div class="admin-img-preview-box">
                <img src="${escapeHtml(p.image || '')}" class="admin-img-preview proj-img-preview" alt="Preview">
                <div class="admin-file-input-wrapper">
                  <button type="button" class="admin-btn admin-btn-secondary">📁 Upload Gambar Proyek</button>
                  <input type="file" class="proj-img-file-input" accept="image/*">
                </div>
              </div>
            </div>
          </div>
        </div >
          `;
    }).join('');

    container.innerHTML = `
          <div class="admin-section-topbar" >
        <div>
          <h3 class="admin-section-title">🚀 Kelola Proyek Portfolio (${projects.length})</h3>
          <p class="admin-section-desc">Tambah, ubah, urutkan, atau hapus proyek aplikasi yang ditampilkan di portofolio.</p>
        </div>
        <div class="admin-section-topbar-actions">
          <button type="button" class="admin-btn admin-btn-secondary" id="toggle-all-projects-btn">↔️ Buka / Tutup Semua</button>
          <button type="button" class="admin-btn admin-btn-primary" id="add-project-btn">➕ Tambah Proyek Baru</button>
        </div>
      </div >

          <form id="projects-form">
            <div id="projects-list-container">
              ${projectCardsHtml}
            </div>

            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
              <button type="submit" class="admin-btn admin-btn-primary" style="width:100%;">💾 Simpan Semua Proyek</button>
            </div>
          </form>
        `;

    const listContainer = document.getElementById('projects-list-container');

    // Accordion Header Click Listener
    listContainer.querySelectorAll('.admin-card-item').forEach(card => {
      const header = card.querySelector('.admin-card-header');
      if (header) {
        header.addEventListener('click', (e) => {
          if (e.target.closest('.admin-card-actions')) return;
          card.classList.toggle('collapsed');
        });
      }

      const fileInput = card.querySelector('.proj-img-file-input');
      const urlInput = card.querySelector('.proj-img-url');
      const imgPreview = card.querySelector('.proj-img-preview');

      if (fileInput && urlInput && imgPreview) {
        fileInput.addEventListener('change', function () {
          if (this.files && this.files[0]) {
            processImageFile(this.files[0], (base64Url) => {
              urlInput.value = base64Url;
              imgPreview.src = base64Url;
            });
          }
        });

        urlInput.addEventListener('input', function () {
          imgPreview.src = this.value;
        });
      }
    });

    // Expand/Collapse All Button
    let allCollapsed = true;
    const toggleAllBtn = document.getElementById('toggle-all-projects-btn');
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        const cards = listContainer.querySelectorAll('.admin-card-item');
        cards.forEach(c => c.classList.toggle('collapsed', !allCollapsed));
        allCollapsed = !allCollapsed;
      });
    }

    // Delete Button
    listContainer.querySelectorAll('.delete-project-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        showConfirmModal('Yakin ingin menghapus proyek ini?', () => {
          currentData.projects.splice(idx, 1);
          renderTabProjects(container);
          showToast('Proyek berhasil dihapus', 'danger');
        });
      });
    });

    // Move Up / Down
    listContainer.querySelectorAll('.move-project-up-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        if (idx > 0) {
          const temp = currentData.projects[idx];
          currentData.projects[idx] = currentData.projects[idx - 1];
          currentData.projects[idx - 1] = temp;
          renderTabProjects(container);
        }
      });
    });

    listContainer.querySelectorAll('.move-project-down-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        if (idx < currentData.projects.length - 1) {
          const temp = currentData.projects[idx];
          currentData.projects[idx] = currentData.projects[idx + 1];
          currentData.projects[idx + 1] = temp;
          renderTabProjects(container);
        }
      });
    });

    // Hide Button
    listContainer.querySelectorAll('.proj-hide-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isHidden = this.textContent.includes('👁️‍🗨️');
        if (isHidden) {
          this.textContent = '👁️';
          this.title = 'Sembunyikan dari Portfolio';
        } else {
          this.textContent = '👁️‍🗨️';
          this.title = 'Tampilkan di Portfolio';
        }
      });
    });

    // Add Project Button
    document.getElementById('add-project-btn').addEventListener('click', () => {
      currentData.projects.unshift({
        id: 'p_' + Date.now(),
        title: 'Proyek Baru',
        company: 'Instansi / Klien',
        badge: 'Aug 2026 – Present',
        category: 'enterprise',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
        description: 'Deskripsi proyek baru yang menarik...',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        linkUrl: 'https://',
        linkText: 'Visit App ↗'
      });
      renderTabProjects(container);
      showToast('Proyek baru ditambahkan ke daftar!', 'success');
    });

    // Form Submit (Save all projects)
    document.getElementById('projects-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const cardNodes = listContainer.querySelectorAll('.admin-card-item');
      const hideBtns = listContainer.querySelectorAll('.proj-hide-btn');
      const updatedProjects = [];

      cardNodes.forEach((card, i) => {
        const orig = currentData.projects[i] || {};
        const techStr = card.querySelector('.proj-tech').value || '';
        const techStack = techStr.split(',').map(s => s.trim()).filter(Boolean);

        updatedProjects.push({
          id: orig.id || ('p_' + Date.now() + '_' + i),
          title: card.querySelector('.proj-title').value,
          company: card.querySelector('.proj-company').value,
          badge: card.querySelector('.proj-badge').value,
          category: card.querySelector('.proj-category').value,
          description: card.querySelector('.proj-desc').value,
          techStack: techStack,
          linkUrl: card.querySelector('.proj-link-url').value,
          linkText: orig.linkText || 'Visit App ↗',
          image: card.querySelector('.proj-img-url').value,
          isHidden: hideBtns[i] ? hideBtns[i].textContent.includes('👁️‍🗨️') : false
        });
      });

      currentData.projects = updatedProjects;
      saveSiteData(currentData);
      showToast('Semua Proyek berhasil disimpan!', 'success');
    });
  }

  // 3. EXPERIENCE TAB
  function renderTabExperience(container) {
    const experience = currentData.experience || [];
    renderGenericListEditor(container, {
      title: '💼 Kelola Pengalaman Kerja',
      desc: 'Tambah, ubah, atau hapus riwayat pengalaman karir pekerjaan Anda.',
      items: experience,
      onSave: (newList) => {
        currentData.experience = newList;
        saveSiteData(currentData);
      },
      newItemTemplate: {
        id: 'exp_' + Date.now(),
        meta: '2026 – Present • Kota',
        title: 'Posisi / Jabatan Baru',
        company: 'Nama Perusahaan',
        description: 'Tuliskan tanggung jawab dan pencapaian Anda di posisi ini...'
      }
    });
  }

  // 4. EDUCATION TAB
  function renderTabEducation(container) {
    const education = currentData.education || [];
    renderGenericListEditor(container, {
      title: '🎓 Kelola Riwayat Pendidikan',
      desc: 'Kelola daftar riwayat pendidikan formal dan gelar yang Anda tempuh.',
      items: education,
      onSave: (newList) => {
        currentData.education = newList;
        saveSiteData(currentData);
      },
      newItemTemplate: {
        id: 'edu_' + Date.now(),
        meta: '2020 – 2024',
        title: 'Gelar / Program Studi',
        company: 'Universitas / Institusi',
        description: 'Penjelasan mengenai studi dan pencapaian akademik...'
      }
    });
  }

  // 5. CERTIFICATIONS TAB
  function renderTabCertifications(container) {
    const certs = currentData.certifications || [];
    let itemsHtml = certs.map((c, i) => `
          <div class="admin-card-item ${i > 0 ? 'collapsed' : ''}" data - index="${i}" >
        <div class="admin-card-header" title="Klik untuk buka/tutup rincian">
          <div class="admin-card-item-title">
            <span class="admin-card-chevron">▼</span>
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">📜 #${i + 1} - ${escapeHtml(c.title || 'Sertifikat')}</span>
          </div>
          <div class="admin-card-actions">
            ${i > 0 ? `<button type="button" class="admin-btn admin-btn-secondary admin-btn-icon cert-up-btn" data-index="${i}">⬆️</button>` : ''}
            ${i < certs.length - 1 ? `<button type="button" class="admin-btn admin-btn-secondary admin-btn-icon cert-down-btn" data-index="${i}">⬇️</button>` : ''}
            <button type="button" class="admin-btn admin-btn-secondary admin-btn-icon cert-hide-btn" data-index="${i}" title="${c.isHidden ? 'Tampilkan' : 'Sembunyikan'}">${c.isHidden ? '👁️‍🗨️' : '👁️'}</button>
            <button type="button" class="admin-btn admin-btn-danger admin-btn-icon cert-del-btn" data-index="${i}">🗑️</button>
          </div>
        </div>

        <div class="admin-card-body">
          <div class="admin-row">
            <div class="admin-form-group">
              <label class="admin-label">Penerbit / Meta (mis: Dicoding • ID: 123)</label>
              <input type="text" class="admin-input cert-meta" value="${escapeHtml(c.meta || '')}">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Nama Sertifikasi</label>
              <input type="text" class="admin-input cert-title" value="${escapeHtml(c.title || '')}">
            </div>
          </div>

          <div class="admin-form-group">
            <label class="admin-label">Keterangan Singkat</label>
            <textarea class="admin-textarea cert-desc">${escapeHtml(c.description || '')}</textarea>
          </div>

          <div class="admin-row">
            <div class="admin-form-group">
              <label class="admin-label">Link Verifikasi / Kredensial (URL)</label>
              <input type="text" class="admin-input cert-link" value="${escapeHtml(c.linkUrl || '')}">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Teks Tombol Link (mis: Verify Credential ↗)</label>
              <input type="text" class="admin-input cert-link-text" value="${escapeHtml(c.linkText || 'Show Credential ↗')}">
            </div>
          </div>
        </div>
      </div >
          `).join('');

    container.innerHTML = `
          <div class="admin-section-topbar" >
        <div>
          <h3 class="admin-section-title">📜 Kelola Sertifikasi & Lisensi (${certs.length})</h3>
          <p class="admin-section-desc">Atur kredensial profesional dan sertifikasi resmi Anda.</p>
        </div>
        <div class="admin-section-topbar-actions">
          <button type="button" class="admin-btn admin-btn-secondary" id="toggle-all-certs-btn">↔️ Buka / Tutup Semua</button>
          <button type="button" class="admin-btn admin-btn-primary" id="add-cert-btn">➕ Tambah Sertifikat</button>
        </div>
      </div >

          <form id="cert-form">
            <div id="cert-list-container">
              ${itemsHtml}
            </div>
            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
              <button type="submit" class="admin-btn admin-btn-primary" style="width:100%;">💾 Simpan Semua Sertifikasi</button>
            </div>
          </form>
        `;

    const listContainer = document.getElementById('cert-list-container');

    // Accordion Header Toggle
    listContainer.querySelectorAll('.admin-card-item').forEach(card => {
      const header = card.querySelector('.admin-card-header');
      if (header) {
        header.addEventListener('click', (e) => {
          if (e.target.closest('.admin-card-actions')) return;
          card.classList.toggle('collapsed');
        });
      }
    });

    // Expand/Collapse All
    let allCollapsed = true;
    const toggleAllBtn = document.getElementById('toggle-all-certs-btn');
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        const cards = listContainer.querySelectorAll('.admin-card-item');
        cards.forEach(c => c.classList.toggle('collapsed', !allCollapsed));
        allCollapsed = !allCollapsed;
      });
    }

    listContainer.querySelectorAll('.cert-del-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        showConfirmModal('Yakin ingin menghapus sertifikasi ini?', () => {
          currentData.certifications.splice(idx, 1);
          renderTabCertifications(container);
          showToast('Sertifikasi berhasil dihapus', 'danger');
        });
      });
    });

    listContainer.querySelectorAll('.cert-up-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        if (idx > 0) {
          const temp = currentData.certifications[idx];
          currentData.certifications[idx] = currentData.certifications[idx - 1];
          currentData.certifications[idx - 1] = temp;
          renderTabCertifications(container);
        }
      });
    });

    listContainer.querySelectorAll('.cert-down-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        if (idx < currentData.certifications.length - 1) {
          const temp = currentData.certifications[idx];
          currentData.certifications[idx] = currentData.certifications[idx + 1];
          currentData.certifications[idx + 1] = temp;
          renderTabCertifications(container);
        }
      });
    });

    listContainer.querySelectorAll('.cert-hide-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isHidden = this.textContent.includes('👁️‍🗨️');
        if (isHidden) {
          this.textContent = '👁️';
          this.title = 'Sembunyikan';
        } else {
          this.textContent = '👁️‍🗨️';
          this.title = 'Tampilkan';
        }
      });
    });

    document.getElementById('add-cert-btn').addEventListener('click', () => {
      currentData.certifications.unshift({
        id: 'cert_' + Date.now(),
        meta: 'Penerbit Sertifikat',
        title: 'Nama Sertifikasi Baru',
        description: 'Penjelasan kompetensi atau materi sertifikasi...',
        linkUrl: 'https://',
        linkText: 'Verify Credential ↗'
      });
      renderTabCertifications(container);
    });

    document.getElementById('cert-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const cardNodes = listContainer.querySelectorAll('.admin-card-item');
      const updated = [];

      const hideBtns = listContainer.querySelectorAll('.cert-hide-btn');

      cardNodes.forEach((card, i) => {
        const orig = currentData.certifications[i] || {};
        updated.push({
          id: orig.id || ('cert_' + Date.now() + '_' + i),
          meta: card.querySelector('.cert-meta').value,
          title: card.querySelector('.cert-title').value,
          description: card.querySelector('.cert-desc').value,
          linkUrl: card.querySelector('.cert-link').value,
          linkText: card.querySelector('.cert-link-text').value,
          isHidden: hideBtns[i] ? hideBtns[i].textContent.includes('👁️‍🗨️') : false
        });
      });

      currentData.certifications = updated;
      saveSiteData(currentData);
      showToast('Sertifikasi berhasil disimpan!', 'success');
    });
  }

  // 6. SOCIALS TAB
  function renderTabSocials(container) {
    const socials = currentData.socials || [];
    let itemsHtml = socials.map((s, i) => `
          <div class="admin-card-item ${i > 0 ? 'collapsed' : ''}" data - index="${i}" >
        <div class="admin-card-header" title="Klik untuk buka/tutup rincian">
          <div class="admin-card-item-title">
            <span class="admin-card-chevron">▼</span>
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">🌐 #${i + 1} - ${escapeHtml(s.platform)}</span>
          </div>
          <div class="admin-card-actions">
            ${i > 0 ? `<button type="button" class="admin-btn admin-btn-secondary admin-btn-icon soc-up-btn" data-index="${i}">⬆️</button>` : ''}
            ${i < socials.length - 1 ? `<button type="button" class="admin-btn admin-btn-secondary admin-btn-icon soc-down-btn" data-index="${i}">⬇️</button>` : ''}
            <button type="button" class="admin-btn admin-btn-secondary admin-btn-icon soc-hide-btn" data-index="${i}" title="${s.isHidden ? 'Tampilkan' : 'Sembunyikan'}">${s.isHidden ? '👁️‍🗨️' : '👁️'}</button>
            <button type="button" class="admin-btn admin-btn-danger admin-btn-icon soc-del-btn" data-index="${i}">🗑️</button>
          </div>
        </div>

        <div class="admin-card-body">
          <div class="admin-row">
            <div class="admin-form-group">
              <label class="admin-label">Nama Platform / Media</label>
              <input type="text" class="admin-input soc-platform" value="${escapeHtml(s.platform || '')}">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Username / Teks Tampilan</label>
              <input type="text" class="admin-input soc-handle" value="${escapeHtml(s.handle || '')}">
            </div>
          </div>

          <div class="admin-row">
            <div class="admin-form-group">
              <label class="admin-label">Tautan / Link URL</label>
              <input type="text" class="admin-input soc-url" value="${escapeHtml(s.url || '')}">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Ikon Sosial</label>
              <select class="admin-select soc-icon">
                <option value="linkedin" ${s.iconType === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                <option value="github" ${s.iconType === 'github' ? 'selected' : ''}>GitHub</option>
                <option value="website" ${s.iconType === 'website' ? 'selected' : ''}>Website</option>
                <option value="whatsapp" ${s.iconType === 'whatsapp' ? 'selected' : ''}>WhatsApp / Telepon</option>
                <option value="email" ${s.iconType === 'email' ? 'selected' : ''}>Email</option>
                <option value="telegram" ${s.iconType === 'telegram' ? 'selected' : ''}>Telegram</option>
                <option value="instagram" ${s.iconType === 'instagram' ? 'selected' : ''}>Instagram</option>
                <option value="twitter" ${s.iconType === 'twitter' ? 'selected' : ''}>X (Twitter)</option>
              </select>
            </div>
          </div>
        </div>
      </div >
          `).join('');

    container.innerHTML = `
          <div class="admin-section-topbar" >
        <div>
          <h3 class="admin-section-title">🌐 Kelola Kontak & Sosial Media</h3>
          <p class="admin-section-desc">Atur link kontak dan jejaring sosial yang tampil di bagian bawah portofolio.</p>
        </div>
        <div class="admin-section-topbar-actions">
          <button type="button" class="admin-btn admin-btn-secondary" id="toggle-all-soc-btn">↔️ Buka / Tutup Semua</button>
          <button type="button" class="admin-btn admin-btn-primary" id="add-soc-btn">➕ Tambah Tautan Kontak</button>
        </div>
      </div >

          <form id="soc-form">
            <div id="soc-list-container">
              ${itemsHtml}
            </div>
            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
              <button type="submit" class="admin-btn admin-btn-primary" style="width:100%;">💾 Simpan Kontak & Sosial</button>
            </div>
          </form>
        `;

    const listContainer = document.getElementById('soc-list-container');

    // Accordion Header Toggle
    listContainer.querySelectorAll('.admin-card-item').forEach(card => {
      const header = card.querySelector('.admin-card-header');
      if (header) {
        header.addEventListener('click', (e) => {
          if (e.target.closest('.admin-card-actions')) return;
          card.classList.toggle('collapsed');
        });
      }
    });

    // Expand/Collapse All
    let allCollapsed = true;
    const toggleAllBtn = document.getElementById('toggle-all-soc-btn');
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        const cards = listContainer.querySelectorAll('.admin-card-item');
        cards.forEach(c => c.classList.toggle('collapsed', !allCollapsed));
        allCollapsed = !allCollapsed;
      });
    }

    listContainer.querySelectorAll('.soc-del-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        showConfirmModal('Yakin ingin menghapus tautan sosial ini?', () => {
          currentData.socials.splice(idx, 1);
          renderTabSocials(container);
          showToast('Tautan sosial berhasil dihapus', 'danger');
        });
      });
    });

    listContainer.querySelectorAll('.soc-up-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        if (idx > 0) {
          const temp = currentData.socials[idx];
          currentData.socials[idx] = currentData.socials[idx - 1];
          currentData.socials[idx - 1] = temp;
          renderTabSocials(container);
        }
      });
    });

    listContainer.querySelectorAll('.soc-down-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        if (idx < currentData.socials.length - 1) {
          const temp = currentData.socials[idx];
          currentData.socials[idx] = currentData.socials[idx + 1];
          currentData.socials[idx + 1] = temp;
          renderTabSocials(container);
        }
      });
    });

    listContainer.querySelectorAll('.soc-hide-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isHidden = this.textContent.includes('👁️‍🗨️');
        if (isHidden) {
          this.textContent = '👁️';
          this.title = 'Sembunyikan';
        } else {
          this.textContent = '👁️‍🗨️';
          this.title = 'Tampilkan';
        }
      });
    });

    document.getElementById('add-soc-btn').addEventListener('click', () => {
      currentData.socials.push({
        id: 'soc_' + Date.now(),
        platform: 'Platform Baru',
        handle: '@username',
        url: 'https://',
        iconType: 'website'
      });
      renderTabSocials(container);
    });

    document.getElementById('soc-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const cardNodes = listContainer.querySelectorAll('.admin-card-item');
      const updated = [];
      const hideBtns = listContainer.querySelectorAll('.soc-hide-btn');

      cardNodes.forEach((card, i) => {
        const orig = currentData.socials[i] || {};
        updated.push({
          id: orig.id || ('soc_' + Date.now() + '_' + i),
          platform: card.querySelector('.soc-platform').value,
          handle: card.querySelector('.soc-handle').value,
          url: card.querySelector('.soc-url').value,
          iconType: card.querySelector('.soc-icon').value,
          isHidden: hideBtns[i] ? hideBtns[i].textContent.includes('👁️‍🗨️') : false
        });
      });

      currentData.socials = updated;
      saveSiteData(currentData);
      showToast('Kontak & Sosial berhasil disimpan!', 'success');
    });
  }

  // 7. THEME TAB
  function renderTabTheme(container) {
    const settings = currentData.settings || {};
    const footer = currentData.footer || {};

    container.innerHTML = `
          <h3 class="admin-section-title" >🎨 Kustomisasi Tema & Tampilan</h3 >
      <p class="admin-section-desc">Sesuaikan warna aksen utama, judul tab browser, serta footer halaman.</p>

      <form id="theme-form">
        <div class="admin-row">
          <div class="admin-form-group">
            <label class="admin-label">Warna Utama Aksen (Primary Color)</label>
            <div class="admin-color-picker-group">
              <input type="color" id="theme-primary-color" class="admin-color-input" value="${settings.primaryColor || '#5e6ad2'}">
              <input type="text" id="theme-primary-color-hex" class="admin-input" value="${settings.primaryColor || '#5e6ad2'}">
            </div>
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Warna Utama Hover (Primary Hover)</label>
            <div class="admin-color-picker-group">
              <input type="color" id="theme-hover-color" class="admin-color-input" value="${settings.primaryHoverColor || '#828fff'}">
              <input type="text" id="theme-hover-color-hex" class="admin-input" value="${settings.primaryHoverColor || '#828fff'}">
            </div>
          </div>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Judul Halaman Browser (Page Title)</label>
          <input type="text" id="theme-page-title" class="admin-input" value="${escapeHtml(settings.pageTitle || '')}">
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Deskripsi Meta SEO (Meta Description)</label>
          <textarea id="theme-meta-desc" class="admin-textarea">${escapeHtml(settings.metaDescription || '')}</textarea>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Teks Footer Halaman</label>
          <input type="text" id="theme-footer-text" class="admin-input" value="${escapeHtml(footer.text || '')}">
        </div>

        <div style="margin-top: 32px;">
          <button type="submit" class="admin-btn admin-btn-primary">💾 Simpan Pengaturan Tema</button>
        </div>
      </form>
    `;

    const pickerPrimary = document.getElementById('theme-primary-color');
    const hexPrimary = document.getElementById('theme-primary-color-hex');
    const pickerHover = document.getElementById('theme-hover-color');
    const hexHover = document.getElementById('theme-hover-color-hex');

    pickerPrimary.addEventListener('input', () => hexPrimary.value = pickerPrimary.value);
    hexPrimary.addEventListener('input', () => pickerPrimary.value = hexPrimary.value);

    pickerHover.addEventListener('input', () => hexHover.value = pickerHover.value);
    hexHover.addEventListener('input', () => pickerHover.value = hexHover.value);

    document.getElementById('theme-form').addEventListener('submit', function (e) {
      e.preventDefault();
      currentData.settings.primaryColor = hexPrimary.value;
      currentData.settings.primaryHoverColor = hexHover.value;
      currentData.settings.pageTitle = document.getElementById('theme-page-title').value;
      currentData.settings.metaDescription = document.getElementById('theme-meta-desc').value;
      currentData.footer.text = document.getElementById('theme-footer-text').value;

      saveSiteData(currentData);
      showToast('Pengaturan Tema berhasil disimpan!', 'success');
    });
  }
  // 7.5 INBOX TAB
  function renderTabInbox(container) {
    const messages = currentData.messages || [];

    let msgsHtml = '<p class="admin-section-desc">Belum ada pesan masuk.</p>';
    if (messages.length > 0) {
      msgsHtml = messages.slice().reverse().map((m, i) => {
        const dateStr = new Date(m.date).toLocaleString('id-ID');
        return `
          <div class="admin-card-item" style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: #fff; font-size: 15px;">${escapeHtml(m.name)}</strong>
              <span style="color: var(--color-ink-muted); font-size: 12px;">${dateStr}</span>
            </div>
            <p style="color: #ccc; font-size: 14px; margin: 0; white-space: pre-wrap;">${escapeHtml(m.message)}</p>
          </div>
        `;
      }).join('');
    }

    container.innerHTML = `
      <h3 class="admin-section-title">✉️ Kotak Masuk (Pesan AI)</h3>
      <p class="admin-section-desc">Daftar pesan dari pengunjung yang menggunakan form Smart Contact.</p>
      
      <div class="admin-row" style="margin-bottom: 24px;">
        <button type="button" class="admin-btn admin-btn-danger" id="clear-inbox-btn">🗑️ Bersihkan Semua Pesan</button>
      </div>

      <div class="inbox-list">
        ${msgsHtml}
      </div>
    `;

    const clearBtn = document.getElementById('clear-inbox-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        showConfirmModal('Apakah Anda yakin ingin menghapus seluruh histori pesan ini?', () => {
          currentData.messages = [];
          saveSiteData(currentData);
          renderTabInbox(container);
          showToast('Inbox berhasil dibersihkan!', 'success');
        });
      });
    }
  }

  // 8. BACKUP & SETTINGS TAB
  function renderTabBackup(container) {
    const settings = currentData.settings || {};

    container.innerHTML = `
      <h3 class="admin-section-title">⚙️ Backup, Restore & Keamanan Admin</h3>
      <p class="admin-section-desc">Ubah kata sandi admin atau lakukan backup/restore data situs dalam format file JSON.</p>

      <!-- Password Change Section -->
      <div class="admin-card-item" style="margin-bottom: 32px;">
        <h4 style="color:#fff; font-size:16px; margin-bottom:12px;">🔑 Ubah Kata Sandi Admin</h4>
        <form id="pass-change-form">
          <div class="admin-row">
            <div class="admin-form-group">
              <label class="admin-label">Kata Sandi Baru</label>
              <input type="password" id="new-admin-pass" class="admin-input" placeholder="Masukkan password baru">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Konfirmasi Kata Sandi Baru</label>
              <input type="password" id="confirm-admin-pass" class="admin-input" placeholder="Ulangi password baru">
            </div>
          </div>
          <button type="submit" class="admin-btn admin-btn-secondary" style="margin-top:8px;">🔒 Perbarui Password</button>
        </form>
      </div>

      <!-- API Integrations Section -->
      <div class="admin-card-item" style="margin-bottom: 32px;">
        <h4 style="color:#fff; font-size:16px; margin-bottom:12px;">🤖 Integrasi AI (Google Gemini API)</h4>
        <p style="color:#a0a5b1; font-size:13.5px; margin-bottom:20px;">
          Masukkan API Key dari Google AI Studio untuk mengaktifkan fitur Smart Contact Form. Biarkan kosong jika fitur AI ingin dinonaktifkan.
        </p>
        <form id="api-integration-form">
          <div class="admin-form-group">
            <label class="admin-label">Gemini API Key</label>
            <input type="password" id="gemini-api-key" class="admin-input" placeholder="AIzaSy..." value="${settings.geminiApiKey || ''}">
          </div>
          
          <div class="admin-row" style="margin-top: 16px;">
            <div class="admin-form-group">
              <label class="admin-label">JSONBin.io Bin ID</label>
              <input type="text" id="jsonbin-id" class="admin-input" placeholder="Contoh: 64a7f9b8..." value="${settings.jsonbinId || ''}">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">JSONBin.io Master Key</label>
              <input type="password" id="jsonbin-key" class="admin-input" placeholder="Contoh: $2b$10$..." value="${settings.jsonbinKey || ''}">
            </div>
          </div>
          <p style="color:#a0a5b1; font-size:12px; margin-top:8px;">Dengan JSONBin, perubahan yang Anda simpan akan tampil untuk semua orang di internet.</p>

          <button type="submit" class="admin-btn admin-btn-primary" style="margin-top:16px;">💾 Simpan Konfigurasi Integrasi</button>
        </form>
      </div>

      <!-- Backup Export/Import Section -->
      <div class="admin-card-item">
        <h4 style="color:#fff; font-size:16px; margin-bottom:12px;">💾 Export & Import Data Website (JSON)</h4>
        <p style="color:#a0a5b1; font-size:13.5px; margin-bottom:20px;">
          Anda dapat mendownload seluruh konfigurasi dan konten portofolio dalam file JSON, atau mengunggah file JSON cadangan untuk memulihkan tampilan.
        </p>

        <div style="display:flex; flex-wrap:wrap; gap:14px; align-items:center;">
          <button type="button" class="admin-btn admin-btn-primary" id="export-json-btn">📥 Export Backup (Download JSON)</button>
          
          <div class="admin-file-input-wrapper">
            <button type="button" class="admin-btn admin-btn-secondary">📤 Import Backup (Upload JSON)</button>
            <input type="file" id="import-json-file" accept=".json">
          </div>

          <button type="button" class="admin-btn admin-btn-danger" id="reset-default-btn">🔄 Reset ke Data Original Initial</button>
        </div>
      </div>
    `;

    // Password Change Handler
    document.getElementById('pass-change-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const p1 = document.getElementById('new-admin-pass').value;
      const p2 = document.getElementById('confirm-admin-pass').value;

      if (!p1) {
        showToast('Password tidak boleh kosong!', 'danger');
        return;
      }
      if (p1 !== p2) {
        showToast('Konfirmasi password tidak cocok!', 'danger');
        return;
      }

      currentData.settings.password = p1;
      saveSiteData(currentData);
      showToast('Kata sandi admin berhasil diperbarui!', 'success');
      document.getElementById('new-admin-pass').value = '';
      document.getElementById('confirm-admin-pass').value = '';
    });

    // API Integration Handler
    document.getElementById('api-integration-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const apiKey = document.getElementById('gemini-api-key').value;
      const jsonbinId = document.getElementById('jsonbin-id').value;
      const jsonbinKey = document.getElementById('jsonbin-key').value;

      currentData.settings.geminiApiKey = apiKey.trim();
      currentData.settings.jsonbinId = jsonbinId.trim();
      currentData.settings.jsonbinKey = jsonbinKey.trim();
      saveSiteData(currentData);

      showToast('Konfigurasi API berhasil disimpan!', 'success');
    });

    // Export JSON
    document.getElementById('export-json-btn').addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('File backup JSON berhasil di-download!', 'success');
    });

    // Import JSON
    document.getElementById('import-json-file').addEventListener('change', function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            const imported = JSON.parse(e.target.result);
            if (imported.hero && imported.projects) {
              currentData = { ...DEFAULT_DATA, ...imported };
              saveSiteData(currentData);
              showToast('Data berhasil di-import dari JSON!', 'success');
              renderActiveTabContent();
            } else {
              showToast('Format file JSON tidak valid!', 'danger');
            }
          } catch (err) {
            showToast('Gagal membaca file JSON!', 'danger');
          }
        };
        reader.readAsText(this.files[0]);
      }
    });

    // Reset Defaults
    document.getElementById('reset-default-btn').addEventListener('click', () => {
      showConfirmModal('Apakah Anda yakin ingin mengembalikan seluruh konten ke tampilan awal bawaan?', () => {
        localStorage.removeItem(STORAGE_KEY);
        currentData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        renderAll();
        showToast('Konten telah di-reset ke data bawaan awal!', 'success');
        renderActiveTabContent();
      });
    });
  }

  // HELPER EDITOR FOR LISTS (Experience & Education)
  function renderGenericListEditor(container, opts) {
    const items = opts.items || [];

    let itemsHtml = items.map((item, i) => `
      <div class="admin-card-item ${i > 0 ? 'collapsed' : ''}" data-index="${i}">
        <div class="admin-card-header" title="Klik untuk buka/tutup rincian">
          <div class="admin-card-item-title">
            <span class="admin-card-chevron">▼</span>
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">#${i + 1} - ${escapeHtml(item.title || 'Item')}</span>
          </div>
          <div class="admin-card-actions">
            ${i > 0 ? `<button type="button" class="admin-btn admin-btn-secondary admin-btn-icon move-item-up-btn" data-index="${i}">⬆️</button>` : ''}
            ${i < items.length - 1 ? `<button type="button" class="admin-btn admin-btn-secondary admin-btn-icon move-item-down-btn" data-index="${i}">⬇️</button>` : ''}
            <button type="button" class="admin-btn admin-btn-secondary admin-btn-icon item-hide-btn" data-index="${i}" title="${item.isHidden ? 'Tampilkan' : 'Sembunyikan'}">${item.isHidden ? '👁️‍🗨️' : '👁️'}</button>
            <button type="button" class="admin-btn admin-btn-danger admin-btn-icon del-item-btn" data-index="${i}">🗑️</button>
          </div>
        </div>

        <div class="admin-card-body">
          <div class="admin-row">
            <div class="admin-form-group">
              <label class="admin-label">Periode / Lokasi Meta</label>
              <input type="text" class="admin-input item-meta" value="${escapeHtml(item.meta || '')}">
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Judul / Posisi / Gelar</label>
              <input type="text" class="admin-input item-title" value="${escapeHtml(item.title || '')}">
            </div>
          </div>

          <div class="admin-form-group">
            <label class="admin-label">Nama Perusahaan / Institusi</label>
            <input type="text" class="admin-input item-company" value="${escapeHtml(item.company || '')}">
          </div>

          <div class="admin-form-group">
            <label class="admin-label">Deskripsi Rincian</label>
            <textarea class="admin-textarea item-desc">${escapeHtml(item.description || '')}</textarea>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="admin-section-topbar">
        <div>
          <h3 class="admin-section-title">${opts.title} (${items.length})</h3>
          <p class="admin-section-desc">${opts.desc}</p>
        </div>
        <div class="admin-section-topbar-actions">
          <button type="button" class="admin-btn admin-btn-secondary" id="toggle-all-list-btn">↔️ Buka / Tutup Semua</button>
          <button type="button" class="admin-btn admin-btn-primary" id="add-list-item-btn">➕ Tambah Item</button>
        </div>
      </div>

      <form id="generic-list-form">
        <div id="generic-list-container">
          ${itemsHtml}
        </div>
        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
          <button type="submit" class="admin-btn admin-btn-primary" style="width:100%;">💾 Simpan Semua Perubahan</button>
        </div>
      </form>
    `;

    const listContainer = document.getElementById('generic-list-container');

    // Accordion Header Toggle
    listContainer.querySelectorAll('.admin-card-item').forEach(card => {
      const header = card.querySelector('.admin-card-header');
      if (header) {
        header.addEventListener('click', (e) => {
          if (e.target.closest('.admin-card-actions')) return;
          card.classList.toggle('collapsed');
        });
      }
    });

    // Expand/Collapse All
    let allCollapsed = true;
    const toggleAllBtn = document.getElementById('toggle-all-list-btn');
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        const cards = listContainer.querySelectorAll('.admin-card-item');
        cards.forEach(c => c.classList.toggle('collapsed', !allCollapsed));
        allCollapsed = !allCollapsed;
      });
    }

    listContainer.querySelectorAll('.del-item-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        showConfirmModal('Yakin ingin menghapus item ini?', () => {
          items.splice(idx, 1);
          opts.onSave(items);
          renderGenericListEditor(container, opts);
          showToast('Data berhasil dihapus', 'danger');
        });
      });
    });

    listContainer.querySelectorAll('.move-item-up-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        if (idx > 0) {
          const temp = items[idx];
          items[idx] = items[idx - 1];
          items[idx - 1] = temp;
          opts.onSave(items);
          renderGenericListEditor(container, opts);
        }
      });
    });

    listContainer.querySelectorAll('.move-item-down-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const idx = parseInt(this.dataset.index, 10);
        if (idx < items.length - 1) {
          const temp = items[idx];
          items[idx] = items[idx + 1];
          items[idx + 1] = temp;
          opts.onSave(items);
          renderGenericListEditor(container, opts);
        }
      });
    });

    listContainer.querySelectorAll('.item-hide-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isHidden = this.textContent.includes('👁️‍🗨️');
        if (isHidden) {
          this.textContent = '👁️';
          this.title = 'Sembunyikan';
        } else {
          this.textContent = '👁️‍🗨️';
          this.title = 'Tampilkan';
        }
      });
    });

    document.getElementById('add-list-item-btn').addEventListener('click', () => {
      items.unshift({ ...opts.newItemTemplate, id: 'item_' + Date.now() });
      opts.onSave(items);
      renderGenericListEditor(container, opts);
    });

    document.getElementById('generic-list-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const cardNodes = listContainer.querySelectorAll('.admin-card-item');
      const updated = [];
      const hideBtns = listContainer.querySelectorAll('.item-hide-btn');

      cardNodes.forEach((card, i) => {
        const orig = items[i] || {};
        updated.push({
          id: orig.id || ('item_' + Date.now() + '_' + i),
          meta: card.querySelector('.item-meta').value,
          title: card.querySelector('.item-title').value,
          company: card.querySelector('.item-company').value,
          description: card.querySelector('.item-desc').value,
          isHidden: hideBtns[i] ? hideBtns[i].textContent.includes('👁️‍🗨️') : false
        });
      });

      opts.onSave(updated);
      showToast('Data list berhasil disimpan!', 'success');
    });
  }

  // IMAGE HELPER (Base64 Reader & Compressor)
  function processImageFile(file, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // INITIALIZATION ON DOM READY
  async function initApp() {
    currentData = await getSiteData();

    // Periksa apakah ada perubahan data dari aslinya
    const isCustomData = localStorage.getItem(STORAGE_KEY) || (currentData.settings && currentData.settings.jsonbinId);
    const isDataModified = JSON.stringify(currentData) !== JSON.stringify(DEFAULT_DATA);

    // Render ulang DOM hanya jika data cloud/local berbeda dengan default HTML statis.
    // Ini mencegah kedipan (flicker) gambar saat website baru pertama kali dibuka.
    if (isCustomData && isDataModified) {
      renderAll();
    }

    initAdminUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
