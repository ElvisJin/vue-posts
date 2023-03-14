<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-container>
        <v-row>
          <v-col cols="12" sm="10" md="9" lg="8" class="mx-auto">
            <div class="d-flex">
              <v-text-field label="Filter" v-model="filter" class="mr-10" clearable
                prepend-icon-inline="mdi-find"></v-text-field>
              <v-btn depressed class="mt-3" color="green" @click="handleNewPost()">
                Add POST
              </v-btn>
            </div>
            <div v-if="isLoading" class="text-center">
              <label>Loading Posts ...</label>
            </div>
            <div v-else>
              <div v-if="filteredPosts.length > 0">
                <v-list-item v-for="post in pagePosts" :key="post.id" @click="handlePostDetail(post)"
                  class="rounded-lg my-2 py-1 px-8" :style="{ cursor: 'pointer', border: 'solid 1px' }">
                  <v-list-item-content>
                    <v-list-item-title>{{ post.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ post.body }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div v-else class="text-center">
                <label>Nothing to show.</label>
              </div>
              <v-pagination v-show="filteredPosts.length > 0" v-model="curPage" :length="totalPage"></v-pagination>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import postApi from '@/services/api/post'
import router from '@/router'

export default {
  data() {
    return {
      pageSize: 10,
      // pageSizeList: [10, 20, 50],
      curPage: 1,
      filter: '',
      isLoading: false,
    }
  },
  created() {
    if (this.$store.getters.postList.length == 0) {
      // load posts
      this.isLoading = true
      postApi.getPosts().then((resp) => {
        this.$store.dispatch('setPostList', resp.data)
        this.isLoading = false
      })
    }
  },
  computed: {
    posts() {
      return this.$store.getters.postList
    },
    filteredPosts() {
      return this.posts.filter(
        (post) =>
          this.filter === '' ||
          post.title.indexOf(this.filter) !== -1 ||
          post.body.indexOf(this.filter) !== -1
      )
    },
    totalPage() {
      return Math.max(1, Math.ceil(this.filteredPosts.length / this.pageSize))
    },
    pagePosts() {
      return this.filteredPosts.filter(
        (_, index) =>
          index + this.pageSize >= this.curPage * this.pageSize &&
          index < this.curPage * this.pageSize
      )
    },
  },
  methods: {
    handlePostDetail: function (post) {
      // goto detail page
      this.$store.dispatch('setCurPost', post)
      router.push('/detail')
    },
    handleNewPost: function () {
      // goto new post page
      this.$store.dispatch('setCurPost', { id: '', title: '', body: '', userId: '' })
      router.push('/new')
    },
  },
}
</script>
