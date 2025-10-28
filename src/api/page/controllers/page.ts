/**
 * page controller
 */

import { factories } from "@strapi/strapi";

// export default factories.createCoreController('api::page.page');

export default factories.createCoreController(
  "api::page.page",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const entity = await strapi
          .documents("api::page.page")
          .findMany(ctx.query);
        return entity;
      } catch {
        return [];
      }
    },
    async purgeBySlugs(ctx) {
      const { slug } = ctx.request.body;
      try {
        const cacheStore = strapi
          .plugin("strapi-cache")
          .service("service")
          .getCacheInstance();
        const key = new RegExp(`^GET:/api/pages/${slug}(\\?.*)?$`);
        await cacheStore.clearByRegexp([key]);
        ctx.body = {
          message: `Cache cleared for slug: ${slug}`,
        };
      } catch (err) {
        console.error("Purge error", err);
        ctx.status = 500;
        ctx.body = {
          error: "Failed to purge cache",
        };
        return [];
      }
    },
    async findOne(ctx) {
      console.log("KAIRO ctx.params", ctx.params);
      const { id } = ctx.params;
      const { locale, user_country } = ctx.query as {
        locale: string;
        user_country: string;
      };

      let entityCheck = await strapi.documents("api::page.page").findFirst({
        filters: { documentId: id },
      });
      console.log("KAIRO entityCheck", entityCheck, id);

      let entity = {} as any;
      //   let id;

      // return globle lang data if non-exist for the country
      if (!entityCheck) {
        entity = await strapi.documents("api::page.page").findFirst({
          filters: { documentId: id },
          populate: "*",
        });
        // id = entity?.id;
      } else {
        // id = entityCheck.id;
        // entity = await strapi.documents("api::page.page").findFirst({
        //   filters: { documentId: id },
        //   populate: "*",
        // });
        entity = await strapi.documents("api::page.page").findOne({
          documentId: id,
          populate: "*",
        });
        console.log("KAIRO entity", entity);
      }

      if (!id) return {};

      const data = await this.sanitizeOutput(entity, ctx);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (data?.footer?.components) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data!.footer["components"] = processFooterObject(data);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (data?.sections) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // data!.sections = await processSectionsObject(data.sections, country);
      }

      return entity;
    },
  })
);
