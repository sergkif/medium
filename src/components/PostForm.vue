<template>
  <div class="postForm">
    <section class="container">
      <h1 class="title" v-if="post.hasOwnProperty('id')">Edit Post</h1>
      <h1 class="title" v-else>Add Post</h1>
      <div class="block">
        <b-field label="Title" label-position="on-border">
            <b-input v-model="post.title"></b-input>
        </b-field>
        <b-field label="Content"
            label-position="on-border">
            <b-input v-model="post.description" type="textarea"></b-input>
        </b-field>
        <b-field>
          <button class="button is-info" @click="$emit('edit-post', post)">
            Submit
          </button>
        </b-field>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: function () {
        return {
          title: '',
          description: '',
          claps: 0,
          createdAt: '',
          updateAt: '',
          userId: ''
        }
      }
    }
  }
}
</script>
