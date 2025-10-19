const strapi = require('@strapi/strapi');

async function clearAllData(strapiInstance) {
  try {
    console.log('🧹 Clearing all existing data...');
    
    // Clear posts first (due to foreign key constraints)
    const posts = await strapiInstance.entityService.findMany('api::post.post', {
      populate: '*'
    });
    console.log(`📝 Found ${posts.length} posts to delete`);
    for (const post of posts) {
      await strapiInstance.entityService.delete('api::post.post', post.id);
    }
    console.log(`✅ Cleared ${posts.length} posts`);

    // Clear tags
    const tags = await strapiInstance.entityService.findMany('api::tag.tag', {
      populate: '*'
    });
    console.log(`🏷️ Found ${tags.length} tags to delete`);
    for (const tag of tags) {
      await strapiInstance.entityService.delete('api::tag.tag', tag.id);
    }
    console.log(`✅ Cleared ${tags.length} tags`);

    // Clear categories
    const categories = await strapiInstance.entityService.findMany('api::category.category', {
      populate: '*'
    });
    console.log(`📁 Found ${categories.length} categories to delete`);
    for (const category of categories) {
      await strapiInstance.entityService.delete('api::category.category', category.id);
    }
    console.log(`✅ Cleared ${categories.length} categories`);

  } catch (error) {
    console.error('❌ Error clearing data:', error.message);
    throw error;
  }
}

async function main() {
  try {
    const app = await strapi.createStrapi();
    await app.load();
    
    await clearAllData(app);
    
    console.log('✨ Data clearing process completed!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Data clearing failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { clearAllData };