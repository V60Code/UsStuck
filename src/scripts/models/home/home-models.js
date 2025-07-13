class HomeModel {
  static getTrendingTopics() {
    return [
      {
        id: 1,
        question: "How to stay consistent in prayer (salah)?",
        category: "Worship"
      },
      {
        id: 2,
        question: "What are the best ways to manage finances according to Islam?",
        category: "Finance"
      },
      {
        id: 3,
        question: "Finding a spouse: Islamic perspectives on modern dating.",
        category: "Marriage"
      }
    ];
  }

  static getHadithCatalog() {
    return [
      {
        id: 1,
        title: "Sahih al-Bukhari 1",
        book: "Book of Revelation",
        text: "Verily, actions are but by intentions, and every person will have only that which he intended...",
        link: "#/hadith/bukhari-1"
      },
      {
        id: 2,
        title: "Sahih Muslim 55",
        book: "Book of Faith",
        text: "Islam is built upon five [pillars]: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing prayer...",
        link: "#/hadith/muslim-55"
      },
      {
        id: 3,
        title: "Jami` at-Tirmidhi 2516",
        book: "Book on the Description of the Day of Judgement",
        text: "Take advantage of five before five: your youth before your old age, your health before your sickness...",
        link: "#/hadith/tirmidhi-2516"
      }
    ];
  }

  static getForumDiscussions() {
    return [
      {
        id: 1,
        title: "Advice for a new revert?",
        author: "Abdullah",
        replies: 15,
        lastReply: "2h ago"
      },
      {
        id: 2,
        title: "Doubts about Riba in modern banking",
        author: "Fatima",
        replies: 28,
        lastReply: "5h ago"
      }
    ];
  }

  static getChatExample() {
    return {
      userMessage: "What is the ruling on fasting for someone who is ill?",
      aiResponse: {
        text: "Certainly. For someone who is ill, Islam provides a concession (rukhsah) to not fast. However, they are required to make up for it (qadha) on other days after they have recovered.",
        source: {
          title: "Source:",
          text: "...So whoever among you is ill or on a journey [during them] - then an equal number of days [are to be made up]...",
          reference: "QS. Al-Baqarah: 184"
        }
      }
    };
  }
}

export default HomeModel;