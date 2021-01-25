<template>
  <section v-if="info">
    <section
      :class="[
        'border-2 hover:border-blue-600 rounded overflow-hidden border-gray-300 flex flex-col',
      ]"
    >
      <div
        class="p-3 border-b border-gray-300 text-gray-500 bg-opacity-50 bg-gray-100"
      >
        <small class="text-gray-400 block">Hash</small>
        <div
          class="overflow-hidden flex mt-2 w-full"
          @click.stop="copyToClipboard(info.hash)"
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="currentColor"
            class="mr-2 hover:text-blue-600 flex-shrink-0 cursor-pointer"
          >
            <path
              d="M17 7h6v16h-16v-6h-6v-16h16v6zm5 1h-14v14h14v-14zm-6-1v-5h-14v14h5v-9h9z"
            />
          </svg>
          <span
            class="font-semibold truncate tracking-wider w-full p-0 m-0 text-blue-600"
            @click.stop="selectText"
          >
            {{ info.hash }}
          </span>
        </div>

        <div class="flex justify-end pt-2">
          <router-link
            class="font-semibold px-3 py-2 rounded text-sm hover:bg-blue-600 hover:text-white text-blue-600"
            v-show="viewonly && generateUrl"
            :to="generateUrl"
            >View</router-link
          >
        </div>
      </div>
      <template v-if="!viewonly">
        <div class="p-3 h-60 mb-auto flex-auto text-gray-500">
          {{ info.secretText }}
        </div>
        <div
          class="flex p-3 sticky bottom-0 bg-gray-300 bg-opacity-50 justify-between text-xs"
        >
          <div
            class="truncated"
            :title="`Created: ${timeFromNow(info.createdAt)}`"
          >
            <span class="text-gray-400">Creation: </span>
            <strong class="block">{{ timeFromNow(info.createdAt) }}</strong>
          </div>

          <div
            class="flex-grow flex-auto mx-auto text-center"
            :title="`Views left: ${info.remainingViews}`"
          >
            <span class="text-gray-400">Views left: </span>
            <strong class="block">{{ info.remainingViews }}</strong>
          </div>

          <div
            class="truncate text-right"
            :title="`${timeFromNow(info.expiresAt)}`"
          >
            <span class="text-gray-400">Expiration: </span>
            <strong class="block">{{ timeFromNow(info.expiresAt) }}</strong>
          </div>
        </div>
      </template>
    </section>
  </section>
</template>

<script>
import moment from "moment";
export default {
  name: "secret-viewer",
  props: {
    viewonly: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {
    generateUrl() {
      let to = "view";
      if (this.info) {
        to = { name: "view-hash", params: { hash: this.info.hash } };
      }
      return { ...to };
    },
  },
  methods: {
    timeFromNow(value) {
      value = new Date(value);
      return moment(value, "L").fromNow();
    },
    copyToClipboard(text) {
      if (text) {
        let input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
    },
    selectText(e) {
      const node = e.target;
      if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
        document.execCommand("copy");
      } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
      } else {
        console.warn("Could not select text in node: Unsupported browser.");
      }
    },
  },
};
</script>