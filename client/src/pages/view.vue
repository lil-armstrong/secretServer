<template>
  <section>
    Hash: {{hash}}
    <secret-viewer :hash="hash" ></secret-viewer>
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
        hash: this.$route.params.hash
      }
    }
  }
  </script>