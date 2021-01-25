<template>
  <div>
  <form @submit.prevent="processForm" class="relative flex flex-wrap w-full text-gray-500">
    <section class="w-full px-3 p-1">
      <label for="secret" class=" text-gray-500"
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
      <label for="expiresAfterViews" class=" text-gray-500"
        >Expires after views (in minutes)</label
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
      <label for="expiresAfter" class="text-gray-500"
        >Time to live (TTL) (in minutes)</label
      >
      <small></small>
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
      <button :disabled="loading" class="bg-green-800 rounded my-2 text-white font-bold p-3 px-6">
        Save
      </button>
    </section>
   </form>
  <the-loader v-if="loading" class="absolute z-10 top-0 h-full w-full left-0 bg-white bg-opacity-25 flex flex-col items-center justify-center"></the-loader>
  <template v-else-if="creation!=null">
    <secret-viewer :info="creation" ></secret-viewer>
  </template>
  </div>
</template>

<script>
export default {
  name: "create-secret",
  data() {
    return {
      creation: null,
      loading: false,
      error:null,
      formData: {
        expireAfterViews: 10,
        expireAfter: 60,
        secret: "",
      },
    };
  },
  methods: {
    processForm() {
      const {expireAfterViews, expireAfter, secret}=this.formData
     if(expireAfterViews && expireAfter && secret)
      this.toServer()
    },
    toServer() {
      this.loading = true
      this.axios({
        url: "/",
        method: "post",
        data: { ...this.formData },
      }).then(({data})=>{
        this.creation = data.data
      }).catch(err=>{
        this.error = err.message
      }).finally(()=>{
        this.loading = false
      });
    },
  },
};
</script>