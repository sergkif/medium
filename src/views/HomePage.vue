<template>
  <div class="homePage">
    <div class="container" v-if="!error">
      <div class="field" v-for="item in data" :key="item.id">
        <Article :role="role" :data="item"/>
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
      role: 'role'
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
