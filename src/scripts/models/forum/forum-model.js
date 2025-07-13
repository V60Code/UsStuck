class ForumModel {
  constructor() {
    this.topics = [
      {
        id: 1,
        title: 'Diskusi Tafsir Surah Al-Fatihah',
        author: 'Ahmad Fauzi',
        category: 'Tafsir',
        replies: 23,
        views: 156,
        lastActivity: '2 jam yang lalu',
        isPinned: true,
        content: 'Mari kita diskusikan makna mendalam dari Surah Al-Fatihah...'
      },
      {
        id: 2,
        title: 'Cara Mengajarkan Sholat kepada Anak',
        author: 'Siti Nurhaliza',
        category: 'Parenting',
        replies: 45,
        views: 289,
        lastActivity: '5 jam yang lalu',
        isPinned: false,
        content: 'Bagaimana cara terbaik mengajarkan sholat kepada anak-anak?'
      },
      {
        id: 3,
        title: 'Hukum Zakat Profesi dalam Islam',
        author: 'Dr. Yusuf Rahman',
        category: 'Fiqh',
        replies: 12,
        views: 98,
        lastActivity: '1 hari yang lalu',
        isPinned: false,
        content: 'Pembahasan mengenai zakat profesi dan implementasinya...'
      },
      {
        id: 4,
        title: 'Sharing Pengalaman Umrah Pertama',
        author: 'Fatimah Az-Zahra',
        category: 'Ibadah',
        replies: 67,
        views: 445,
        lastActivity: '3 hari yang lalu',
        isPinned: false,
        content: 'Alhamdulillah baru saja selesai umrah pertama...'
      }
    ];

    this.categories = [
      { id: 'all', name: 'Semua Kategori', color: '#556B2F' },
      { id: 'tafsir', name: 'Tafsir', color: '#8B4513' },
      { id: 'fiqh', name: 'Fiqh', color: '#2E8B57' },
      { id: 'ibadah', name: 'Ibadah', color: '#4682B4' },
      { id: 'parenting', name: 'Parenting', color: '#9932CC' },
      { id: 'akhlaq', name: 'Akhlaq', color: '#DC143C' }
    ];

    this.selectedCategory = 'all';
    this.searchQuery = '';
  }

  getTopics() {
    let filteredTopics = [...this.topics];

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filteredTopics = filteredTopics.filter(topic => 
        topic.category.toLowerCase() === this.selectedCategory
      );
    }

    // Filter by search query
    if (this.searchQuery) {
      filteredTopics = filteredTopics.filter(topic =>
        topic.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        topic.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        topic.content.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Sort: pinned first, then by last activity
    return filteredTopics.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.lastActivity) - new Date(a.lastActivity);
    });
  }

  getCategories() {
    return this.categories;
  }

  getTopicById(id) {
    return this.topics.find(topic => topic.id === parseInt(id));
  }

  searchTopics(query) {
    this.searchQuery = query;
    return this.getTopics();
  }

  filterByCategory(categoryId) {
    this.selectedCategory = categoryId;
    return this.getTopics();
  }

  addTopic(topicData) {
    const newTopic = {
      id: this.topics.length + 1,
      ...topicData,
      replies: 0,
      views: 0,
      lastActivity: 'Baru saja',
      isPinned: false
    };
    this.topics.unshift(newTopic);
    return newTopic;
  }

  getForumStats() {
    return {
      totalTopics: this.topics.length,
      totalReplies: this.topics.reduce((sum, topic) => sum + topic.replies, 0),
      totalViews: this.topics.reduce((sum, topic) => sum + topic.views, 0),
      activeUsers: 156 // Mock data
    };
  }
}

export default ForumModel;