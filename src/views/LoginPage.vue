<template>
  <div class="loginPage">
    <section class="container">
      <h1 class="title">Login</h1>
      <div class="block">
        <LoginForm/>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  },
  methods: {
    ...mapActions({
      setUser: 'setUser'
    })
  },
  mounted () {
    this.setUser({ role: '', id: '' })
  }
}
</script>

<style lang="scss" scoped>
</style>
