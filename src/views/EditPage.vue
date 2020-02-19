<template>
  <div class="editPage">
    <PostForm v-if="post" :post="post" v-on:edit-post="editPost"/>
    <PostForm v-else v-on:edit-post="editPost"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import PostForm from '@/components/PostForm.vue'

export default {
  name: 'EditPage',
  components: { PostForm },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),

    getMethod () {
      if (this.id) return 'PUT'
      else return 'POST'
    },
    getUrl () {
      if (this.id) return 'http://localhost:3000/posts/' + this.id
      else return 'http://localhost:3000/posts'
    }
  },
  data () {
    return {
      post: {}
    }
  },
  methods: {
    async editPost (post) {
      post.userId = this.user.id
      if (this.id) post.updatedAt = moment()
      else post.createdAt = moment()
      await fetch(this.getUrl, {
        method: this.getMethod,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
        .then(response => {
          if (response.status < 200 && response.status >= 400) throw new Error('Somethig wrong')
          else this.$router.push({ path: '/' })
        })
        .catch(err => console.log(err))
    },
    async getPost () {
      if (this.id) {
        await fetch('http://localhost:3000/posts/' + this.id, {
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
            if (data) this.post = data
          })
          .catch(err => {
            console.log(err)
            this.error = err
          })
      }
    }
  },
  mounted () {
    if (this.id) this.getPost()
  }
}
</script>

<style lang="scss" scoped>
</style>
