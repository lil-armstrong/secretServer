<template>
  <form @submit.prevent="processForm" class="flex flex-wrap w-full">
    <section class="w-full p-3">
      <label for="secret" class="text-sm font-medium text-gray-500"
        >Secret text</label
      >
      <textarea
        required
        v-model="formData.secret"
        name="secret"
        placeholder="Enter secret here"
        id="secret"
        rows="8"
        class="w-full rounded border border-gray-300 p-3"
      ></textarea>
    </section>

    <section class="p-3 flex-grow">
      <label for="expiresAfterViews" class="text-sm font-medium text-gray-500"
        >Expires after views (in minutes)</label
      >
      <input
        required
        type="number"
        name="expireAfterViews"
        class="border border-gray-300 w-full p-3 rounded block"
        id="expireAfterViews"
        v-model="formData.expireAfterViews"
      />
    </section>

    <section class="p-3 flex-grow">
      <label for="expiresAfter" class="text-gray-500 font-medium text-sm"
        >Time to live (TTL) (in minutes)</label
      >
      <small></small>
      <input
        required
        type="number"
        name="expireAfter"
        class="border border-gray-300 w-full p-3 rounded block"
        id="expireAfter"
        placeholder="Time to live (in minutes)"
        v-model="formData.expireAfter"
      />
    </section>

    <section class="w-full flex justify-end p-3">
      <button class="bg-green-800 rounded my-2 text-white font-bold p-3 px-6">
        Save
      </button>
    </section>
  </form>
</template>

<script>
export default {
  name: "create-secret",
  data() {
    return {
      formData: {
        expireAfterViews: 10,
        expireAfter: 60,
        secret: "",
      },
    };
  },
  methods: {
    processForm() {
      console.log({ formdata: this.formData });
    },
    toServer() {
      this.axios({
        url: "/",
        method: "post",
        data: { ...this.formData },
      });
    },
  },
};
</script>