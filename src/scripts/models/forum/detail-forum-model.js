class DetailForumModel {
  constructor() {
    this.currentTopic = null;
    this.comments = [];
  }

  getTopicDetail(topicId) {
    // Dummy data untuk detail topik
    const topicDetails = {
      1: {
        id: 1,
        title: 'Diskusi Tafsir Surah Al-Fatihah',
        author: 'Ahmad Fauzi',
        category: 'Tafsir',
        replies: 23,
        views: 156,
        lastActivity: '2 jam yang lalu',
        isPinned: true,
        content: 'Assalamualaikum wr. wb. teman-teman semua.\n\nMari kita diskusikan makna mendalam dari Surah Al-Fatihah, Ummul Qur\'an. Seperti yang kita tahu, surah ini adalah inti dari Al-Qur\'an dan selalu kita baca dalam sholat.\n\nApa saja hikmah yang bisa kita ambil dari setiap ayatnya? Mulai dari "Bismillah" sampai "Walaaddoolliin". Silakan bagikan pandangan dan referensi dari para ulama yang teman-teman ketahui. Terima kasih.',
        createdAt: '3 jam yang lalu'
      },
      2: {
        id: 2,
        title: 'Cara Mengajarkan Sholat kepada Anak',
        author: 'Siti Nurhaliza',
        category: 'Parenting',
        replies: 45,
        views: 289,
        lastActivity: '5 jam yang lalu',
        isPinned: false,
        content: 'Assalamualaikum ibu-ibu semua.\n\nSaya mau sharing dan sekaligus minta saran tentang cara mengajarkan sholat kepada anak-anak. Anak saya yang berusia 7 tahun sudah mulai belajar sholat, tapi masih sering lupa gerakan dan bacaannya.\n\nAda tips khusus tidak ya supaya anak lebih mudah mengingat dan semangat untuk sholat? Terima kasih.',
        createdAt: '6 jam yang lalu'
      },
      3: {
        id: 3,
        title: 'Hukum Zakat Profesi dalam Islam',
        author: 'Dr. Yusuf Rahman',
        category: 'Fiqh',
        replies: 12,
        views: 98,
        lastActivity: '1 hari yang lalu',
        isPinned: false,
        content: 'Bismillah, saudara-saudara sekalian.\n\nSaya ingin membahas tentang zakat profesi atau zakat penghasilan. Bagaimana hukumnya dalam Islam? Apakah sama dengan zakat mal biasa?\n\nMohon pencerahan dari yang lebih paham, terutama tentang nisab dan cara perhitungannya. Jazakallahu khairan.',
        createdAt: '1 hari yang lalu'
      },
      4: {
        id: 4,
        title: 'Sharing Pengalaman Umrah Pertama',
        author: 'Fatimah Az-Zahra',
        category: 'Ibadah',
        replies: 67,
        views: 445,
        lastActivity: '3 hari yang lalu',
        isPinned: false,
        content: 'Alhamdulillah, baru saja selesai menunaikan umrah pertama kali. Subhanallah, pengalaman yang luar biasa!\n\nSaya ingin berbagi tips dan pengalaman untuk teman-teman yang berencana umrah. Mulai dari persiapan fisik, mental, sampai hal-hal praktis di sana.\n\nAda yang mau tanya-tanya? Insya Allah saya sharing sebisa saya.',
        createdAt: '4 hari yang lalu'
      }
    };

    this.currentTopic = topicDetails[topicId] || null;
    return this.currentTopic;
  }

  getComments(topicId) {
    // Dummy data untuk komentar berdasarkan topik
    const commentsData = {
      1: [
        {
          id: 1,
          author: 'Fatima Azzahra',
          content: 'Wa\'alaikumsalam. Diskusi yang menarik. Menurut saya, ayat "Iyyaka na\'budu wa iyyaka nasta\'in" adalah titik sentralnya. Ayat ini menegaskan bahwa seluruh ibadah dan permohonan pertolongan kita hanya ditujukan kepada Allah, membebaskan kita dari penghambaan kepada selain-Nya. Ini adalah inti dari tauhid.',
          createdAt: '2 jam yang lalu',
          likes: 5,
          avatar: 'FB'
        },
        {
          id: 2,
          author: 'Umar Pratama',
          content: 'Setuju dengan Mbak Fatima. Saya ingin menambahkan tentang "ihdinas-siratal-mustaqim". Permintaan petunjuk ke jalan yang lurus ini menunjukkan betapa butuhnya kita sebagai manusia akan bimbingan Allah setiap saat, bahkan dalam hal yang kita anggap sudah benar. Kita tidak boleh sombong dan harus terus memohon hidayah.',
          createdAt: '1 jam yang lalu',
          likes: 8,
          avatar: 'UP'
        }
      ],
      2: [
        {
          id: 3,
          author: 'Aminah Sari',
          content: 'Wa\'alaikumsalam bu. Saya juga punya pengalaman serupa. Yang paling efektif menurut saya adalah dengan contoh langsung dan membuat jadwal sholat yang menyenangkan. Anak-anak lebih mudah meniru daripada dihafal paksa.',
          createdAt: '4 jam yang lalu',
          likes: 12,
          avatar: 'AS'
        },
        {
          id: 4,
          author: 'Budi Santoso',
          content: 'Betul bu Aminah. Saya juga menggunakan metode reward system. Setiap anak berhasil sholat tepat waktu, dapat stiker. Kalau sudah terkumpul, dapat hadiah kecil. Alhamdulillah efektif.',
          createdAt: '3 jam yang lalu',
          likes: 7,
          avatar: 'BS'
        }
      ],
      3: [
        {
          id: 5,
          author: 'Ustadz Mahmud',
          content: 'Barakallahu fiikum atas pertanyaannya. Zakat profesi memang ada perbedaan pendapat di kalangan ulama. Namun mayoritas ulama kontemporer membolehkannya dengan syarat mencapai nisab dan haul. Perhitungannya 2.5% dari penghasilan bersih setelah dikurangi kebutuhan pokok.',
          createdAt: '20 jam yang lalu',
          likes: 15,
          avatar: 'UM'
        }
      ],
      4: [
        {
          id: 6,
          author: 'Hasan Abdullah',
          content: 'Masya Allah, alhamdulillah atas nikmat yang Allah berikan. Boleh sharing tips tentang persiapan fisik sebelum berangkat? Saya berencana umrah tahun depan insya Allah.',
          createdAt: '2 hari yang lalu',
          likes: 9,
          avatar: 'HA'
        },
        {
          id: 7,
          author: 'Khadijah Putri',
          content: 'Subhanallah, senang sekali membaca sharing ukhti. Saya juga baru pulang umrah bulan lalu. Memang pengalaman yang tak terlupakan. Semoga kita semua bisa kembali ke Baitullah.',
          createdAt: '2 hari yang lalu',
          likes: 11,
          avatar: 'KP'
        }
      ]
    };

    this.comments = commentsData[topicId] || [];
    return this.comments;
  }

  addComment(topicId, commentData) {
    const newComment = {
      id: this.comments.length + 1,
      author: commentData.author || 'Anonim',
      content: commentData.content,
      createdAt: 'Baru saja',
      likes: 0,
      avatar: commentData.author ? commentData.author.substring(0, 2).toUpperCase() : 'AN'
    };
    
    this.comments.push(newComment);
    return newComment;
  }

  likeComment(commentId) {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      comment.likes += 1;
    }
    return comment;
  }

  getCurrentTopic() {
    return this.currentTopic;
  }

  getCurrentComments() {
    return this.comments;
  }
}

export default DetailForumModel;