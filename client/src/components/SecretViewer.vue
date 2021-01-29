<template>
  <section v-if="info">

    <section class="min-h-screen flex flex-col">
      <div class="p-3 border-b border-gray-300 text-gray-500 bg-opacity-50 bg-gray-300">
        <small class="">Hash</small>
        <input type="text" name="" id="" class="font-medium focus:border-none focus:shadow-none focus:outline-none w-full p-0 m-0 truncate bg-transparent border-none" readonly :value="info.hash" />
      </div>

      <div class="p-3 mb-auto flex-auto text-gray-500">
        {{info.secretText}}
      </div>

      <div class="flex p-3 sticky bottom-0 bg-gray-300 bg-opacity-50 justify-between text-xs ">
        <div class="truncated">
          <span class="text-gray-400">Creation: <strong>{{timeFromNow(info.createdAt)}}</strong></span>
        </div>

        <div class="flex-grow flex-auto mx-auto text-center">
          <span class="text-gray-400">Views left: <strong>{{ info.remainingViews}}</strong></span>
        </div>

        <div class="truncate">
          <span class="text-gray-400">Expiration: <strong>{{timeFromNow(info.expiresAt)}}</strong></span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import moment from 'moment';
  export default {
    name: "secret-viewer",

    props: {
      info: {
        required: true
      }
    },
    methods: {
      timeFromNow(value) {
        value = new Date(value)
        return moment(value, "L").fromNow();
      },
    }
  }
  </script>