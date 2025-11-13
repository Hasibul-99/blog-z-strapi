'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    const extension = ({ nexus }) => ({
      types: [
        nexus.objectType({
          type: "Creator",
          name: "Creator",
          definition(t) {
            t.int("id");
            t.string("firstname");
            t.string("lastname");
          },
        }),
        nexus.extendType({
          type: "Post",
          definition(t) {
            t.field("createdBy", {
              type: "Creator",
              async resolve(root) {
                const query = strapi.db.query("api::post.post");
                const post = await query.findOne({
                  where: {
                    id: root.id,
                  },
                  populate: ["createdBy"],
                });

                return {
                  id: post.createdBy.id,
                  firstname: post.createdBy.firstname,
                  lastname: post.createdBy.lastname,
                };
              },
            });
          },
        }),
      ],
    });

    extensionService.use(extension);
  },
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set up public permissions for GraphQL access
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const contentTypes = ['api::post.post', 'api::category.category', 'api::tag.tag'];
      const actions = ['find', 'findOne'];

      for (const contentType of contentTypes) {
        for (const action of actions) {
          const existingPermission = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({
              where: {
                action: `${contentType}.${action}`,
                role: publicRole.id,
              },
            });

          if (!existingPermission) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action: `${contentType}.${action}`,
                role: publicRole.id,
              },
            });
            console.log(`✅ Created public permission for ${contentType}.${action}`);
          } else {
            console.log(`ℹ️  Public permission already exists for ${contentType}.${action}`);
          }
        }
      }

      // Allow Public to create Subscriber and Contact entries
      const createContentTypes = ['api::subscriber.subscriber', 'api::contact.contact'];
      for (const contentType of createContentTypes) {
        const action = 'create';
        const existingCreate = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              action: `${contentType}.${action}`,
              role: publicRole.id,
            },
          });

        if (!existingCreate) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: `${contentType}.${action}`,
              role: publicRole.id,
            },
          });
          console.log(`✅ Created public permission for ${contentType}.${action}`);
        } else {
          console.log(`ℹ️  Public permission already exists for ${contentType}.${action}`);
        }
      }
    }
  },
};
