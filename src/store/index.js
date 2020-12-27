import Vue from 'vue'
import Vuex from 'vuex'
import {auth, db} from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    tasks: [],
    task: {name: '', id: ''}
  },
  mutations: {
    setUser(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setTasks(state, payload){
      state.tasks = payload
    },
    setTask(state, payload){
      state.task = payload
    },
    setDeleteTask(state, payload){
      state.tasks = state.tasks.filter(item => item.id !== payload)
    }
  },
  actions: {
    getTasks({commit, state}){
      const tasks = []
      db.collection(state.usuario.email).get()
      .then(res => {
          res.forEach(doc => {
              let task = doc.data()
              task.id = doc.id
              tasks.push(task)
          })
          commit('setTasks', tasks)
      })
      .catch(error => console.log(error))
  },

  getTask({commit, state}, id){
    db.collection(state.usuario.email).doc(id).get()
    .then(doc => {
        let task = doc.data()
        task.id = doc.id
        commit('setTask', task)
    })
    .catch(error => console.log(error))
  },

  editTask({commit, state}, task){
    db.collection(state.usuario.email).doc(task.id).update({
      name: task.name
    })
    .then(() => {
      router.push({name: 'Index'})
    })
    .catch(error => console.log(error))
  },

  addTask({commit, state}, nameTask){
    db.collection(state.usuario.email).add({
        name: nameTask
    })
    .then(doc => {
        router.push({name: 'Index'})
    })
    .catch(error => console.log(error))
},
deleteTask({commit, state}, id){
  db.collection(state.usuario.email).doc(id).delete()
    .then(() => {
        commit('setDeleteTask', id)
    })
    .catch(error => console.log(error))
},

    createUser({commit}, usuario){
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
          .then(resp => {
            console.log(resp);
            const userCreated = {
              email: resp.user.email,
              uid: resp.user.uid
            }

            db.collection(resp.user.email).add({
              name: 'task Example'
            }).then(doc => {
            commit('setUser', userCreated);
            router.push('/');
            }).catch(error => console.log(error))

          })
          .catch(error => {
            console.log(error);
            commit('setError', error)
          })
    },
    loginUser({commit}, usuario){
      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
          .then(resp => {
            console.log(resp);
            const userLogged = {
              email: resp.user.email,
              uid: resp.user.uid
            }
            commit('setUser', userLogged);
            router.push('/');
          })
          .catch(error => {
            console.log(error);
            commit('setError', error);
          })
    },
    signOut({commit}){
      auth.signOut()
      router.push('/login')
  },
  detectUser({commit}, usuario){
    commit('setUser', usuario);
  }
  },
  getters: {
    existUser(state){
      if (state.usuario === null) {
        return false
      } else {
        return true
      }
    }
  },
  modules: {
  }
})
