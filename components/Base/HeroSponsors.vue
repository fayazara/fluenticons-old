<template>
  <div class="text-gray-500">
    <p class="text-sm text-center mb-2">
      <nuxt-link class="underline" to="/new-sponsor"
        >Showcase your brand here</nuxt-link
      >
    </p>
    <div
      class="flex items-center justify-center flex-wrap -mx-3 overflow-hidden"
    >
      <div class="my-3 px-3 w-1/3 overflow-hidden" v-for="n in 5" :key="n">
        <div class="h-16 rounded-lg bg-gray-100 dark:bg-gray-800"></div>
      </div>
    </div>
  </div>
</template>