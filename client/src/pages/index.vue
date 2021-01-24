<template>
  <div class="mx-auto lg:w-6/12 md:w-8/12">
    <section class="p-4">
      <header>
        <h1 class="text-2xl font-bold">Secret saver</h1>
      </header>
      <p class="text-sm">
        A secret server that can be used to store and share secrets using a
        randomly generated URL. The secret can be read only a limited number of
        times after that it will expire and won’t be available. The secret has a
        TTL (Time to live). After the expiration time the secret won’t be
        available anymore.
      </p>
    </section>
    <create-secret-form></create-secret-form>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateSecretForm from "@/components/CreateSecretForm.vue";

export default {
  name: "home",
  components: {
    CreateSecretForm,
  },
};
</script>

  <style lang="scss">
</style>