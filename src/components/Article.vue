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
          <div v-if="role" class="buttons">
            <b-button v-if="role==='reader'" size="is-medium is-info">
              Claps: {{ data.claps }}
            </b-button>
            <b-button v-if="role==='writer'" size="is-medium is-info">
              Edit
            </b-button>
            <b-button v-if="role==='writer'" size="is-medium is-info">
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
  name: 'LoginForm',
  props: {
    role: {
      type: String,
      required: false,
      default: ''
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
