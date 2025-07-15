class HomeModel {
  static getTrendingTopics() {
    return [
      {
        id: 1,
        question: "Bagaimana cara konsisten dalam shalat?",
        category: "Ibadah"
      },
      {
        id: 2,
        question: "Apa cara terbaik mengelola keuangan menurut Islam?",
        category: "Keuangan"
      },
      {
        id: 3,
        question: "Mencari jodoh: perspektif Islam tentang pacaran modern.",
        category: "Pernikahan"
      }
    ];
  }

  static getHadithCatalog() {
    return [
      {
        id: 1,
        title: "Sahih al-Bukhari 1",
        book: "Kitab Wahyu",
        text: "Sesungguhnya amal perbuatan itu tergantung pada niatnya, dan setiap orang akan mendapat apa yang diniatkannya...",
        link: "#/hadith/bukhari-1"
      },
      {
        id: 2,
        title: "Sahih Muslim 55",
        book: "Kitab Iman",
        text: "Islam dibangun atas lima [rukun]: bersaksi bahwa tidak ada tuhan selain Allah dan Muhammad adalah utusan Allah, mendirikan shalat...",
        link: "#/hadith/muslim-55"
      },
      {
        id: 3,
        title: "Jami` at-Tirmidhi 2516",
        book: "Kitab Sifat Hari Kiamat",
        text: "Manfaatkanlah lima perkara sebelum lima perkara: masa mudamu sebelum masa tuamu, sehatmu sebelum sakitmu...",
        link: "#/hadith/tirmidhi-2516"
      }
    ];
  }

  static getForumDiscussions() {
    return [
      {
        id: 1,
        title: "Saran untuk mualaf baru?",
        author: "Abdullah",
        replies: 15,
        lastReply: "2 jam lalu"
      },
      {
        id: 2,
        title: "Keraguan tentang Riba dalam perbankan modern",
        author: "Fatimah",
        replies: 28,
        lastReply: "5 jam lalu"
      }
    ];
  }

  static getChatExample() {
    return {
      userMessage: "Bagaimana hukum puasa bagi orang yang sedang sakit?",
      aiResponse: {
        text: "Tentu saja. Bagi orang yang sedang sakit, Islam memberikan keringanan (rukhsah) untuk tidak berpuasa. Namun, mereka diwajibkan untuk menggantinya (qadha) di hari-hari lain setelah sembuh.",
        source: {
          title: "Sumber:",
          text: "...Maka barang siapa di antara kamu sakit atau dalam perjalanan [lalu dia berbuka], maka [wajiblah baginya berpuasa] sebanyak hari yang ditinggalkannya itu...",
          reference: "QS. Al-Baqarah: 184"
        }
      }
    };
  }
}

export default HomeModel;