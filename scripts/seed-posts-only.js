const strapi = require('@strapi/strapi');

// Sample posts data
const postsData = [
  {
    title: "The Future of Artificial Intelligence in 2024",
    slug: "future-artificial-intelligence-2024",
    description: "Exploring the latest developments and trends in AI technology that will shape our future.",
    keywords: "artificial intelligence, AI, technology, future, machine learning",
    rating: 5,
    breadcrumb: [
      { url: "/", name: "Home" },
      { url: "/technology", name: "Technology" },
      { url: "/future-artificial-intelligence-2024", name: "The Future of Artificial Intelligence in 2024" }
    ],
    is_active: true,
    top_post: true,
    recent_post: true,
    content_first: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Artificial Intelligence continues to evolve at an unprecedented pace, transforming industries and reshaping how we interact with technology. In 2024, we're witnessing breakthrough developments in machine learning, natural language processing, and computer vision that promise to revolutionize our daily lives."
          }
        ]
      }
    ],
    content_sec: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "From autonomous vehicles to personalized healthcare solutions, AI is becoming more integrated into our society. This comprehensive analysis explores the key trends, challenges, and opportunities that define the AI landscape in 2024."
          }
        ]
      }
    ]
  },
  {
    title: "Championship Finals: A Thrilling Victory",
    slug: "championship-finals-thrilling-victory",
    description: "An exciting recap of the championship finals that kept fans on the edge of their seats.",
    keywords: "sports, championship, finals, victory, competition",
    rating: 4,
    breadcrumb: [
      { url: "/", name: "Home" },
      { url: "/sports", name: "Sports" },
      { url: "/championship-finals-thrilling-victory", name: "Championship Finals: A Thrilling Victory" }
    ],
    is_active: true,
    top_post: false,
    recent_post: true,
    content_first: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Last night's championship finals delivered everything fans could hope for - drama, skill, and an unforgettable finish that will be talked about for years to come. The match showcased the very best of competitive sports."
          }
        ]
      }
    ],
    content_sec: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Both teams displayed exceptional talent and determination throughout the game. The final moments were particularly intense, with lead changes that kept the audience captivated until the very last second."
          }
        ]
      }
    ]
  },
  {
    title: "Breaking: Major Policy Changes Announced",
    slug: "breaking-major-policy-changes-announced",
    description: "Government announces significant policy reforms that will impact citizens nationwide.",
    keywords: "politics, policy, government, reform, announcement",
    rating: 4,
    breadcrumb: [
      { url: "/", name: "Home" },
      { url: "/politics", name: "Politics" },
      { url: "/breaking-major-policy-changes-announced", name: "Breaking: Major Policy Changes Announced" }
    ],
    is_active: true,
    top_post: true,
    recent_post: true,
    content_first: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "In a landmark announcement today, government officials unveiled a comprehensive set of policy reforms designed to address key challenges facing the nation. These changes represent the most significant legislative updates in recent years."
          }
        ]
      }
    ],
    content_sec: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "The new policies cover areas including healthcare, education, and economic development. Officials emphasize that these reforms will create positive long-term impacts for citizens across all demographics."
          }
        ]
      }
    ]
  },
  {
    title: "Hollywood's Biggest Night: Award Show Highlights",
    slug: "hollywood-biggest-night-award-show-highlights",
    description: "Recap of the most memorable moments from this year's prestigious award ceremony.",
    keywords: "entertainment, awards, Hollywood, celebrities, movies",
    rating: 4,
    breadcrumb: [
      { url: "/", name: "Home" },
      { url: "/entertainment", name: "Entertainment" },
      { url: "/hollywood-biggest-night-award-show-highlights", name: "Hollywood's Biggest Night: Award Show Highlights" }
    ],
    is_active: true,
    top_post: false,
    recent_post: true,
    content_first: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "The entertainment industry's most anticipated night delivered spectacular performances, emotional speeches, and surprising wins. This year's ceremony celebrated outstanding achievements in film and television."
          }
        ]
      }
    ],
    content_sec: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "From stunning red carpet fashion to heartfelt acceptance speeches, the evening was filled with memorable moments that showcased the best of Hollywood's talent and creativity."
          }
        ]
      }
    ]
  },
  {
    title: "Breakthrough in Medical Research: New Treatment Shows Promise",
    slug: "breakthrough-medical-research-new-treatment-promise",
    description: "Scientists announce promising results from clinical trials of innovative medical treatment.",
    keywords: "health, medical research, treatment, breakthrough, science",
    rating: 5,
    breadcrumb: [
      { url: "/", name: "Home" },
      { url: "/health", name: "Health" },
      { url: "/breakthrough-medical-research-new-treatment-promise", name: "Breakthrough in Medical Research: New Treatment Shows Promise" }
    ],
    is_active: true,
    top_post: true,
    recent_post: true,
    content_first: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Medical researchers have announced groundbreaking results from recent clinical trials, showing significant promise for a new treatment approach. This development could potentially transform patient care and outcomes."
          }
        ]
      }
    ],
    content_sec: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "The research team's innovative approach has shown remarkable success rates in early trials. If approved, this treatment could offer new hope for patients who previously had limited options."
          }
        ]
      }
    ]
  }
];

async function seedPosts(strapiInstance) {
  console.log('🌱 Starting to seed posts...');
  
  try {
    // Get existing categories to link posts
    const categories = await strapiInstance.entityService.findMany('api::category.category', {
      locale: 'all'
    });
    
    console.log(`📂 Found ${categories.length} categories`);
    
    // Create a mapping of category slugs to IDs
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat.documentId;
    });
    
    // Get existing tags
    const tags = await strapiInstance.entityService.findMany('api::tag.tag', {
      locale: 'all'
    });
    
    console.log(`🏷️ Found ${tags.length} tags`);
    
    let createdPosts = 0;
    
    for (const postData of postsData) {
      try {
        // Determine category based on breadcrumb
        let categoryId = null;
        if (postData.breadcrumb && postData.breadcrumb.length > 1) {
          const categorySlug = postData.breadcrumb[1].url.replace('/', '');
          categoryId = categoryMap[categorySlug];
        }
        
        // Create the post
        const post = await strapiInstance.entityService.create('api::post.post', {
          data: {
            ...postData,
            category: categoryId,
            tags: tags.slice(0, 2).map(tag => tag.documentId), // Assign first 2 tags
            locale: 'en',
            publishedAt: new Date()
          }
        });
        
        console.log(`✅ Created post: ${post.title}`);
        createdPosts++;
        
      } catch (error) {
        console.error(`❌ Error creating post "${postData.title}":`, error.message);
      }
    }
    
    console.log(`🎉 Successfully created ${createdPosts} posts!`);
    
  } catch (error) {
    console.error('❌ Error seeding posts:', error);
    throw error;
  }
}

// Run the seeder
async function main() {
  try {
    const app = await strapi.createStrapi();
    await app.load();
    
    await seedPosts(app);
    
    console.log('✨ Post seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Post seeding failed:', error);
    process.exit(1);
  }
}

main();