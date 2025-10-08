---
title: История изменений
description: Сводный DevLog по разработке движка Wudgine
---

# Changelog / DevLog

Ниже — объединённый журнал разработки движка и инфраструктуры. Записи отсортированы по дате.

## 23.07.2025

Я начал делать свой движок для MMORPG на C++ на паттерне ECS.

## 04.08.2025

Написал несколько библиотек. Применяю строгую чистую архитектуру (Onion Architecture) с максимальной когезией.

**Основные библиотеки:**

1. **CallStack** — поддержка отображения стека вызовов в логе.
2. **Debug** — единая система логов. Для Godot используются собственные методы и отсутствуют исключения, поэтому у каждой библиотеки есть версия для Godot с адаптированным выводом.
3. **DI** — контейнер внедрения зависимостей для ECS-мира.
4. **Core** — базовый функционал ECS: миры, компоненты, сущности.
5. **JsonSerialization** — сериализация/десериализация данных мира в JSON и обратно.
6. **Network** — клиент–серверная логика и синхронизация данных сущностей.
7. **Multiplayer** — подключение клиентов, создание героя по данным БД, выбор мира.
8. **Engine** — сердцевина движка, базовая инициализация.
9. **Gameplay** — игровая логика.

**Сериализация:**

- Реализована сериализация/десериализация систем и сущностей мира.
- Из сцены Godot при сохранении автоматически генерируется вспомогательная сцена с данными ECS, которую затем можно загрузить в ECS-мир. Это можно использовать и для сохранений в одиночной игре.
- Реализована сериализация компонент для сетевой репликации.

**Интеграция с Godot:**

Под каждую внутреннюю библиотеку движка при необходимости существует связующая библиотека для интеграции с Godot.

- `CoreGodotEditor` — связывает редактор Godot с `Core` для отображения данных сущности в инспекторе у выбранного `Node`.
- `CoreGodotRuntime` — связывает рантайм Godot с `Core`: данные сущностей маппятся на свойства `Node` (позиция, анимация и т. п.), поведение настраиваемо.

**Сервер и нагрузочное тестирование:**

Реализованы безголовый сервер и клиент для нагрузочных тестов. Сервер с нужными библиотеками весит ~700 КБ и потребляет ~1.4 МБ ОЗУ.

**Статус:**

Интеграция движка в Godot закончена. Далее — синхронизация данных сущностей между движками.

## 21.08.2025 — Debug: v1.0.0

🚀 Готова собственная библиотека отладки с логгированием и автоматическим трекингом стека вызовов.

**Ключевые особенности:**

- Мультиплатформенность: версия для Godot (`UtilityFunctions::print`) и standalone (stdout).
- Нулевые накладные расходы в релизе: отладочные макросы вырезаются из билда.
- Типы сообщений: Log, Warning, Error; настраиваемые заголовки и цвета.
- Гибкое форматирование: аргументы (printf-стиль), потоковый вывод (std::cout) или их комбинация.
- Автоматизация: макросы указывают файл и строку, выравнивание стека по строкам, визуальный «градиент» и отступы для читаемости.

**Макрос `_w()` и пример использования:**

```cpp
#include "Debug/Debug.hpp"
using namespace Debug;

namespace Debug_Tests {
    class DebuggingTest {
    public:
        void runAllTests() {
            _w();
            _w(_testBasicLogging());
            _w(_testMessageCustomization());
            _w(_testAssertAndThrow());
            _w(_testCallStackTracing());
            _w(_testCombinedFormatting());
            std::cout << "All tests completed successfully." << std::endl;
        }
    private:
        void _testBasicLogging() {
            _w();
            DEBUG::Log("This is a standard log message.") << "qwe";
            DEBUG::Warning("This is a warning message.") << "";
            DEBUG::Error("This is an error message.");
        }
        void _testMessageCustomization() {
            _w();
            DEBUG::Message(
                LogStream::Message("Custom message with sub title and other color.")
                    .SetTitle("[SUB_TITLE]")
                    .SetColor(Colors::TEXT_COLOR_CYAN_SOFT)
                    .ToString()
            );
            DEBUG::Message(
                LogStream::Message("Message without a title.")
                    .NoTitle()
                    .ToString()
            ).NoTitle();
        }
        void _testAssertAndThrow() {
            _w();
            DEBUG::Assert(true, "This assert should pass.");
        }
        void _testCallStackTracing() { _w(); _innerFunction(); }
        void _innerFunction() {
            _w();
            DEBUG::Log("Call stack tracing test: inside inner function.");
        }
        void _testCombinedFormatting() {
            _w();
            int p_score = 100; std::string p_player = "Player_One"; float p_speed = 15.5f;
            DEBUG::Log("Player: ", p_player, ", Score: ", p_score, ", Speed: ", p_speed);
            DEBUG::Log("Game_State: ") << "Running" << ", Level: " << 5 << ", Time: " << 120.5f;
            DEBUG::Log("Combined Log. Level: ", 5) << " and " << "Score: " << 200;
        }
    };
}
```

## 26.08.2025 — DI: v1.0.0

🚀 Внедрение зависимостей (Dependency Injection) для чистого и гибкого кода.

**Как работает контейнер:**

1. **Регистрация** (`registerSingleton`) — хранит экземпляры как синглтоны (принимает `shared_ptr` или ссылку на внешний объект, например `std::stringstream`).
2. **Получение** (`get`/`getRaw`) — возвращает `shared_ptr` или ссылку/указатель на зарегистрированный объект.
3. **Создание с разрешением** (`ResolveAndConstruct`) — анализирует конструктор и автоматически подставляет зарегистрированные зависимости, поддерживает дополнительные аргументы.

Контейнер использует `DEBUG::Throw` для детальных ошибок при отсутствии зависимостей.

**Плюсы:** модульность, удобное тестирование (mock-реализации), гибкость подмены, чистая инициализация приложения.

### Система сборки (Builder): v1.0.0

Создана кроссплатформенная система сборки (C++/Python/CMake/Shell), интегрированная с Godot.

**Архитектура:**

- Объявление целей сначала во внутренних структурах, затем — загрузка зависимостей и генерация целей CMake.
- Выборочная компиляция: включаются только нужные библиотеки с автоматическим подтягиванием зависимостей.

**Декларативные функции CMake:**

```cmake
Library(ECS default
        SOURCES src/**/*.cpp
        PUBLIC_DIRS ./include
        PUBLIC_LIBS tp::entt
        DI:SHARED Debug:SHARED Utils:SHARED)

Library(ECS Godot
        SOURCES src/**/*.cpp
        PUBLIC_DIRS ./include
        PUBLIC_LIBS tp::entt
        DI:STATIC Debug:STATIC Utils:STATIC)

Executable(ECS_Tests default
        SOURCES tests/Tests.cpp
        PUBLIC_DIRS
        PRIVATE_LIBS ECS:SHARED)
```

**CLI и IDE:**

- Аргументы: `--rebuild`, `--rebuild_dependencies`, `--release`, `--ninja`.
- Возможность собирать выборочно: `WudgineBuilder ECS DI DEBUG`.
- Бесшовная интеграция с Godot: `Cmd+R` в редакторе запускает полную сборку, логи выводятся в Output, GDExtension автоматически попадает в `addons`.

## 27.08.2025 — Jobs: v1.0.0

🚀 Полная реализация API Unity Jobs на C++.

**Основы:** `iJob`, `iJobParallelFor`.

**Управление:** `JobHandle` (зависимости, ожидание, статус), граф зависимостей, пул потоков = числу ядер, потокобезопасная очередь, авторазбиение ParallelFor.

**Безопасность данных:** атомарные типы, контейнеры с безопасным доступом (аналог `NativeContainer`/`NativeArray`).

**Примеры:**

```cpp
#include "Jobs/JobSystem.hpp"
#include "Jobs/JobHandle.hpp"

class MyJob : public Jobs::iJob {
public:
    void Execute() override {}
    std::vector<Jobs::JobHandle> GetDependencies() override { return {}; }
};

void runMassiveJobSchedulingExample() {
    auto& jobSystem = Jobs::JobSystem::GetInstance();
    std::vector<Jobs::JobHandle> handles; handles.reserve(100000);
    for (int i = 0; i < 100000; ++i) {
        auto job = std::make_unique<MyJob>();
        handles.push_back(jobSystem.Schedule(std::move(job)));
    }
    for (const auto& h : handles) { h.Complete(); }
}
```

Глубокая цепочка зависимостей:

```cpp
void testDeepDependencyChain(int depth) {
    Jobs::JobHandle lastHandle;
    for (int i = 0; i < depth; ++i) {
        auto job = std::make_unique<MyJob>();
        lastHandle = Jobs::JobSystem::GetInstance().Schedule(std::move(job), lastHandle);
    }
    lastHandle.Complete();
}
```

ParallelFor:

```cpp
class MyParallelForJob : public Jobs::iJobParallelFor {
public:
    std::vector<int> data; MyParallelForJob(size_t size) : data(size) {}
    void Execute(int p_index) override { data[p_index] = p_index * 2; }
};

void runParallelForExample() {
    auto job = std::make_unique<MyParallelForJob>(100000);
    auto& js = Jobs::JobSystem::GetInstance();
    Jobs::JobHandle h = js.Schedule(std::move(job));
    h.Complete();
}
```

## 03.09.2025 — ECS: v1.0.0

🚀 ECS-библиотека — клон API Unity DOTS на чистом C++.

**Core:** сущности (идентификаторы), компоненты (структуры), системы (логика над компонентами).

**Группы и декларации:**

- `UpdateInGroup<...>` для порядка выполнения, `Any<...>`, `Frequency<...>`.
- Автоматическое резолвинг аргументов `Update(...)` под нужные компоненты и перегрузки.
- Исключающие запросы через `Exclude<...>`.

**EntityQuery:** декларативные запросы с `With/Without`, итерация и `Each(...)`.

**Расширенные возможности:** `DynamicBuffer<T>`, `EntityCommandBuffer`, `SharedComponent<T>`, реактивные системы, `LinkedEntityGroup`.

**Интеграция с Godot:**

Полная синхронизация данных между ECS-компонентами (позиция, вращение, масштаб и т. п.) и узлами Godot. Godot — визуализация (UI/рендер/аудио), ECS (C++) — логика/данные.

## 24.09.2025 — Рендер, ассеты, UI и архитектура

### Графический пайплайн на Vulkan

- Библиотеки: `Render` и `RenderGraph`.
- Современная, быстрая и гибкая основа для тяжёлых сцен.

### Модульная система ассетов

- `TextureAsset`, `ShaderAsset`, `MaterialAsset`, `MeshAsset` (`.gltf`). Расширяемая архитектура для пользовательских типов.

### UI на веб-технологиях и мост C++ ↔ TypeScript

- Переход с CEF на Ultralight (лёгкий и быстрый).
- Зеркальный ECS API: код на TS повторяет C++ почти 1-в-1 (включая `EntityQuery`).
- Единая экосистема: общий стек для редактора, игры и сайта (например, Nuxt 4 + TypeScript).

### Трёхслойная архитектура

Отдельные репозитории на три слоя:

1. Низкоуровневый: окна ОС, графический API (Vulkan и альтернатива).
2. Ядро: ECS, ассеты и базовые модули.
3. Пользовательский проект: игровой код.

Фокус дальше — редактор в духе интерфейса Blender (модульность, рабочие области/Workspaces, расширяемость).

### Дорожная карта рендера

- Anti-aliasing, тени, стек пост-эффектов (Bloom, Color Grading, SSAO и др.).
- GPU-рендеринг UI напрямую на Vulkan (идеально гладкий текст, разгрузка CPU).
- Параллельный дата-ориентированный пайплайн рендера как альтернатива ООП-рендеру.

### Примеры зеркального API систем C++ ↔ TS

SpinSystem (вращение сущности):

```cpp
class SpinSystem : public iSystem<
            Sorting<UpdateInGroup<DrawRenderSystemGroup>, UpdateAfter<RenderSystem>>,
            Filter<With<AngularVelocity, Rotation>>,
            Fps<30>> {
public:
    void Update(double dt, const SystemState& s, Entity e,
                const AngularVelocity& av, Rotation& r) {
        Math::quat dq = Math::quat(av.value * static_cast<float>(dt));
        r.value = glm::normalize(r.value * dq);
    }
};
```

```ts
class SpinSystem extends iSystem(
    Sorting(UpdateInGroup(DrawRenderSystemGroup), UpdateAfter(RenderSystem)),
    Filter(With(AngularVelocity, Rotation)),
    Fps(30)
) {
  override Update(dt: number, s: SystemState, e: Entity,
                  av: AngularVelocity, r: Rotation): void {
    const delta = glm.quat.create();
    const axis = glm.vec3.create();
    glm.vec3.normalize(axis, av.value);
    const angle = glm.vec3.length(av.value) * dt;
    glm.quat.setAxisAngle(delta, axis, angle);
    glm.quat.multiply(r.value, r.value, delta);
    glm.quat.normalize(r.value, r.value);
  }
}
```

UI-пример (UnitBarsSystem):

```ts
const BAR_CONTAINER_ID = 'unit-bar-container';
export class UnitBarsSystem extends iSystem(
  Sorting(UpdateInGroup(UISystemGroup)),
  Filter(With()),
  Frequency(30)
) {
  private m_barsMap = new Map<Entity, HTMLElement>();
  private m_container: HTMLElement | null = null;
  private m_entityBarsQueryFilter: EntityQueryFilter | null = null;
  override OnCreate(systemState: SystemState): void {
    this.m_container = document.getElementById(BAR_CONTAINER_ID);
    this.m_entityBarsQueryFilter = new EntityQuery().With(ScreenPosition).Build();
  }
  override Update(deltaTime: number, systemState: SystemState): void {
    const view = new EntityView(systemState.entityManager, this.m_entityBarsQueryFilter!);
    const it: EntityIterator = view.getIterator();
    const active = new Set<Entity>();
    while (it.next()) {
      const id = it.entity; active.add(id);
      if (!this.m_barsMap.has(id)) {
        const bar = document.createElement('div');
        bar.className = 'unit-bar';
        this.m_container?.appendChild(bar);
        this.m_barsMap.set(id, bar);
      }
      const bar = this.m_barsMap.get(id)!;
      const screenPos = it.components[0];
      bar.style.transform = `translate(${screenPos.x}px, ${screenPos.y}px)`;
    }
    for (const [id, bar] of this.m_barsMap.entries()) {
      if (!active.has(id)) { bar.remove(); this.m_barsMap.delete(id); }
    }
  }
  override OnDestroy(): void {
    if (this.m_container) this.m_container.innerHTML = '';
    this.m_barsMap.clear();
  }
}
```


