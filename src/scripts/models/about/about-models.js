class AboutModel {
  static getAboutInfo() {
    return {
      title: "About UsStuck",
      subtitle: "AI-Powered Islamic Education Platform",
      mission: "UsStuck was born from a simple philosophy: to make authentic Islamic knowledge accessible and relatable for the modern world. Our mission is to provide clear, well-sourced answers to your questions, fostering a deeper connection with faith through technology.",
      vision: "We envision a world where every Muslim can easily access authentic Islamic knowledge, regardless of their location or background, through innovative technology that respects and preserves the integrity of Islamic teachings.",
      values: [
        {
          title: "Authenticity",
          description: "All our content is sourced from the Qur'an and authentic Hadith collections, ensuring religious accuracy.",
          icon: "📖"
        },
        {
          title: "Accessibility",
          description: "Making Islamic knowledge available to everyone, everywhere, in a format that's easy to understand.",
          icon: "🌍"
        },
        {
          title: "Innovation",
          description: "Using cutting-edge AI technology to enhance Islamic learning while maintaining traditional values.",
          icon: "🚀"
        },
        {
          title: "Community",
          description: "Building a supportive community where Muslims can learn, discuss, and grow together.",
          icon: "🤝"
        }
      ]
    };
  }

  static getDevelopers() {
    return [
      {
        id: 1,
        name: "Ahmad Alfarizi",
        role: "Lead Developer & Islamic Scholar",
        description: "Passionate about combining technology with Islamic education. Graduated from Computer Science and has deep knowledge in Islamic studies.",
        expertise: ["Full-Stack Development", "AI/ML", "Islamic Jurisprudence", "Arabic Language"],
        image: "/images/developer-1.svg",
        social: {
          github: "https://github.com/alfarizi",
          linkedin: "https://linkedin.com/in/ahmad-alfarizi",
          email: "ahmad@usstuck.com"
        }
      },
      {
        id: 2,
        name: "Fatimah Rahman",
        role: "AI Researcher & Content Curator",
        description: "Specializes in Natural Language Processing and Islamic content curation. Ensures all AI responses maintain religious accuracy.",
        expertise: ["Machine Learning", "NLP", "Islamic Studies", "Content Strategy"],
        image: "/images/developer-2.svg",
        social: {
          github: "https://github.com/fatimahrahman",
          linkedin: "https://linkedin.com/in/fatimah-rahman",
          email: "fatimah@usstuck.com"
        }
      },
      {
        id: 3,
        name: "Abdullah Hassan",
        role: "Backend Developer & Database Architect",
        description: "Expert in building scalable systems and managing large Islamic text databases. Focuses on performance and reliability.",
        expertise: ["Backend Development", "Database Design", "System Architecture", "DevOps"],
        image: "/images/developer-3.svg",
        social: {
          github: "https://github.com/abdullahhassan",
          linkedin: "https://linkedin.com/in/abdullah-hassan",
          email: "abdullah@usstuck.com"
        }
      }
    ];
  }

  static getFeatures() {
    return [
      {
        title: "AI-Powered Q&A",
        description: "Get instant answers to your Islamic questions with sources from Qur'an and Hadith",
        icon: "🤖"
      },
      {
        title: "Comprehensive Hadith Database",
        description: "Access thousands of authentic Hadith from major collections like Bukhari, Muslim, and more",
        icon: "📚"
      },
      {
        title: "Community Forum",
        description: "Connect with fellow Muslims to discuss, learn, and share knowledge",
        icon: "💬"
      },
      {
        title: "Age-Appropriate Content",
        description: "Trending topics and discussions tailored to your age group and interests",
        icon: "👥"
      },
      {
        title: "Multi-Language Support",
        description: "Available in multiple languages to serve Muslims worldwide",
        icon: "🌐"
      },
      {
        title: "Mobile Responsive",
        description: "Access UsStuck from any device - desktop, tablet, or mobile",
        icon: "📱"
      }
    ];
  }

  static getStats() {
    return [
      {
        number: "10,000+",
        label: "Hadith Collections",
        description: "Authentic hadith from major collections"
      },
      {
        number: "50,000+",
        label: "Questions Answered",
        description: "AI-powered responses with sources"
      },
      {
        number: "25,000+",
        label: "Active Users",
        description: "Muslims learning together worldwide"
      },
      {
        number: "99.9%",
        label: "Accuracy Rate",
        description: "Verified by Islamic scholars"
      }
    ];
  }

  static getContact() {
    return {
      email: "contact@usstuck.com",
      phone: "+1 (555) 123-4567",
      address: "123 Islamic Center St, Education City, EC 12345",
      social: {
        facebook: "https://facebook.com/usstuck",
        twitter: "https://twitter.com/usstuck",
        instagram: "https://instagram.com/usstuck",
        youtube: "https://youtube.com/usstuck"
      }
    };
  }
}

export default AboutModel;