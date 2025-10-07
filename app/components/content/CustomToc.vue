<script setup lang="ts">

import { queryContent } from '#imports'

const route = useRoute()

// ВРЕМЕННЫЙ КОД ДЛЯ ДИАГНОСТИКИ
const { data: page, error } = await useAsyncData(
    `content-${route.path}`,
    () => queryContent().where({ _path: route.path }).findOne()
)

// Выводим в консоль то, с чем мы работаем
console.log("Ищу документ по пути:", route.path);
console.log("Результат (page.value):", page.value);
console.log("Ошибка (error.value):", error.value);


if (error.value || !page.value) {
  console.error("Условие для createError сработало!");
  // throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true }) // Пока закомментируем
}
</script>

<template>
  <div>
    page: {{page}}
<!--    <h1>{{ page.title }}</h1>-->
<!--    <p>Текущий путь: {{ route.path }}</p>-->

<!--    <UContentToc v-if="page?.body?.toc?.links" :links="page.body.toc.links" />-->

<!--    <ContentRenderer :value="page" />-->
  </div>
</template>