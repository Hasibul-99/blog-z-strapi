const strapi = require('@strapi/strapi');

async function checkExistingData(strapiInstance) {
  try {
    console.log('🔍 Checking existing data in database...');
    
    // Check categories
    const categories = await strapiInstance.entityService.findMany('api::category.category', {
      populate: '*'
    });
    console.log(`📁 Found ${categories.length} existing categories:`);
    categories.forEach(cat => {
      console.log(`  - ${cat.title} (${cat.slug}) - Locale: ${cat.locale || 'default'}`);
    });

    // Check tags
    const tags = await strapiInstance.entityService.findMany('api::tag.tag', {
      populate: '*'
    });
    console.log(`🏷️ Found ${tags.length} existing tags:`);
    tags.forEach(tag => {
      console.log(`  - ${tag.title} - Locale: ${tag.locale || 'default'}`);
    });

    // Check posts
    const posts = await strapiInstance.entityService.findMany('api::post.post', {
      populate: '*'
    });
    console.log(`📝 Found ${posts.length} existing posts:`);
    posts.forEach(post => {
      console.log(`  - ${post.title} - Locale: ${post.locale || 'default'}`);
    });

  } catch (error) {
    console.error('❌ Error checking existing data:', error.message);
  }
}

async function main() {
  try {
    const app = await strapi.createStrapi().load();
    await checkExistingData(app);
    await app.destroy();
    console.log('✅ Data check completed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkExistingData };