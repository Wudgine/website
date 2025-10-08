<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.svg' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Wudgine',
  ogImage: 'https://images.rawpixel.com/light_image_png_200/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 200w, https://images.rawpixel.com/light_image_png_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 400w, https://images.rawpixel.com/light_image_png_600/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 600w, https://images.rawpixel.com/light_image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 1600w, https://images.rawpixel.com/light_image_png_1100/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 2400w, https://images.rawpixel.com/light_image_png_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png',
  twitterImage: 'https://images.rawpixel.com/light_image_png_200/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 200w, https://images.rawpixel.com/light_image_png_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 400w, https://images.rawpixel.com/light_image_png_600/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 600w, https://images.rawpixel.com/light_image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 1600w, https://images.rawpixel.com/light_image_png_1100/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png 2400w, https://images.rawpixel.com/light_image_png_1300/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9kaWdpdGFsX3BhaW50X21pbmltYWxfaWxsdXN0cmF0aW9uX29mX2NsZWFuX2p1bl8wNzUzYTY0ZC03ZDYxLTRjZjItYmI4YS0wNGMzMjFhYjViYzBfMS5wbmc.png',
  twitterCard: 'summary_large_image'
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'), {
  transform: data => data.find(item => item.path === '/docs')?.children || []
})
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false
})

const links = [{
  label: 'Docs',
  icon: 'i-lucide-book',
  to: '/docs/getting-started/introduction'
}, {
  label: 'Pricing',
  icon: 'i-lucide-credit-card',
  to: '/pricing'
}, {
  label: 'Blog',
  icon: 'i-lucide-pencil',
  to: '/blog'
}, {
  label: 'Changelog',
  icon: 'i-lucide-history',
  to: '/changelog'
}]

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
