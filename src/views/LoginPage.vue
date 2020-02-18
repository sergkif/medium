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
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
</style>
