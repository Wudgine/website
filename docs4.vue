<script setup lang="ts">
import {type ContentNavigationItem, ParsedContent} from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')


const route = useRoute()


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
  }
)

// Обработка 404 на стороне клиента
if (!page.value) {
  throw createError({statusCode: 404, statusMessage: 'Page not found', fatal: true})
}

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


const isLeftSidebarOpen = ref(true)
const isCollaspedRightPanel = ref(false)

const tocContainer = ref<HTMLElement | null>(null) // Реактивная ссылка на контейнер

// onMounted(() => {
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
// })
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <UDashboardGroup class="h-screen w-auto overflow-auto">

      <UDashboardPanel grow
                       ref="tocContainer"
      >
        <div class="flex flex-col">
          <AppHeader/>
          <UDashboardNavbar title="Dashboard" class="flex lg:hidden"/>

          <div class="flex flex-grow">

            <UDashboardSidebar
              side="left"
              toggle-side="left"
              collapsible
              resizable
              class="sticky top-0 h-screen min-w-[80px]"
              v-model:collapsed="isLeftSidebarOpen"
            >
              <template #header>
                <Logo class="h-5 w-auto"/>
                <UButton icon="i-lucide-house"
                         @click="isLeftSidebarOpen = !isLeftSidebarOpen"
                />
<!--                <UDashboardSidebarCollapse side="left"/>-->
              </template>


                              <UContentSearchButton :collapsed="false"
                                                    class="overflow-hidden -ml-5 -mr-5"
                                :ui="{
                                  leading: '',
                                  default: 'none',
                                  trailing: isLeftSidebarOpen?'-ml-5':'',
v                                }"
                              />

                            <UContentNavigation
                              :navigation="navigation"
                              highlight
                            />
            </UDashboardSidebar>
            <div class="px-8">
              <UPage>
                <UPageHeader :title="page.title" />

                <UPageBody>
                  <ContentRenderer v-if="page.body" :value="page" />

                  <USeparator v-if="surround?.filter(Boolean).length" />

                  <UContentSurround :surround="(surround as any)" />
                </UPageBody>
              <template v-if="page?.body?.toc?.links?.length" #right>
                <UContentToc highlight highlight-color="neutral" color="neutral" :links="page.body.toc.links"/>
              </template>
              </UPage>
            </div>


<!--            <UDashboardSidebar-->
<!--                      :min-size="15"-->
<!--                      :max-size="35"-->
<!--                      :default-size="19"-->
<!--              side="right"-->
<!--              toggle-side="right"-->
<!--              resizable-->
<!--              collapsible-->
<!--              class="sticky top-0 "-->
<!--              v-model:collapsed="isCollaspedRightPanel"-->
<!--            >-->
<!--              <template #header>-->
<!--                <div class="h-(&#45;&#45;ui-header-height) shrink-0 flex items-center justify-between w-full px-0">-->

<!--                  <Logo class="h-5 w-auto"/>-->

<!--                  <UButton icon="i-lucide-house"-->
<!--                           @click="isCollaspedRightPanel = !isCollaspedRightPanel"-->
<!--                  />-->
<!--                </div>-->
<!--              </template>-->
<!--                          <UContentToc highlight highlight-color="neutral" color="neutral" :links="page.body.toc.links"/>-->

<!--            </UDashboardSidebar>-->

          </div>
          <AppFooter/>
        </div>

      </UDashboardPanel>
    </UDashboardGroup>
  </div>
</template>
