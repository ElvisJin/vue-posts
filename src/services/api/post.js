import axios from 'axios';

const POST_API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default {
  getPosts() {
    return axios.get(POST_API_URL)
  },

  getPost(postId) {
    return axios.get(`${POST_API_URL}/${postId}`)
  },

  createPost(postData) {
    console.log('createPost', postData);
    return axios.post(POST_API_URL, postData)
  },

  updatePost(postId, updateData) {
    return axios.put(`${POST_API_URL}/${postId}`, updateData)
  },

  deletePost(postId) {
    return axios.delete(`${POST_API_URL}/${postId}`)
  },
}
