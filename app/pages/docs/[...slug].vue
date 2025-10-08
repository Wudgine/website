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
  <UPage v-if="page" class="flex lg:flex flex-row lg:grid-cols-none!">

    <UContentToc class="overflow-y-hidden! lg:hidden" highlight highlight-color="neutral" color="neutral"
                 :links="page.body.toc.links"/>
    <UPageHeader
      :title="page.title"
      :description="page.description"
    >


    </UPageHeader>

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
              :min-width="135"
              :max-width="600"
              :collapsed-width="80"
              side="right"
              v-if="page?.body?.toc?.links?.length"
              class="top-0 h-screen hidden! lg:sticky! lg:flex!"
            >
              <UContentToc class="sm:px-4 sm:-mx-2 overflow-x-hidden" highlight highlight-color="neutral" color="neutral"
                           :links="page.body.toc.links"
                           :ui="{
                             container: 'lg:py-0! lg:pt-4!'
                           }"
              />

            </PageSidebar>
<!--      <UContentToc :links="page.body.toc.links" />-->
    </template>
  </UPage>
</template>
