<template>
  <form @submit.prevent="processForm" class="block w-full p-4">
    <label for="expiresAfterViews" class="text-sm font-medium text-gray-500">Secret text</label>
    <textarea required
      v-model="formData.secret"
      name="secret-text"
      placeholder="Enter secret here"
      id="secret-text" rows="8"
      class="w-full rounded border border-gray-300 p-3"></textarea>

    <label for="expiresAfterViews" class="text-sm font-medium text-gray-500">Expires after views</label>
    <input required
    type="number"
    name="expireAfterViews"
    class="border border-gray-300 p-3 rounded block"
    id="expireAfterViews"
    v-model="formData.expireAfterViews" />
    
    <label for="expiresAfter" class="text-gray-500 font-medium text-sm">Time to live (TTL)</label>
    <small></small>
    <input required
    type="number"
    name="expireAfter"
    class="border border-gray-300 p-3 rounded block"
    id="expireAfter"
    placeholder="Time to live (in minutes)"
    v-model="formData.expireAfter" />
    
    <button class="bg-green-800 text-white block font-bold p-3">Save</button>
  </form>
</template>

<script>
  export default {
    name: 'create-secret',
    data() {
      return {
        formData: {
          expireAfterViews: 10,
          expireAfter: 60,
          secret: ''
        }
      }
    },
    methods: {
      processForm() {}
    }
  }
  </script>