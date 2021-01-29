<template>
  <div class="mx-auto relative lg:w-6/12 md:w-8/12">
    <section class="p-3">
      <header class="my-3">
        <h1 class="text-4xl text-gray-600 capitalize font-bold">
          Secret saver: About project
        </h1>
      </header>
      <p class="text-gray-500">
        A secret server that can be used to store and share secrets using a
        randomly generated URL. The secret can be read only a limited number of
        times after that it will expire and won’t be available. The secret has a
        TTL (Time to live). After the expiration time the secret won’t be
        available anymore.
      </p>

      <div
        class="block p-3 my-2 bg-blue-100 rounded ring-1 text-gray-500 bg-opacity-50"
      >
        <p>
          To view a secret, you must know the hash. Once you know the hash, you
          have to visit the url:
          <code class="font-semibold text-blue-600">/view/&lt;:hash&gt;</code>
        </p>

        <p>
          Replace the
          <code class="font-semibold text-blue-600">&lt;:hash&gt;</code> with
          the actual hash code of the secret
        </p>
      </div>
    </section>
    <section class="p-3">
      <header class="my-3">
        <h1 class="text-4xl text-gray-600 capitalize font-bold">
          Create Secret
        </h1>
      </header>
      <p class="text-gray-500">Create your own secret and share to friends</p>
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