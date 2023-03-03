const state = {
  postList: [],
  curPost: {
    id: '',
    title: '',
    body: '',
    userId: ''
  }
}

const getters = {
  postList: (state) => state.postList,
  curPost: (state) => state.curPost
}

const actions = {
  setPostList({ commit }, payload) {
    commit('SET_POST_LIST', payload)
  },
  setCurPost({ commit }, payload) {
    commit('SET_CUR_POST', payload)
  },
  addPost({ commit }, payload) {
    commit('ADD_POST', payload)
  },
  updatePost({ commit }, payload) {
    commit('UPDATE_POST', payload)
  },
  deletePost({ commit }, payload) {
    commit('DELETE_POST', payload)
  }
}

const mutations = {
  SET_POST_LIST(state, list) {
    state.postList = list
  },
  SET_CUR_POST(state, post) {
    state.curPost = post
  },
  ADD_POST(state, post) {
    state.postList.push(post)
  },
  UPDATE_POST(state, post) {
    state.postList = state.postList.map(_post => _post.id == post ? post : _post)
  },
  DELETE_POST(state, delId) {
    state.postList = state.postList.reduce((newList, _post) =>
      _post.id == delId ? newList : [...newList, _post], [])
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
