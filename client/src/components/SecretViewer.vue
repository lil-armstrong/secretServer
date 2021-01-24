<template>
  <section>
    <div>
      Info:{{info}}
    </div>
    <div>
      hash:{{hash}}
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
        info: null
      }
    },
    mounted () {
      //todo: get the id
      if (this.hash)
        this.axios({
        method: 'get',
        url: `/${this.hash}`,
        responseType: 'stream'
      }).then(response=> {
        this.info = response.data
      })
    }
  }
  </script>