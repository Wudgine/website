<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const isLeftSidebarOpen = ref(false);
const isCollapsedRightPanel = ref(false);

</script>

<template>
  <div>
    <AppHeader class="relative" />

    <UDashboardGroup class="sticky top-0 lg:fixed h-auto z-10 lg:z-0">
      <UDashboardSidebar :mode="'slideover'" class="hidden lg:hidden"
      >
        <template #header="{ collapsed }">
          <div v-if="!collapsed" class="h-5 w-auto"/>
          <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto"/>


          <UContentSearchButton :collapsed="false"
                                class="overflow-hidden w-full"
                                :ui="{
                                              trailing: isLeftSidebarOpen?'-ml-5':'',
                                            }"
          />
        </template>

        <UContentNavigation
          :navigation="navigation"
          highlight
        />
      </UDashboardSidebar>

      <UDashboardPanel class="flex lg:hidden min-h-none h-auto! bg-default/75 lg:bg-[initial] backdrop-blur">
        <UDashboardNavbar title="Documentation" />
      </UDashboardPanel>
    </UDashboardGroup>
    <UMain>
      <UContainer class="p-0 m-0 lg:p-0! lg:m-0!">
        <UPage class="flex lg:flex flex-row">
          <template #left>
            <!--      <template v-if="page?.body?.toc?.links?.length" #left>-->


              <PageSidebar
                :default-width="280"
                :min-width="135"
                :max-width="600"
                :collapsed-width="80"
                :is-collapsed="isLeftSidebarOpen"
                :defaultCollapsed="false"
                class="sticky! top-0 h-screen hidden! lg:flex! lg:z-2"
              >
                <UDashboardNavbar title="Documentation"
                                  toggle-side="left"
                                  :toggle="false"
                >
                  <template #toggle>
<!--                    <UDashboardSidebarCollapse />-->
                    <UButton

                      @click="isLeftSidebarOpen=!isLeftSidebarOpen"

                      color="neutral"
                      variant="ghost"
                      :icon="!isLeftSidebarOpen ? 'i-lucide:panel-left-close' :  'i-lucide:panel-left-open'"
                    />
                  </template>
                </UDashboardNavbar>
                <div class="w-full px-5 py-4">
                  <UContentSearchButton :collapsed="false"
                                        class="overflow-hidden w-full"
                                        :ui="{
                                              trailing: isLeftSidebarOpen?'':'',
                                            }"
                  />
                </div>

                <div class="">
                  <div class="px-8 content-navigation overflow-y-auto!">
                    <UContentNavigation
                      class=""
                      :navigation="navigation"
                      highlight
                      :ui="{
                        content: ''
                      }"
                    />
                  </div>
                </div>
              </PageSidebar>
              <!--            <UPageAside>-->
              <!--              <template #top>-->
              <!--                <UContentSearchButton :collapsed="false" />-->
              <!--              </template>-->

              <!--              <UContentNavigation-->
              <!--                :navigation="navigation"-->
              <!--                highlight-->
              <!--              />-->
              <!--            </UPageAside>-->
          </template>


          <slot />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>

<style scoped>
/* 1. Задаем общую ширину скроллбара */
.content-navigation::-webkit-scrollbar {
  width: 1px; /* Для вертикального скроллбара */
  height: 1px; /* Для горизонтального скроллбара */
}

/* 2. Стилизуем дорожку (фон) */
.content-navigation::-webkit-scrollbar-track {
  /*
  background: var(--border-color-default);
   */
  border-radius: 10px; /* Скругление углов дорожки */
}

/* 3. Стилизуем ползунок */
.content-navigation::-webkit-scrollbar-thumb {
  background-color: var(--color-primary);

  position: absolute;
  margin: 10px;
  padding: 10px;
  right: -100px;
  border-right: 1px solid var(--color-primary);
  border-radius: 10px; /* Скругление углов ползунка */
  /* Добавляем рамку, чтобы ползунок был тоньше дорожки */
  /*
  border: 3px solid var(--border-color-default);
  */
}

/* 4. Стилизуем ползунок при наведении */
.content-navigation::-webkit-scrollbar-thumb:hover {
  /*
  background: #555;
  */
}
</style>
