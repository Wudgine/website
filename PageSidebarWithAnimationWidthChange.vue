<template>
  <aside :class="['page-sidebar', { 'is-collapsed': isCollapsed, 'is-resizing': isResizing }]" :style="sidebarStyle">
    <button v-if="collapsible" class="collapse-toggle" @click="toggleCollapse">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path fill="currentColor" d="m14 17l-5-5l5-5l1.41 1.41L11.83 12l3.58 3.59z"/>
      </svg>
    </button>

    <div class="sidebar-content">
      <slot />
    </div>

    <div v-if="resizable && !isCollapsed" class="resize-handle" @mousedown.prevent="startResize" />
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// --- ПРОПСЫ КОМПОНЕНТА (без изменений) ---
const props = withDefaults(defineProps<{
  resizable?: boolean;
  collapsible?: boolean;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  collapsedWidth?: number;
  defaultCollapsed?: boolean;
}>(), {
  resizable: true,
  collapsible: true,
  defaultWidth: 256,
  minWidth: 192,
  maxWidth: 512,
  collapsedWidth: 64,
  defaultCollapsed: false,
});

// --- РЕАКТИВНОЕ СОСТОЯНИЕ (без изменений) ---
const width = ref(props.defaultWidth);
const isCollapsed = ref(props.defaultCollapsed);
const isResizing = ref(false);


// =================================================================
// --- ОБНОВЛЕННАЯ ЛОГИКА ИЗМЕНЕНИЯ РАЗМЕРА ---
// =================================================================

// Переменные для хранения начальных значений при старте перетаскивания
let initialMouseX = 0;
let initialWidth = 0;

const startResize = (event: MouseEvent) => {
  // 1. Запоминаем начальную ширину и позицию курсора
  initialWidth = width.value;
  initialMouseX = event.clientX;

  isResizing.value = true;

  // 2. Добавляем слушатели на весь документ, чтобы не терять фокус
  document.addEventListener('mousemove', doResize);
  document.addEventListener('mouseup', stopResize);
};

const doResize = (event: MouseEvent) => {
  if (isResizing.value) {
    // 3. Вычисляем разницу (дельту) в движении мыши
    const deltaX = event.clientX - initialMouseX;

    // 4. Применяем дельту к начальной ширине и ограничиваем результат
    const newWidth = initialWidth + deltaX;
    width.value = Math.max(props.minWidth, Math.min(newWidth, props.maxWidth));
  }
};

const stopResize = () => {
  isResizing.value = false;

  // 5. Обязательно убираем слушатели
  document.removeEventListener('mousemove', doResize);
  document.removeEventListener('mouseup', stopResize);
};

// =================================================================
// --- КОНЕЦ ОБНОВЛЕННОЙ ЛОГИКИ ---
// =================================================================


// --- ЛОГИКА СВОРАЧИВАНИЯ (без изменений) ---
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

// --- ВЫЧИСЛЯЕМЫЕ СТИЛИ (без изменений) ---
const sidebarStyle = computed(() => ({
  width: `${isCollapsed.value ? props.collapsedWidth : width.value}px`,
  userSelect: isResizing.value ? 'none' : 'auto',
}));

// --- ЖИЗНЕННЫЙ ЦИКЛ (без изменений) ---
onMounted(() => {
  width.value = Math.max(props.minWidth, Math.min(props.defaultWidth, props.maxWidth));
});

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', doResize);
  document.removeEventListener('mouseup', stopResize);
});
</script>

<style scoped>
/* СТИЛИ ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ */
.page-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Или 100% от родителя */
  //background-color: #f8f9fa; /* Цвет фона */
  border-right: 1px solid #dee2e6; /* Граница справа */
  transition: width 0.3s ease;
  flex-shrink: 0; /* Предотвращает сжатие сайдбара */
}

.sidebar-content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: -2px;
  bottom: 0;
  width: 5px;
  cursor: col-resize;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.resize-handle:hover {
  background-color: rgba(0, 123, 255, 0.3);
}

.is-resizing .resize-handle {
  background-color: rgba(0, 123, 255, 0.5);
}

.collapse-toggle {
  position: absolute;
  top: 1rem;
  right: -12px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #dee2e6;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.collapse-toggle:hover {
  background-color: #f1f3f5;
}

.collapse-toggle svg {
  transition: transform 0.3s ease;
}

.is-collapsed .collapse-toggle svg {
  transform: rotate(180deg);
}

.is-collapsed {
  overflow: hidden;
}

.is-collapsed .sidebar-content {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.1s ease;
}
</style>
