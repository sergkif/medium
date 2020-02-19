<template>
  <div>
    <b-navbar class="is-info">
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item v-if="user.role === 'writer'" tag="router-link" :to="{ path: '/add' }">Add post</b-navbar-item>
        <b-navbar-item v-if="!user.role" tag="router-link" :to="{ path: '/login' }">Login</b-navbar-item>
        <b-navbar-item v-else tag="router-link" :to="{ path: '/login' }">Logout</b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
}
</script>
