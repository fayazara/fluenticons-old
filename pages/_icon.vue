<template>
  <main class="p-12">
    <component :is="$route.params.icon" />
  </main>
</template>

<script>
export default {};
</script>

<style>
</style>