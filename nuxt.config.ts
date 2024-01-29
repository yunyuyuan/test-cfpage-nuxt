// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    cloudflare: {
      pages: {
        routes: {
          include: ["/api/*"]
        }
      }
    }
  },
})
