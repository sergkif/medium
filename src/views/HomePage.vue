<template>
  <div class="homePage">
    <div class="container" v-if="!error">
      <div class="field" v-for="item in data" :key="item.id">
        <Article :user="user" :data="item" v-on:deleted="deleted"/>
      </div>
    </div>
    <div v-if="error" class="container">
      <span class="error">{{ error }}</span>
    </div>
    <div class="section">
      <b-pagination
            class="is-centered"
            total="100"
            current.sync="10"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
        </b-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Article from '@/components/Article.vue'

export default {
  name: 'HomePage',
  components: { Article },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  data () {
    return {
      data: [],
      error: ''
    }
  },
  methods: {
    async onInit () {
      await fetch('http://localhost:3000/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json()
          } else {
            throw new Error(response.statusText)
          }
        })
        .then(data => {
          if (data) this.data = data
        })
        .catch(err => {
          console.log(err)
          this.error = err
        })
    },
    deleted (id) {
      this.data.forEach(item => {
        if (item.id === id) this.data.splice(this.data.indexOf(item), 1)
      })
    }
  },
  mounted () {
    this.onInit()
  }
}
</script>

<style lang="scss" scoped>
  .error {
    color: #D8000C;
  }
</style>
