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
  bootstrap(/*{ strapi }*/) {},
};
