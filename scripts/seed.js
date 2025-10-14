const strapi = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');

// Sample data
const categories = [
  {
    title: 'Technology',
    slug: 'technology',
    description: 'Latest technology news and updates',
    keywords: 'tech, technology, innovation, gadgets',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Technology', url: '/technology' }],
    is_active: true,
    is_hot: true,
    rating: 9
  },
  {
    title: 'Sports',
    slug: 'sports',
    description: 'Sports news, scores, and analysis',
    keywords: 'sports, football, basketball, soccer',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Sports', url: '/sports' }],
    is_active: true,
    is_hot: true,
    rating: 8
  },
  {
    title: 'Politics',
    slug: 'politics',
    description: 'Political news and analysis',
    keywords: 'politics, government, elections, policy',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Politics', url: '/politics' }],
    is_active: true,
    is_hot: false,
    rating: 7
  },
  {
    title: 'Entertainment',
    slug: 'entertainment',
    description: 'Entertainment news and celebrity updates',
    keywords: 'entertainment, movies, music, celebrities',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Entertainment', url: '/entertainment' }],
    is_active: true,
    is_hot: true,
    rating: 8
  },
  {
    title: 'Health',
    slug: 'health',
    description: 'Health and wellness news',
    keywords: 'health, wellness, medicine, fitness',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Health', url: '/health' }],
    is_active: true,
    is_hot: false,
    rating: 7
  },
  {
    title: 'Game',
    slug: 'game',
    description: 'Gaming news and reviews',
    keywords: 'games, gaming, video games, esports',
    breadcrumb: [{ name: 'Home', url: '/' }, { name: 'Game', url: '/game' }],
    is_active: true,
    is_hot: true,
    rating: 9
  }
];

const tags = [
  { title: 'Breaking News', is_active: true },
  { title: 'Trending', is_active: true },
  { title: 'Analysis', is_active: true },
  { title: 'Review', is_active: true },
  { title: 'Opinion', is_active: true },
  { title: 'Interview', is_active: true },
  { title: 'Feature', is_active: true },
  { title: 'Update', is_active: true }
];

const posts = [
  {
    title: 'The Future of Artificial Intelligence in 2024',
    slug: 'future-artificial-intelligence-2024',
    description: 'Exploring the latest developments and trends in AI technology',
    keywords: 'AI, artificial intelligence, machine learning, technology',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Technology', url: '/technology' },
      { name: 'AI News', url: '/technology/ai' }
    ],
    rating: 5,
    is_active: true,
    top_post: true,
    recent_post: true,
    content_first: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Artificial Intelligence continues to evolve at an unprecedented pace, transforming industries and reshaping our daily lives. In 2024, we are witnessing remarkable breakthroughs in machine learning, natural language processing, and computer vision.'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'From autonomous vehicles to personalized healthcare, AI applications are becoming more sophisticated and accessible. This comprehensive analysis explores the key trends and innovations that will define the AI landscape in the coming year.'
          }
        ]
      }
    ],
    content_sec: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'The integration of AI in various sectors promises to enhance efficiency, reduce costs, and create new opportunities for innovation. As we move forward, ethical considerations and responsible AI development remain paramount.'
          }
        ]
      }
    ]
  },
  {
    title: 'Championship Finals: A Thrilling Match Analysis',
    slug: 'championship-finals-thrilling-match-analysis',
    description: 'Complete breakdown of the championship finals match',
    keywords: 'championship, finals, sports, analysis, match',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Sports', url: '/sports' },
      { name: 'Championship', url: '/sports/championship' }
    ],
    rating: 4,
    is_active: true,
    top_post: false,
    recent_post: true,
    content_first: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'The championship finals delivered an unforgettable spectacle of athletic prowess and strategic brilliance. Both teams showcased exceptional skill and determination throughout the intense 90-minute battle.'
          }
        ]
      }
    ]
  },
  {
    title: 'Political Landscape: Key Policy Changes Ahead',
    slug: 'political-landscape-key-policy-changes-ahead',
    description: 'Analysis of upcoming policy changes and their implications',
    keywords: 'politics, policy, government, changes, analysis',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Politics', url: '/politics' },
      { name: 'Policy', url: '/politics/policy' }
    ],
    rating: 4,
    is_active: true,
    top_post: false,
    recent_post: true,
    content_first: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'The political arena is witnessing significant shifts as new policies are being proposed and debated. These changes could have far-reaching implications for citizens and businesses alike.'
          }
        ]
      }
    ]
  },
  {
    title: 'Hollywood Blockbuster Breaks Box Office Records',
    slug: 'hollywood-blockbuster-breaks-box-office-records',
    description: 'Latest blockbuster movie shatters previous box office records',
    keywords: 'hollywood, movies, box office, entertainment, blockbuster',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Entertainment', url: '/entertainment' },
      { name: 'Movies', url: '/entertainment/movies' }
    ],
    rating: 5,
    is_active: true,
    top_post: true,
    recent_post: true,
    content_first: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'The latest Hollywood blockbuster has taken the entertainment world by storm, breaking multiple box office records in its opening weekend. Audiences worldwide have flocked to theaters to experience this cinematic masterpiece.'
          }
        ]
      }
    ]
  },
  {
    title: 'Revolutionary Health Study Reveals Breakthrough',
    slug: 'revolutionary-health-study-reveals-breakthrough',
    description: 'New medical research shows promising results for treatment',
    keywords: 'health, medical, research, breakthrough, treatment',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Health', url: '/health' },
      { name: 'Research', url: '/health/research' }
    ],
    rating: 5,
    is_active: true,
    top_post: false,
    recent_post: true,
    content_first: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'A groundbreaking medical study has revealed promising new treatment options that could revolutionize patient care. The research, conducted over five years, shows significant improvements in treatment outcomes.'
          }
        ]
      }
    ]
  },
  {
    title: 'Gaming Industry Reaches New Heights in 2024',
    slug: 'gaming-industry-reaches-new-heights-2024',
    description: 'Gaming industry shows record growth and innovation',
    keywords: 'gaming, video games, industry, growth, innovation',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Game', url: '/game' },
      { name: 'Industry', url: '/game/industry' }
    ],
    rating: 4,
    is_active: true,
    top_post: true,
    recent_post: true,
    content_first: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'The gaming industry continues to break new ground with innovative technologies and engaging content. From virtual reality experiences to mobile gaming revolution, 2024 marks a pivotal year for interactive entertainment.'
          }
        ]
      }
    ]
  }
];

async function clearExistingData(strapiInstance) {
  console.log('🧹 Clearing existing data...');
  
  try {
    // Clear posts first (due to relations)
    const existingPosts = await strapiInstance.entityService.findMany('api::post.post', {
      locale: 'all'
    });
    for (const post of existingPosts) {
      await strapiInstance.entityService.delete('api::post.post', post.id);
    }
    console.log(`🗑️ Cleared ${existingPosts.length} posts`);

    // Clear tags
    const existingTags = await strapiInstance.entityService.findMany('api::tag.tag', {
      locale: 'all'
    });
    for (const tag of existingTags) {
      await strapiInstance.entityService.delete('api::tag.tag', tag.id);
    }
    console.log(`🗑️ Cleared ${existingTags.length} tags`);

    // Clear categories
    const existingCategories = await strapiInstance.entityService.findMany('api::category.category', {
      locale: 'all'
    });
    for (const category of existingCategories) {
      await strapiInstance.entityService.delete('api::category.category', category.id);
    }
    console.log(`🗑️ Cleared ${existingCategories.length} categories`);
    
  } catch (error) {
    console.log('ℹ️ No existing data to clear or error clearing:', error.message);
  }
}

async function seedData(strapiInstance) {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Create categories
    console.log('📁 Creating categories...');
    const createdCategories = [];
    for (const categoryData of categories) {
      try {
        const category = await strapiInstance.entityService.create('api::category.category', {
          data: {
            ...categoryData,
            publishedAt: new Date(),
            locale: 'en'
          }
        });
        createdCategories.push(category);
        console.log(`✅ Created category: ${category.title}`);
      } catch (error) {
        console.error(`❌ Error creating category ${categoryData.title}:`, error.details || error.message);
        throw error;
      }
    }

    // Create tags
    console.log('🏷️ Creating tags...');
    const createdTags = [];
    for (const tagData of tags) {
      try {
        const tag = await strapiInstance.entityService.create('api::tag.tag', {
          data: {
            ...tagData,
            publishedAt: new Date(),
            locale: 'en'
          }
        });
        createdTags.push(tag);
        console.log(`✅ Created tag: ${tag.title}`);
      } catch (error) {
        console.error(`❌ Error creating tag ${tagData.title}:`, error.details || error.message);
        throw error;
      }
    }

    // Create posts
    console.log('📝 Creating posts...');
    for (let i = 0; i < posts.length; i++) {
      const postData = posts[i];
      const categoryIndex = i % createdCategories.length;
      const tagIndices = [i % createdTags.length, (i + 1) % createdTags.length];
      
      try {
        const post = await strapiInstance.entityService.create('api::post.post', {
          data: {
            ...postData,
            category: createdCategories[categoryIndex].id,
            tags: tagIndices.map(idx => createdTags[idx].id),
            publishedAt: new Date(),
            locale: 'en'
          }
        });
        console.log(`✅ Created post: ${post.title}`);
      } catch (error) {
        console.error(`❌ Error creating post ${postData.title}:`, error.details || error.message);
        throw error;
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Tags: ${createdTags.length}`);
    console.log(`   - Posts: ${posts.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seeder
async function main() {
  try {
    const app = await strapi.createStrapi();
    await app.load();
    
    await clearExistingData(app);
    await seedData(app);
    
    console.log('✨ Seeding process completed!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { seedData };