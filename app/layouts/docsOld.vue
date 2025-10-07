<script setup lang="ts">
import {type ContentNavigationItem, ParsedContent} from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')


const route = useRoute()


// const { data: page } = await useAsyncData(route.path, () => {
//   return queryCollection('content').path(route.path).first()
// })

// ИСПОЛЬЗУЙТЕ РЕАКТИВНЫЙ КЛЮЧ:
const {data: page} = await useAsyncData(
  // 1. Ключ: используем route.path для уникальности
  () => route.path,
  // 2. Фабрика данных:
  async () => {
    // Внутри фабрики используем актуальный route.path
    const content = await queryCollection('docs').path(route.path).first()

    if (!content) {
      // ВАЖНО: Вместо 'throw' лучше вернуть null и обработать его
      // на стороне клиента/сервера, чтобы избежать фатальной ошибки
      return null
    }

    return content
  },
  {immediate: true}
)

// Обработка 404 на стороне клиента
if (!page.value) {
  throw createError({statusCode: 404, statusMessage: 'Page not found', fatal: true})
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('content', route.path)
})

// Убедитесь, что `page` типизирована для доступа к `page.body.toc.links`
const contentPage = page.value as ParsedContent;

const items: NavigationMenuItem[] = [{
  label: 'Home',
  icon: 'i-lucide-house',
  active: true
}, {
  label: 'Inbox',
  icon: 'i-lucide-inbox'
}, {
  label: 'Contacts',
  icon: 'i-lucide-users'
}]


const isLeftSidebarOpen = ref(false)
const isCollaspedRightPanel = ref(false)

const tocContainer = ref<HTMLElement | null>(null) // Реактивная ссылка на контейнер

onMounted(() => {
//   // 1. Находим элемент, который прокручивается. В вашем случае это UDashboardGroup
//   //    (или div с AppHeader/AppFooter, если он прокручивается).
//   //    Предположим, что это ближайший родительский div, который содержит UDashboardPanel.
//   //    Нам нужен элемент, который реально получает скролл.
//
//   //   Поскольку скролл находится на UDashboardGroup, попробуем найти его через DOM.
//   //   Если у вас есть возможность, установите ref на UDashboardGroup:
//   //   <UDashboardGroup ref="tocContainer" ...>
//
//   //   В качестве альтернативы: попробуйте найти `.udasboard-panel`
//   // tocContainer.value = document.querySelector('.udasboard-panel') as HTMLElement
//
//   if (tocContainer.value) {
//     // 2. Инициализируем композабл
//     useContentScroll(tocContainer.value)
//   }

})
</script>


<template>
  <div class="flex flex-col ">
    <AppHeader/>
    <UDashboardGroup>
      <UDashboardSidebar :mode="'slideover'" class="hidden lg:hidden">
        <template #header="{ collapsed }">
          <div v-if="!collapsed" class="h-5 w-auto"/>
          <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto"/>


          <UContentSearchButton :collapsed="false"
                                class="overflow-hidden w-full"
                                :ui="{
                                  leading: '',
                                  default: 'none',
                                  trailing: isLeftSidebarOpen?'-ml-5':'',
                                }"
          />
        </template>


        <UContentNavigation
          :navigation="navigation"
          highlight
        />
      </UDashboardSidebar>

      <UDashboardPanel class="flex lg:hidden">
        <template #header>
          <UDashboardNavbar title="Documentation"/>
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
    <!--      <template v-if="page?.body?.toc?.links?.length" #left>-->
    <div class="flex flex-row">


      <PageSidebar
        :default-width="280"
        :min-width="135"
        :max-width="600"
        :collapsed-width="80"
      >
        <UDashboardNavbar title="Documentation">
          <template #leading>
            <UDashboardSidebarCollapse/>
          </template>
        </UDashboardNavbar>
        <div class="w-full px-5 py-4">
          <UContentSearchButton :collapsed="false"
                                class="overflow-hidden w-full"
                                :ui="{
                                  trailing: isLeftSidebarOpen?'-ml-5':'',
                                }"
          />
        </div>

        <div class="px-4">
          <UContentNavigation
            :navigation="navigation"
            highlight
          />
        </div>
      </PageSidebar>

      <!--      </template>-->
      <div class="flex flex-col">
        <div class="">
          <UPageHeader :title="page.title"
            :ui="{
              title: 'px-8'
            }"
          />
        </div>
        <div class="px-8">

          <div>
            <ContentRenderer v-if="page.body" :value="page"/>

            <USeparator v-if="surround?.filter(Boolean).length"/>

            <UContentSurround :surround="(surround as any)"/>
          </div>
        </div>
      </div>
      <!--      <template v-if="page?.body?.toc?.links?.length" #right>-->


      <PageSidebar
        :default-width="280"
        :min-width="200"
        :max-width="600"
        :collapsed-width="72"
        side="right"
        v-if="page?.body?.toc?.links?.length"
      >
        <UContentToc class="sm:px-2 sm:-mx-2" highlight highlight-color="neutral" color="neutral"
                     :links="page.body.toc.links"/>

      </PageSidebar>
      <!--      </template>-->
    </div>
    <AppFooter/>

  </div>
</template>
