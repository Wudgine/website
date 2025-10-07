<script setup lang="ts">

import type {ContentNavigationItem} from "@nuxt/content";

const route = useRoute()

const items = computed(() => [{
  label: 'Docs',
  to: '/docs',
  active: route.path.startsWith('/docs')
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
}, {
  label: 'Changelog',
  to: '/changelog'
}])

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation');

// Функция для переключения видимости левой панели
const toggleLeftPanel = () => {
  // Переключает состояние navigation, которое управляет видимостью левой панели
  navigation.value = !navigation.value
}

// // Функция для переключения видимости правой панели (TOC)
// const toggleRightPanel = () => {
//   // Переключает состояние rightSidebar
//   ui.rightSidebar.value = !ui.rightSidebar.value
// }
</script>

<template>
  <UHeader>
    <template #left>
      <UButton icon="i-lucide-logs" size="md" color="primary" variant="subtle" @click="toggleLeftPanel" />

      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
      <TemplateMenu />
<!--      <UButton-->
<!--        <UButton-->
<!--          icon="i-heroicons-bars-3-20-solid"-->
<!--          variant="ghost"-->
<!--          class="md:hidden"-->
<!--        @click="toggleLeftPanel"-->
<!--        >qwe</UButton>-->
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <UButton
        icon="i-lucide-log-in"
        color="neutral"
        variant="ghost"
        to="/login"
        class="lg:hidden"
      />

      <UButton
        label="Sign in"
        color="neutral"
        variant="outline"
        to="/login"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Sign up"
        color="neutral"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="/signup"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        label="Sign in"
        color="neutral"
        variant="subtle"
        to="/login"
        block
        class="mb-3"
      />
      <UButton
        label="Sign up"
        color="neutral"
        to="/signup"
        block
      />
    </template>
  </UHeader>
</template>
