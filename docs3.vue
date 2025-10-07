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

</script>

<template>
  <div class="flex flex-col min-h-screen">
        <UDashboardGroup class="h-screen w-auto overflow-auto">

<!--          <UMain class="flex-grow">-->

          <UDashboardPanel grow>
<!--            <template #side>-->
            <div class="flex flex-col">
              <AppHeader />
              <UDashboardNavbar title="Dashboard" class="flex lg:hidden" />

              <div class="flex flex-grow">

              <UDashboardSidebar
                side="left"
                toggle-side="left"
                collapsible
                resizable
                class="sticky top-0 h-screen"
              >
                <template #header>
                  <Logo class="h-5 w-auto" />
                  <UDashboardSidebarCollapse side="left" />
                </template>

                <UNavigationMenu
                  :items="items"
                  orientation="vertical"
                />
              </UDashboardSidebar>
<!--            </template>-->
<!--            <template #header>-->
<!--            </template>-->
<!--            <template #body>-->
qwe

              <UPageBody>
                <ContentRenderer :value="page"/>
                <!--          <slot/>-->
                <!--          <template #right>qwe</template>-->
              </UPageBody>


                <UDashboardSidebar
                  side="right"
                  toggle-side="right"
                  collapsible
                  resizable
                  class="sticky top-0 "
                >
                  <template #header>
                    <Logo class="h-5 w-auto" />
                    <UDashboardSidebarCollapse side="right" />
                  </template>

                  <UNavigationMenu
                    :items="items"
                    orientation="vertical"
                  />
                </UDashboardSidebar>

<!--            </template>-->

<!--            <template #footer>-->

<!--            </template>-->
            </div>
              <AppFooter />
            </div>

          </UDashboardPanel>
<!--    </UMain>-->

        </UDashboardGroup>
  </div>
</template>
