<template>
  <div class="homePage">
    <div class="container" v-if="!error">
      <div class="field" v-for="item in data" :key="item.id">
        <Article :user="user" :data="item" v-on:deleted="deleted"/>
      </div>
      <div class="field">
        <b-pagination
            class="is-centered"
            :total="totalPages"
            :current="currentPage"
            per-page="10"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            @change="onPageChange">
        </b-pagination>
      </div>
    </div>
    <div v-if="error" class="container">
      <span class="error">{{ error }}</span>
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
      error: '',
      currentPage: 1,
      totalPages: 0
    }
  },
  methods: {
    async onInit () {
      await fetch('http://localhost:3000/posts?_limit=10&_page=' + this.currentPage, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200) {
            this.totalPages = parseInt(Math.ceil(response.headers.get('X-Total-Count') / 10))
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
    },
    onPageChange () {
      console.log(this.currentPage)
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
