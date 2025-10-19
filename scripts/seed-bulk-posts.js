const strapi = require('@strapi/strapi');

// Categories mapping based on API response
const categories = [
  { documentId: "bvgqi0aklt2aar52cpaowaiu", title: "Game", slug: "game" },
  { documentId: "k6bk5o8mxxohuls87c36we3s", title: "Technology", slug: "technology" },
  { documentId: "ywyaitkdebml49vj2lw9ah5b", title: "Sports", slug: "sports" },
  { documentId: "jxvuu813iectwavxbnwmplzb", title: "Politics", slug: "politics" },
  { documentId: "dkwgqb49l45jdgfza46itg0w", title: "Entertainment", slug: "entertainment" },
  { documentId: "lutdi1or4srd55xw4bihbw39", title: "Health", slug: "health" }
];

// Sample post templates for each category
const postTemplates = {
  game: [
    {
      titleTemplate: "Latest Gaming News: {topic}",
      topics: ["New Console Release", "Indie Game Spotlight", "Gaming Tournament Results", "VR Gaming Breakthrough", "Mobile Gaming Trends", "Retro Gaming Revival", "Gaming Industry Updates", "Esports Championship", "Game Development Insights", "Gaming Hardware Review"],
      keywords: "gaming, video games, console, PC gaming, mobile games"
    }
  ],
  technology: [
    {
      titleTemplate: "Tech Innovation: {topic}",
      topics: ["AI Breakthrough", "Quantum Computing Advance", "Smartphone Technology", "Cloud Computing Solutions", "Cybersecurity Updates", "IoT Developments", "Blockchain Applications", "5G Network Expansion", "Software Engineering", "Tech Startup News"],
      keywords: "technology, innovation, AI, software, hardware"
    }
  ],
  sports: [
    {
      titleTemplate: "Sports Update: {topic}",
      topics: ["Championship Finals", "Player Transfer News", "Olympic Preparations", "Record Breaking Performance", "Team Strategy Analysis", "Sports Medicine Breakthrough", "Youth Sports Development", "International Competition", "Coaching Techniques", "Sports Equipment Innovation"],
      keywords: "sports, athletics, competition, fitness, training"
    }
  ],
  politics: [
    {
      titleTemplate: "Political News: {topic}",
      topics: ["Policy Reform Announcement", "Election Campaign Updates", "International Relations", "Government Budget Discussion", "Legislative Changes", "Public Opinion Polls", "Political Analysis", "Diplomatic Meetings", "Civic Engagement", "Government Transparency"],
      keywords: "politics, government, policy, election, democracy"
    }
  ],
  entertainment: [
    {
      titleTemplate: "Entertainment Buzz: {topic}",
      topics: ["Movie Premiere Review", "Music Album Release", "Celebrity Interview", "Award Show Highlights", "TV Series Finale", "Concert Tour Announcement", "Film Festival Coverage", "Streaming Platform News", "Theater Production", "Entertainment Industry Trends"],
      keywords: "entertainment, movies, music, celebrities, shows"
    }
  ],
  health: [
    {
      titleTemplate: "Health & Wellness: {topic}",
      topics: ["Medical Research Breakthrough", "Nutrition Guidelines Update", "Mental Health Awareness", "Fitness Trends", "Healthcare Technology", "Disease Prevention Tips", "Wellness Program Success", "Medical Treatment Innovation", "Public Health Initiative", "Healthcare Policy Changes"],
      keywords: "health, wellness, medicine, fitness, nutrition"
    }
  ]
};

// Generate diverse content for posts
function generatePostContent(category, topic, index) {
  const baseContent = {
    game: `Explore the latest developments in the gaming world with our comprehensive coverage of ${topic}. This exciting update brings new opportunities for gamers and industry professionals alike.`,
    technology: `Discover cutting-edge technological innovations with ${topic}. This breakthrough represents a significant step forward in the tech industry and promises to transform how we interact with technology.`,
    sports: `Get the latest sports coverage featuring ${topic}. This comprehensive analysis provides insights into the competitive world of athletics and the dedication of professional athletes.`,
    politics: `Stay informed about important political developments with ${topic}. This detailed coverage examines the implications and potential impact on citizens and policy-making processes.`,
    entertainment: `Dive into the entertainment world with ${topic}. This engaging coverage highlights the creativity and talent that drives the entertainment industry forward.`,
    health: `Learn about important health and wellness topics with ${topic}. This informative content provides valuable insights for maintaining a healthy lifestyle and understanding medical advances.`
  };

  const secondaryContent = {
    game: `The gaming industry continues to evolve with innovative technologies and creative storytelling. This development showcases the passion and dedication of game developers worldwide.`,
    technology: `Technology advancement requires collaboration between researchers, engineers, and innovators. This progress demonstrates the potential for positive change through technological solutions.`,
    sports: `Athletic excellence demands dedication, training, and perseverance. This story highlights the commitment required to achieve success in competitive sports.`,
    politics: `Democratic processes rely on informed citizens and transparent governance. This coverage aims to provide clarity on complex political issues and their broader implications.`,
    entertainment: `Creative expression through entertainment brings joy and inspiration to audiences worldwide. This content celebrates the artistic vision and hard work of entertainment professionals.`,
    health: `Health and wellness are fundamental to quality of life. This information aims to educate and empower individuals to make informed decisions about their well-being.`
  };

  return {
    content_first: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: baseContent[category]
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
            text: secondaryContent[category]
          }
        ]
      }
    ]
  };
}

// Generate slug from title with timestamp and random number for uniqueness
function generateSlug(title, index) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${baseSlug}-${timestamp}-${random}-${index}`;
}

async function createBulkPosts(strapiInstance) {
  console.log('🚀 Starting bulk post creation for 200 posts...');
  
  try {
    const postsPerCategory = Math.floor(200 / categories.length);
    const remainingPosts = 200 % categories.length;
    let totalCreated = 0;
    
    console.log(`📊 Creating ${postsPerCategory} posts per category (${categories.length} categories)`);
    if (remainingPosts > 0) {
      console.log(`📊 ${remainingPosts} additional posts will be distributed among first categories`);
    }
    
    for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
      const category = categories[categoryIndex];
      const template = postTemplates[category.slug][0];
      
      // Calculate posts for this category
      let postsForThisCategory = postsPerCategory;
      if (categoryIndex < remainingPosts) {
        postsForThisCategory += 1;
      }
      
      console.log(`\n📂 Creating ${postsForThisCategory} posts for category: ${category.title}`);
      
      for (let postIndex = 0; postIndex < postsForThisCategory; postIndex++) {
        try {
          const topicIndex = postIndex % template.topics.length;
          const topic = template.topics[topicIndex];
          const title = template.titleTemplate.replace('{topic}', topic) + ` #${totalCreated + 1}`;
          const slug = generateSlug(title, totalCreated + 1);
          
          const content = generatePostContent(category.slug, topic, postIndex);
          
          const postData = {
            title: title,
            slug: slug,
            description: `Comprehensive coverage of ${topic.toLowerCase()} with detailed analysis and insights.`,
            keywords: template.keywords,
            rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
            breadcrumb: [
              { url: "/", name: "Home" },
              { url: `/${category.slug}`, name: category.title },
              { url: `/${slug}`, name: title }
            ],
            is_active: true,
            top_post: Math.random() < 0.3, // 30% chance of being top post
            recent_post: Math.random() < 0.7, // 70% chance of being recent post
            category: category.documentId,
            tags: [], // Empty tags array since we only have one tag
            image: [1], // Assign the existing image with ID 1
            locale: 'en',
            publishedAt: new Date(),
            createdBy: 1,
            updatedBy: 1,
            ...content
          };
          
          const post = await strapiInstance.entityService.create('api::post.post', {
            data: postData
          });
          
          totalCreated++;
          
          if (totalCreated % 10 === 0) {
            console.log(`✅ Created ${totalCreated}/200 posts...`);
          }
          
        } catch (error) {
          console.error(`❌ Error creating post ${postIndex + 1} for ${category.title}:`, error.message);
        }
      }
    }
    
    console.log(`\n🎉 Bulk post creation completed! Created ${totalCreated} posts total.`);
    
    // Summary by category
    console.log('\n📊 Posts created by category:');
    for (let i = 0; i < categories.length; i++) {
      let postsForCategory = postsPerCategory;
      if (i < remainingPosts) {
        postsForCategory += 1;
      }
      console.log(`  ${categories[i].title}: ${postsForCategory} posts`);
    }
    
  } catch (error) {
    console.error('❌ Error in bulk post creation:', error);
    throw error;
  }
}

// Run the bulk seeder
async function main() {
  try {
    const app = await strapi.createStrapi();
    await app.load();
    
    await createBulkPosts(app);
    
    console.log('✨ Bulk post seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Bulk post seeding failed:', error);
    process.exit(1);
  }
}

main();