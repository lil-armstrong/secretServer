<template>
  <section class="min-h-screen flex flex-col items-center justify-center">
    <header class="block p-2">
      <h1 class="text-4xl font-semibold">404</h1>
    </header>
    <p class="text-gray-400">Page not found</p>
    <router-link
      :to="{ name: 'index' }"
      class="block my-3 p-3 text-blue-600 hover:underline"
      >Go Home</router-link
    >
  </section>
</template>

<script>
export default {
  name: "error-page",
};
</script>