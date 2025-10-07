<!--<script setup lang="ts">-->
<!--import { type ContentNavigationItem, ParsedContent } from '@nuxt/content'-->

<!--// `useContentScroll` больше не нужен-->
<!--// import { useContentScroll } from '#imports'-->

<!--const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')-->
<!--const route = useRoute()-->

<!--// Ваш код для получения данных остается прежним-->
<!--const { data: page } = await useAsyncData(-->
<!--  () => route.path,-->
<!--  async () => {-->
<!--    const content = await queryCollection('docs').path(route.path).first()-->
<!--    if (!content) {-->
<!--      return null-->
<!--    }-->
<!--    return content-->
<!--  }-->
<!--)-->

<!--if (!page.value) {-->
<!--  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })-->
<!--}-->

<!--const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {-->
<!--  return queryCollectionItemSurroundings('content', route.path)-->
<!--})-->

<!--// `ref` и `onMounted` для отслеживания скролла больше не нужны.-->
<!--// const mainContentRef = ref<HTMLElement | null>(null)-->
<!--// onMounted(() => {-->
<!--//   if (mainContentRef.value) {-->
<!--//     useContentScroll(mainContentRef)-->
<!--//   }-->
<!--// })-->

<!--</script>-->

<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
if (!page.value) {
throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
//   return queryCollectionItemSurroundings('content', route.path)
// })
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :title="page.title" />

    <UPageBody>
<!--      <ContentRenderer v-if="page.body" :value="page" />-->

<!--      <USeparator v-if="surround?.filter(Boolean).length" />-->

<!--      <UContentSurround :surround="(surround as any)" />-->
    </UPageBody>

    <template v-if="page?.body?.toc?.links?.length" #right>
      <UContentToc :links="page.body.toc.links" />
    </template>
  </UPage>
</template>

<!--<template>-->
<!--  <div class="flex flex-col ">-->
<!--    <AppHeader/>-->
<!--    <UDashboardGroup>-->
<!--      <UDashboardSidebar :mode="'slideover'" class="hidden lg:hidden">-->
<!--        <template #header="{ collapsed }">-->
<!--          <div v-if="!collapsed" class="h-5 w-auto"/>-->
<!--          <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto"/>-->


<!--          <UContentSearchButton :collapsed="false"-->
<!--                                class="overflow-hidden w-full"-->
<!--                                :ui="{-->
<!--                                  leading: '',-->
<!--                                  default: 'none',-->
<!--                                  trailing: isLeftSidebarOpen?'-ml-5':'',-->
<!--                                }"-->
<!--          />-->
<!--        </template>-->


<!--        <UContentNavigation-->
<!--          :navigation="navigation"-->
<!--          highlight-->
<!--        />-->
<!--      </UDashboardSidebar>-->

<!--      <UDashboardPanel class="flex lg:hidden">-->
<!--        <template #header>-->
<!--          <UDashboardNavbar title="Documentation"/>-->
<!--        </template>-->
<!--      </UDashboardPanel>-->
<!--    </UDashboardGroup>-->
<!--    &lt;!&ndash;      <template v-if="page?.body?.toc?.links?.length" #left>&ndash;&gt;-->
<!--    <div class="flex flex-row">-->


<!--      <PageSidebar-->
<!--        :default-width="280"-->
<!--        :min-width="135"-->
<!--        :max-width="600"-->
<!--        :collapsed-width="80"-->
<!--      >-->
<!--        <UDashboardNavbar title="Documentation">-->
<!--          <template #leading>-->
<!--            <UDashboardSidebarCollapse/>-->
<!--          </template>-->
<!--        </UDashboardNavbar>-->
<!--        <div class="w-full px-5 py-4">-->
<!--          <UContentSearchButton :collapsed="false"-->
<!--                                class="overflow-hidden w-full"-->
<!--                                :ui="{-->
<!--                                  trailing: isLeftSidebarOpen?'-ml-5':'',-->
<!--                                }"-->
<!--          />-->
<!--        </div>-->

<!--        <div class="px-4">-->
<!--          <UContentNavigation-->
<!--            :navigation="navigation"-->
<!--            highlight-->
<!--          />-->
<!--        </div>-->
<!--      </PageSidebar>-->

<!--      &lt;!&ndash;      </template>&ndash;&gt;-->
<!--      <div class="flex flex-col">-->
<!--        <div class="">-->
<!--          <UPageHeader :title="page.title"-->
<!--            :ui="{-->
<!--              title: 'px-8'-->
<!--            }"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="px-8">-->

<!--          <div>-->
<!--            <ContentRenderer v-if="page.body" :value="page"/>-->

<!--            <USeparator v-if="surround?.filter(Boolean).length"/>-->

<!--            <UContentSurround :surround="(surround as any)"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      &lt;!&ndash;      <template v-if="page?.body?.toc?.links?.length" #right>&ndash;&gt;-->


<!--      <PageSidebar-->
<!--        :default-width="280"-->
<!--        :min-width="200"-->
<!--        :max-width="600"-->
<!--        :collapsed-width="72"-->
<!--        side="right"-->
<!--        v-if="page?.body?.toc?.links?.length"-->
<!--      >-->
<!--        <UContentToc class="sm:px-2 sm:-mx-2" highlight highlight-color="neutral" color="neutral"-->
<!--                     :links="page.body.toc.links"/>-->

<!--      </PageSidebar>-->
<!--      &lt;!&ndash;      </template>&ndash;&gt;-->
<!--    </div>-->
<!--    <AppFooter/>-->

<!--  </div>-->
<!--</template>-->
