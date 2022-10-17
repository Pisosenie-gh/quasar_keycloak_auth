<template>
  <h1>Protected route</h1>
  <h3>{{ getMe.name }}</h3>
  <h3>{{ isAuthenticated.isAuthenticated }}</h3>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  computed: {
    ...mapGetters('auth', ['getMe', 'isAuthenticated'])
  }
}
</script>
<style scoped>

</style>
