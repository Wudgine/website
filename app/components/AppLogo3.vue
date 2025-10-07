<template>
  <div class="wudgine-logo-container">
    <svg
      width="60"
      height="60"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="logo-icon"
    >
      <defs>
        <linearGradient id="wing-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E0E0E0;stop-opacity:1" />
        </linearGradient>
      </defs>

      <path
        d="M60 0 L75 5 L80 20 L115 40 L110 75 L80 110 L40 110 L10 75 L5 40 L40 20 L45 5 Z"
        fill="#2C3A47"
      />

      <path
        d="M81.5 19.5 L98.5 30 L98.5 45 L111 60 L98.5 75 L98.5 90 L81.5 100.5 L65 100.5 L48.5 100.5 L31.5 90 L31.5 75 L19 60 L31.5 45 L31.5 30 L48.5 19.5 L65 19.5 Z"
        fill="#7f8c8d"
        stroke="#2C3A47"
        stroke-width="3"
      />
      <circle cx="60" cy="60" r="15" fill="#2C3A47"/>

      <g>
        <path
          d="M60 30 L85 85 L35 85 Z"
          fill="#596275"
        />
        <path
          d="M60 30 L72 60 L48 60 Z"
          fill="#FFFFFF"
        />

        <path
          d="M45 55 C 25 50, 10 35, 10 20 L 30 40 C 35 50, 40 52, 45 55 Z"
          fill="url(#wing-gradient)"
          stroke="#404040"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <path
          d="M75 55 C 95 50, 110 35, 110 20 L 90 40 C 85 50, 80 52, 75 55 Z"
          fill="url(#wing-gradient)"
          stroke="#404040"
          stroke-width="2"
          stroke-linejoin="round"
        />
      </g>
    </svg>

    <div class="logo-text1">Wu</div>
    <div class="logo-text2 -ml-4">dgine</div>
  </div>
</template>

<script>
export default {
  name: 'WudgineLogo',
}
</script>

<style scoped>
.wudgine-logo-container {
  display: flex;
  align-items: center;
  gap: 15px; /* Расстояние между иконкой и текстом */
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  text-decoration: none;
  color: inherit; /* Наследовать цвет от родителя */
}

.logo-icon {
  width: 50px; /* Вы можете изменить размер иконки */
  height: auto;
}

.logo-text1 {
  font-size: 2.2rem; /* Размер текста */
  font-weight: bold;
  color: currentColor; /* Тот же цвет, что и у основной формы иконки */
  line-height: 1;
}

.logo-text2 {
  font-size: 2.2rem; /* Размер текста */
  font-weight: bold;
  color: var(--ui-primary); /* Тот же цвет, что и у основной формы иконки */
  line-height: 1;
}
</style>
