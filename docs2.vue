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
  <div>
<!--    <AppHeader/>-->

    <UMain>
      <div class="flex flex-grow">
<!--        <UDashboardGroup style="top: 100px; overflow: auto!important;">-->

        <!--      <UContainer>-->
        <!--        <UPage>-->
        <!--          <template #left>-->

<!--                <UDashboardGroup>-->

        <UDashboardGroup class="h-screen sticky top-0 w-auto overflow-auto">
          <UDashboardSidebar
            open
            toggle-side="right"
            collapsible
            resizable
          >
            <template #header>
              <Logo class="h-5 w-auto" />
              <UDashboardSidebarCollapse />
            </template>

            <UNavigationMenu
              :items="items"
              orientation="vertical"
            />
          </UDashboardSidebar>

          <UDashboardPanel class="block lg:hidden">
            <template #header>
              <UDashboardNavbar title="Dashboard" />
            </template>
          </UDashboardPanel>
        </UDashboardGroup>

<!--        <UDashboardPanel id="inbox-1"-->
<!--                         resizable >-->
<!--          <template #header>-->
<!--            <UDashboardNavbar title="Inbox">-->
<!--              <template #leading>-->
<!--                <UDashboardSidebarCollapse />-->
<!--              </template>-->
<!--            </UDashboardNavbar>-->
<!--          </template>-->

<!--          <template #body>-->
<!--            qweqwe-->
<!--&lt;!&ndash;            <Placeholder class="h-full" />&ndash;&gt;-->
<!--          </template>-->
<!--        </UDashboardPanel>-->

<!--        </UDashboardGroup>-->
<!--        <UDashboardGroup>-->
<!--        <UDashboardSidebar mode="slideover">-->
<!--          <template #header="{ collapsed }">-->
<!--            w</br>-->
<!--            w</br>-->
<!--            collapsed: {{collapsed}}-->
<!--          </template>-->

<!--          <UNavigationMenu-->
<!--            :items="items"-->
<!--            orientation="vertical"-->
<!--          />-->
<!--        </UDashboardSidebar>-->

<!--        <UDashboardPanel>-->
<!--          <template #header>-->

<!--            <UDashboardNavbar title="Dashboard" />-->
<!--          </template>-->
<!--          <UDashboardSidebarCollapse/>-->

<!--        </UDashboardPanel>-->

<!--          </UDashboardGroup>-->

<!--        <UDashboardPanel-->
<!--          resizable-->
<!--          collapsible-->
<!--          :min-size="15"-->
<!--          :max-size="35"-->
<!--          :default-size="19"-->
<!--          :ui="{ body: { padding: 'px-0 py-0 sm:p-0' } }"-->
<!--          class="h-screen sticky! top-0"-->
<!--          :mode="'slideover'"-->
<!--        >-->
<!--          <template #header>-->
<!--            <UDashboardNavbar title="Documentation" style="overflow: hidden;">-->
<!--              <template #leading>-->
<!--                <UDashboardSidebarCollapse/>-->
<!--                <UContentSearchButton :collapsed="false"/>-->
<!--              </template>-->

<!--            </UDashboardNavbar>-->
<!--          </template>-->

<!--          <template #body>-->
<!--            &lt;!&ndash;                <Placeholder class="h-full" />&ndash;&gt;-->

<!--            <UPageAside>-->
<!--              <template #top>-->
<!--&lt;!&ndash;                <UContentSearchButton :collapsed="false"/>&ndash;&gt;-->
<!--              </template>-->

<!--              <UContentNavigation-->
<!--                :navigation="navigation"-->
<!--                highlight-->
<!--              />-->
<!--            </UPageAside>-->
<!--          </template>-->

<!--        </UDashboardPanel>-->
        <!--        </UDashboardSidebar>-->

<!--        </UDashboardGroup>-->

        <!--            <UPageAside>-->
        <!--              <template #top>-->
        <!--                <UContentSearchButton :collapsed="false" />-->
        <!--              </template>-->

        <!--              <UContentNavigation-->
        <!--                :navigation="navigation"-->
        <!--                highlight-->
        <!--              />-->
        <!--            </UPageAside>-->
        <!--          </template>-->
        <!--      <template #center>-->

        <UPageBody class="flex-1 mr-10">
          <ContentRenderer :value="page"/>
          <!--          <slot/>-->
          <!--          <template #right>qwe</template>-->
        </UPageBody>
        <!--</template>-->

        <!--      <template #right>-->

        <!--        <UDashboardGroup>-->

        <!--          <UDashboardSidebar-->
        <!--            side="right">-->

        <!--        <UDashboardGroup>-->
<!--        <UDashboardSidebar resizable-->
<!--                           collapsible-->
<!--                           :min-size="15"-->
<!--                           :max-size="35"-->
<!--                           :default-size="19"-->
<!--                           side="right"-->
<!--                           class="lg:border-l lg:border-default h-screen sticky top-0"-->

<!--        >-->
<!--          &lt;!&ndash;            <div class="lg:not-last:border-l lg:not-last:border-default h-full"></div>&ndash;&gt;-->
<!--          <template #resize-handle="{ onMouseDown, onTouchStart, onDoubleClick }">-->
<!--            <UDashboardResizeHandle-->
<!--              class="z-1000"-->
<!--              @mousedown="onMouseDown"-->
<!--              @touchstart="onTouchStart"-->
<!--              @dblclick="onDoubleClick"-->
<!--            />-->
<!--          </template>-->


<!--          <UPageAside>-->
<!--            qw-->
<!--            &lt;!&ndash;            <UContentToc />&ndash;&gt;-->
<!--            <UContentToc :links="page.body.toc.links"/>-->
<!--            &lt;!&ndash;            <CustomToc />&ndash;&gt;-->
<!--          </UPageAside>-->
<!--        </UDashboardSidebar>-->
        <!--        </UDashboardGroup>-->
        <!--        <UDashboardPanel-->
        <!--          side="right"-->
        <!--          resizable-->
        <!--          collapsible-->
        <!--          :min-size="10"-->
        <!--          :max-size="30"-->
        <!--          :default-size="19"-->
        <!--          :ui="{ body: { padding: 'px-0 py-0 sm:p-0' } }"-->
        <!--        >-->
        <!--          <UPageAside>-->
        <!--  qw-->
        <!--&lt;!&ndash;            <UContentToc />&ndash;&gt;-->
        <!--            <UContentToc :links="page.body.toc.links" />-->
        <!--&lt;!&ndash;            <CustomToc />&ndash;&gt;-->
        <!--          </UPageAside>-->

        <!--        </UDashboardPanel>-->

        <!--          </UDashboardSidebar> &lt;!&ndash; Сайдбар слева &ndash;&gt;-->
        <!--        </UDashboardGroup>-->
        <!--        <UDashboardSidebar side="right" resizable collapsible>-->
        <!--          asdasd-->
        <!--          <Placeholder class="h-96" />-->
        <!--        </UDashboardSidebar>-->

        <!--      </template>-->
      </div>
      <!--          <slot />-->
      <!--        </UPage>-->
      <!--      </UContainer>-->
    </UMain>

    <AppFooter/>
  </div>
</template>
