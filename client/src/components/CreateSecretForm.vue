<template>
  <div>
    <form
      @submit.prevent="processForm"
      class="relative flex flex-wrap w-full text-gray-500"
    >
      <section class="w-full px-3 p-1">
        <label for="secret" class="text-gray-400 font-semibold mb-2 block"
          >Secret text</label
        >
        <textarea
          required
          v-model="formData.secret"
          name="secret"
          placeholder="Enter secret here"
          id="secret"
          rows="8"
          class="w-full text-sm rounded border border-gray-300 p-3"
        ></textarea>
      </section>

      <section class="px-3 p-1 flex-grow">
        <label
          for="expiresAfterViews"
          class="text-gray-400 font-semibold mb-2 block"
          >Expires after views (in minutes)</label
        >
        <small class="text-gray-400"
          >How many viewers are allowed t view secret</small
        >
        <input
          required
          type="number"
          name="expireAfterViews"
          class="border border-gray-300 text-sm w-full p-3 rounded block"
          id="expireAfterViews"
          v-model="formData.expireAfterViews"
        />
      </section>

      <section class="px-3 p-1 flex-grow">
        <label for="expiresAfter" class="text-gray-400 font-semibold mb-2 block"
          >Time to live (TTL) (in minutes)</label
        >
        <small class="text-gray-400"
          >How long should the data persist in the database</small
        >
        <input
          required
          type="number"
          name="expireAfter"
          class="border text-sm border-gray-300 w-full p-3 rounded block"
          id="expireAfter"
          placeholder="Time to live (in minutes)"
          v-model="formData.expireAfter"
        />
      </section>

      <section class="w-full flex justify-end p-3">
        <button
          :disabled="loading"
          class="bg-blue-600 lg:flex-grow-0 flex-grow rounded my-2 text-white font-bold p-3 px-8 hover:bg-blue-400"
        >
          Save
        </button>
      </section>
    </form>
    <the-loader
      v-if="loading"
      class="absolute z-10 top-0 h-full w-full left-0 bg-white bg-opacity-25 flex flex-col items-center justify-center"
    ></the-loader>
    <template v-else-if="creation">
      <hr class="mb-6" />
      <secret-viewer :viewonly="true" :info="creation"></secret-viewer>
    </template>
  </div>
</template>

<script>
import SecretViewer from "@/components/SecretViewer.vue";

export default {
  name: "create-secret",
  components: {
    SecretViewer,
  },
  data() {
    return {
      creation: null,
      loading: false,
      error: null,
      formData: {
        expireAfterViews: 10,
        expireAfter: 60,
        secret: "",
      },
    };
  },
  methods: {
    processForm() {
      const { expireAfterViews, expireAfter, secret } = this.formData;
      if (expireAfterViews && expireAfter && secret) this.toServer();
    },
    toServer() {
      this.loading = true;
      this.axios({
        url: "/",
        method: "post",
        data: { ...this.formData },
      })
        .then(({ data }) => {
          this.creation = data.data;
        })
        .catch((err) => {
          this.error = err.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>