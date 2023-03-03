<template>
  <div>
    <v-card>
      <v-card-actions>
        <v-btn @click="goBack()">Back</v-btn>
        <v-btn @click="handleEdit" depressed class="ml-auto primary">Edit</v-btn>
        <v-btn @click="handleDelete" depressed color="ml-2 red">Delete</v-btn>
      </v-card-actions>
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-text>
        <p class="text-left">{{ post.body }}</p>
        <div class="text-right">
          <label>User ID: {{ post.userId }}</label>
        </div>
      </v-card-text>
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
    this.post = this.$store.getters.curPost
  },
  data() {
    return {
      isWaiting: false,
      snackbar: false,
      text: '',
      post: {
        title: 'This is title',
        body: 'This is body',
        id: '1',
        userId: '103'
      }
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    handleEdit: function () {
      router.push('/edit')
    },
    handleDelete: function () {
      this.isWaiting = true
      postApi.deletePost(this.post.id).then(res => {
        this.isWaiting = false
        this.text = 'Post Deleted'
        this.snackbar = true
        this.$store.dispatch('deletePost', this.post.id)
        // redirect to home
        setTimeout(() => router.push('/'), 2000) // to home (in 2 seconds)
      }).catch(err => {
        this.isWaiting = false
        // alert error
        this.text = 'Error Occurred'
        this.snackbar = true
      })
    }
  }
}

</script>