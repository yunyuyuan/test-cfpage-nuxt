// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    cloudflare: {
      pages: {
        routes: {
          include: ["/api/*"]
        }
      }
    }
  },
})
