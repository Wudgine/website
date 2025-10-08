<template>
  <aside :class="['page-sidebar', { 'is-collapsed': isCollapsed, 'is-resizing': isResizing, 'is-handle-hovered': isHoveringHandle }]" :style="sidebarStyle"
         :side="side"
  >
<!--    <button v-if="collapsible" class="collapse-toggle" @click="toggleCollapse">-->
<!--      qwe-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">-->
<!--        <path fill="currentColor" d="m14 17l-5-5l5-5l1.41 1.41L11.83 12l3.58 3.59z"/>-->
<!--      </svg>-->
<!--    </button>-->
    <div class="sidebar-content">
      <slot />
    </div>
    <div v-if="resizable && !isCollapsed" class="resize-handle"
         :class="side=='left' ? 'resize-handle-left-sidebar' : 'resize-handle-right-sidebar'"
         @mousedown.prevent="startResize"
         @mouseenter="startHover"   @mouseleave="endHover"
    />
  </aside>
</template>

<script setup lang="ts">
// --- СКРИПТОВАЯ ЧАСТЬ ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ ---
import { ref, computed, onMounted, onBeforeUnmount, type CSSProperties } from 'vue' // <-- ИМПОРТИРУЕМ CSSProperties

const props = withDefaults(defineProps<{
  resizable?: boolean;
  collapsible?: boolean;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  collapsedWidth?: number;
  defaultCollapsed?: boolean;
  isCollapsed?: boolean;
  toggle?: boolean
  side?: 'left' | 'right';
}>(), {
  resizable: true,
  collapsible: true,
  defaultWidth: 256,
  minWidth: 192,
  maxWidth: 512,
  collapsedWidth: 64,
  defaultCollapsed: false,
  isCollapsed: false,
  toggle: false,
  side: 'left'
});

const emit = defineEmits(['update:isCollapsed']);

const width = ref(props.defaultWidth);
const isCollapsedLocal = ref(props.defaultCollapsed);
const isResizing = ref(false);
const isHoveringHandle = ref(false);

let initialMouseX = 0;
let initialWidth = 0;

const startHover = () => {
  isHoveringHandle.value = true;
};

const endHover = () => {
  // Проверяем, не происходит ли в этот момент сам процесс изменения размера
  if (!isResizing.value) {
    isHoveringHandle.value = false;
  }
};

const startResize = (event: MouseEvent) => {
  initialWidth = width.value;
  initialMouseX = event.clientX;
  isResizing.value = true;
  document.addEventListener('mousemove', doResize);
  document.addEventListener('mouseup', stopResize);
};

const doResize = (event: MouseEvent) => {
  if (isResizing.value) {
    const deltaX = event.clientX - initialMouseX;
    let newWidth = initialWidth;
    if (props.side=='left') {
      newWidth += deltaX;
    } else {
      newWidth -= deltaX;
    }
    width.value = Math.max(props.minWidth, Math.min(newWidth, props.maxWidth));
  }
};

const stopResize = () => {
  isResizing.value = false;
  document.removeEventListener('mousemove', doResize);
  document.removeEventListener('mouseup', stopResize);

  isHoveringHandle.value = false;
};

const toggleCollapse = () => {
  // Установка collapsedState.value вызовет сеттер, который либо emit, либо обновит локальное ref.
  collapsedState.value = !collapsedState.value;
};

const collapsedState = computed({
  get() {
    // Если пропс 'isCollapsed' передан (т.е. используется v-model:is-collapsed), используем его.
    // Если нет (т.е. undefined), используем локальное состояние (для внутреннего управления).
    return props.isCollapsed !== undefined ? props.isCollapsed : isCollapsedLocal.value;
  },
  set(newValue: boolean) {
    if (props.isCollapsed !== undefined) {
      // Если используется модель, отправляем событие
      emit('update:isCollapsed', newValue);
    } else {
      // Иначе, обновляем локальное состояние
      isCollapsedLocal.value = newValue;
    }
  }
});

const sidebarStyle = computed((): CSSProperties => ({
  width: `${collapsedState.value ? props.collapsedWidth : width.value}px`,
  userSelect: isResizing.value ? 'none' : 'auto'
}));

onMounted(() => {
  width.value = Math.max(props.minWidth, Math.min(props.defaultWidth, props.maxWidth));
});

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', doResize);
  document.removeEventListener('mouseup', stopResize);
});
</script>

<style scoped>
/* --- ИЗМЕНЕНИЕ ТОЛЬКО В ЭТОМ БЛОКЕ --- */
.page-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  /* transition: width 0.3s ease; <-- ЭТА СТРОКА УДАЛЕНА */

  border-left: none;
  border-right: 1px solid var(--border-color-default);
}
.page-sidebar[side="right"] { /* Вам нужно будет добавить prop side в template */
  border-left: 1px solid var(--border-color-default);
  border-right: none;
}

/* Стиль при наведении на ручку */
.page-sidebar.is-handle-hovered {
  border-right-color: var(--border-color-accent);
  border-left-color: var(--border-color-accent);
}

/* Остальные стили без изменений */
.sidebar-content {
  overflow-y: hidden;
  overflow-x: hidden;
}

.resize-handle-left-sidebar {
  right: -5px;
}

.resize-handle-right-sidebar {
  left: -5px;
}

.resize-handle {
  position: absolute;
  height: 100%;
  width: 9px;
  cursor: col-resize;
  background-color: transparent;
  z-index: 10000;
}

/*
.resize-handle:hover {
  background-color: var(--border-color-muted);
}

.is-resizing .resize-handle {
  background-color: var(--border-color-default);
}
*/

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

/*
.is-collapsed .sidebar-content {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.1s ease;
}
 */
</style>
