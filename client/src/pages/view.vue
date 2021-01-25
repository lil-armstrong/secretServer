<template>
  <section>
    <nav class="text-gray-500 p-3 text-sm">
      <router-link :to="{name:'home'}">Home</router-link>
    </nav>
    
    <the-loader class="min-h-screen flex flex-col items-center justify-center" v-if="loading"></the-loader>
    
    <template v-else>
      
      <secret-viewer :info="info" v-if="info"></secret-viewer>
    
      <section v-else class="flex p-3 flex-col text-center items-center min-h-screen justify-center">
        <header class="mb-3">
          <h1 class="text-3xl text-gray-600 font-bold">Secret not found</h1>
        </header>
        <p class="text-gray-400">
          Secret with hash <span class="bg-green-600 p-1 font-medium text-green-600 rounded text-sm  bg-opacity-25">{{hash}}</span> not found or deleted. Please try another hash
        </p>
      </section>
    
    </template>
  </section>
</template>

<script>
  import SecretViewer from '@/components/SecretViewer.vue'
  export default {
    name: 'view-secret',
    components: {
      SecretViewer
    },
    data() {
      return {
        info: null,
        loading: false,
        error: null
      }
    },
    mounted() {
      this.fetchSecret()
    },
    methods: {
      fetchSecret() {
        const hash = this.$route.params.hash
       
        if (hash) {
          this.loading = true;
          
          this.axios({
            url: `${hash}`,
            method: 'get',
          }).then(response=> {
            this.info = response.data.data
          }).catch(error=> {
            if (error.response) {
              this.error = error.response.statusText
            }
          }).finally(()=> {
            this.loading = false
          })
        }
      }

    }

  }
  </script>