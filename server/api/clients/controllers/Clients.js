'use strict';

/**
 * Clients.js controller
 *
 * @description: A set of functions called "actions" for managing `Clients`.
 */

module.exports = {

  /**
   * Retrieve clients records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.clients.search(ctx.query);
    } else {
      return strapi.services.clients.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a clients record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.clients.fetch(ctx.params);
  },

  /**
   * Count clients records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.clients.count(ctx.query);
  },

  /**
   * Create a/an clients record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.clients.add(ctx.request.body);
  },

  /**
   * Update a/an clients record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.clients.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an clients record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.clients.remove(ctx.params);
  }
};
