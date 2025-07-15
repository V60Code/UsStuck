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
        name: "Muhammad Alfarizi Habibullah",
        role: "Frontend & Backend Developer",
        description: "Passionate full-stack developer with expertise in modern web technologies and backend systems. Dedicated to creating seamless user experiences.",
        expertise: ["Frontend Development", "Backend Development", "JavaScript", "Node.js", "React"],
        image: "/images/developer-1.svg",
        social: {
          github: "https://github.com/V60Code",
          linkedin: "https://www.linkedin.com/in/m-alfarizi-habibullah/",
          email: "m.alfarizihabibullah@gmail.com"
        }
      },
      {
        id: 2,
        name: "Ahmad Mushthofa Kamal",
        role: "Team Leader",
        description: "Experienced team leader with strong project management skills and technical expertise. Specializes in Linux administration, DevOps, and system architecture.",
        expertise: ["Linux Administrator", "DevOps", "Project Manager", "System Architecture"],
        image: "/images/developer-2.svg",
        social: {
          github: "https://github.com/muzzto",
          linkedin: "https://www.linkedin.com/in/a-mushthofa/",
          email: "am240755@gmail.com"
        }
      },
      {
        id: 3,
        name: "Zhafran Pradistyatama Kuncoro",
        role: "UI/UX Designer",
        description: "Creative UI/UX designer focused on creating intuitive and beautiful user interfaces. Ensures optimal user experience across all platforms.",
        expertise: ["UI Design", "UX Research", "Prototyping", "User Testing", "Design Systems"],
        image: "/images/developer-3.svg",
        social: {
          github: "https://github.com/NorpajSucces",
          linkedin: "https://www.linkedin.com/in/zhafran-kuncoro",
          email: "zhafrankuncoro@gmail.com"
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
      phone: "+62 274 512840",
      address: "Jl. Laksda Adisucipto, Papringan, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281",
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