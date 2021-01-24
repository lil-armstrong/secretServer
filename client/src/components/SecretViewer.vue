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
    name: 'secret-viewer',
    props: {
      hash: {
        required: true,
        type: String
      }
    },
    data() {
      return {
        info: null,
        errors: []
      }
    },
    mounted () {
      //todo: get the id
      if (this.hash)
        this.axios.get({
        method: 'get',
        url: `/${this.hash}`,
        responseType: 'stream'
      }).then(response=> {
        this.info = response
      }).catch(err=>{
        this.errors.push(err)
      })
    }
  }
  </script>