<template>
  <div>
    <v-card class="mx-auto" style="max-width: 500px">
      <v-form ref="form" v-model="form" class="pa-4 pt-6">
        <input v-model="post.id" hidden />
        <h3>{{ post.id ? 'Edit Post' : 'New Post' }}</h3>
        <v-text-field v-model="post.title" color="deep-purple" label="Post Title"></v-text-field>
        <v-textarea v-model="post.body" auto-grow color="deep-purple" label="Post Body" rows="4"></v-textarea>
        <v-text-field v-model="post.userId" color="deep-purple" label="User Id"></v-text-field>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text @click="$refs.form.reset()">
          Clear
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="goBack()">Back</v-btn>
        <v-btn :disabled="!form" :loading="isLoading" class="white--text" color="deep-purple accent-4" depressed
          @click="handleSubmit()">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

import postApi from '@/services/api/post'
import router from '@/router'

export default {
  created: function () {
    // get initial data from store
    this.post = this.$store.getters.curPost
  },
  data() {
    return {
      isLoading: false,
      snackbar: false,
      text: '',
      post: { id: '', title: '', body: '', userId: '' }, // initialized from props - post
      form: false,
      rules: {
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        required: v => !!v || 'This field is required',
      }
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    handleSubmit: function () {
      this.isLoading = true
      if (this.post.id) {
        postApi.updatePost(this.post.id, this.post).then(res => {
          // alert success
          this.text = 'Post Updated'
          this.snackbar = true
          this.isLoading = false

          // update for (detail)
          this.$store.dispatch('setCurPost', this.post)
          this.$store.dispatch('updatePost', this.post)
        }).catch(err => {
          // alert error
          this.text = 'Error Occurred'
          this.snackbar = true
          this.isLoading = false
        })
      } else {
        postApi.createPost({
          title: this.post.title,
          body: this.post.body,
          userId: this.post.userId
        }).then(res => {
          console.log('createPost resp', res)
          // alert success
          this.post.id = res.id
          this.text = 'Post Created'
          this.snackbar = true
          this.isLoading = false
          this.$store.dispatch('addPost', this.post)
        }).catch(err => {
          // alert error
          this.text = 'Error Occurred'
          this.snackbar = true
          this.isLoading = false
        })
      }
    }
  },
}

</script>