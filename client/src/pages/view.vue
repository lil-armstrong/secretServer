<template>
  <section>
    <nav class="text-gray-500 block mb-8 p-3 text-sm sticky top-0 bg-white">
      <router-link :to="{ name: 'index' }">Home</router-link>
    </nav>

    <the-loader
      class="min-h-screen flex flex-col items-center justify-center"
      v-if="loading"
    ></the-loader>

    <template v-else>
      <section class="p-2">
        <secret-viewer :info="info" v-if="info"></secret-viewer>

        <section
          v-else
          class="flex p-3 flex-col text-center items-center min-h-screen justify-center"
        >
          <header class="mb-3">
            <h1 class="text-3xl text-gray-600 font-bold">Secret not found</h1>
          </header>
          <p class="text-gray-400">
            Secret with hash
            <span
              class="bg-blue-300 p-1 px-2 ring-2 inline-block m-1 font-medium text-blue-600 rounded text-sm bg-opacity-25"
              >{{ hash }}</span
            >
            not found or deleted. Please try another hash
          </p>
        </section>
      </section>
    </template>
  </section>
</template>

<script>
import SecretViewer from "@/components/SecretViewer.vue";
export default {
  name: "view-secret",
  components: {
    SecretViewer,
  },
  data() {
    return {
      info: null,
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchSecret();
  },
  computed: {
    hash() {
      return this.$route.params.hash;
    },
  },
  methods: {
    fetchSecret() {
      if (this.hash) {
        this.loading = true;

        this.axios({
          url: `${this.hash}`,
          method: "get",
        })
          .then((response) => {
            this.info = response.data.data;
          })
          .catch((error) => {
            if (error.response) {
              this.error = error.response.statusText;
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>