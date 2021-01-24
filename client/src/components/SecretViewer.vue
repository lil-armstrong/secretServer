<template>
  <section>
    <div>
      Info:{{Object.is(info, null)}}
    </div>
    <div :key="`error-${index}`" v-for="(error, index) of errors">
      {{error}}
    </div>
  </section>
</template>

<script>
export default {
  name: "secret-viewer",
  props: {
    hash: {
      required: true,
      type: String,
    },
  data() {
    return {
      info: null,
    };
  },
  mounted() {
    //todo: get the id
    if (this.hash)
      this.axios({
        method: "get",
        url: `/${this.hash}`
        })
        .then((response) => {
          this.info = response.data;
        })
        .catch((error) => {
          if (error.response) {
            console.error(error.response.statusText);
          } else if (error.request) {
            console.error({ request: error.response });
          } else {
            console.error({ error });
          }
        });
  },
};
</script>