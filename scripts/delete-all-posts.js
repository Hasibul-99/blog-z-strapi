const strapi = require('@strapi/strapi');

async function deleteAllPosts() {
  try {
    const app = await strapi.createStrapi();
    await app.load();
    
    const posts = await app.entityService.findMany('api::post.post', {
      limit: 1000
    });
    
    console.log(`Found ${posts.length} posts to delete`);
    
    for (const post of posts) {
      await app.entityService.delete('api::post.post', post.id);
    }
    
    console.log('All posts deleted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error deleting posts:', error);
    process.exit(1);
  }
}

deleteAllPosts();