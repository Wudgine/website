<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const isLeftSidebarOpen = ref(false);
const isCollaspedRightPanel = ref(false);

</script>

<template>
  <div>
    <AppHeader class="relative" />

    <UDashboardGroup>
      <UDashboardSidebar :mode="'slideover'" class="hidden lg:hidden">
        <template #header="{ collapsed }">
          <div v-if="!collapsed" class="h-5 w-auto"/>
          <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto"/>


          <UContentSearchButton :collapsed="false"
                                class="overflow-hidden w-full"
                                :ui="{
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
                class="sticky! top-0 h-screen hidden! lg:flex!"
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
