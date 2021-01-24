<template>
  <div class="">
    <create-secret-form></create-secret-form>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateSecretForm from '@/components/CreateSecretForm.vue'

export default {
  name: 'home',
  components: {
    CreateSecretForm
  }
}
</script>

<style lang="scss" >
  
</style>
