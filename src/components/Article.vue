<template>
  <div class="card">
    <div class="header">
      <p class="card-header-title">
        {{ data.title }}
      </p>
    </div>
    <div class="card-content">
      <div class="content">
        {{ data.description }}
      </div>
      <div class="media">
        <div class="media-left">
          <span class="font_color" v-if="!data.updateAt">{{ data.createdAt | moment("from", "now") }}</span>
          <span class="font_color" v-else>{{ data.updateAt | moment("from", "now") }}</span>
        </div>
        <div class="media-content">
        </div>
        <div class="media-right">
          <div v-if="user.role" class="buttons">
            <b-button v-if="user.role==='reader'" size="is-medium is-info" @click="clap">
              Claps: {{ data.claps }}
            </b-button>
            <b-button v-if="user.role==='writer' && data.userId===user.id" size="is-medium is-info" @click="editPost">
              Edit
            </b-button>
            <b-button v-if="user.role==='writer' && data.userId===user.id" size="is-medium is-info" @click="deletePost">
              Delete
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    user: {
      type: Object,
      required: false
    },
    data: {
      type: Object,
      required: false
    }
  },
  computed: {
  },
  data () {
    return {
    }
  },
  methods: {
    async clap () {
      this.data.claps++
      await fetch('http://localhost:3000/posts/' + this.data.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.data)
      })
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText)
          }
        })
        .catch(err => console.log(err))
    },
    editPost () {
      this.$router.push({ path: '/edit/' + this.data.id, id: toString(this.data.id) })
    },
    async deletePost () {
      await fetch('http://localhost:3000/posts/' + this.data.id, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText)
          } else {
            this.$emit('deleted', this.data.id)
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
  .font_color {
    color: #c4c2c2;
  }
  .card-content {
    text-align: left;
  }
</style>
