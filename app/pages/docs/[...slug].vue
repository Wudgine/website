<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description']
  })
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')
</script>

<template>
  <UPage v-if="page" class="flex lg:flex flex-row">
    <UPageHeader
      :title="page.title"
      :description="page.description"
    />

    <UPageBody>
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />

      <USeparator v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
            <PageSidebar
              :default-width="280"
              :min-width="200"
              :max-width="600"
              :collapsed-width="72"
              side="right"
              v-if="page?.body?.toc?.links?.length"
              class="sticky! top-0 h-screen"
            >
              <UContentToc class="sm:px-2 sm:-mx-2" highlight highlight-color="neutral" color="neutral"
                           :links="page.body.toc.links"/>

            </PageSidebar>
<!--      <UContentToc :links="page.body.toc.links" />-->
    </template>
  </UPage>
</template>
