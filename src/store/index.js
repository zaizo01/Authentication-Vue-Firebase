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
    task: {name: '', id: ''},
    load: false,
    texto: ''
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
    },
    loadFirebase(state, payload){
      state.load = payload
    }
  },
  actions: {
    searcher({commit, state}, payload){
      state.texto = payload.toLowerCase();
    },
    getTasks({commit, state}){

      commit('loadFirebase', true);

      const tasks = []
      db.collection(state.usuario.email).get()
      .then(res => {
          res.forEach(doc => {
              let task = doc.data()
              task.id = doc.id
              tasks.push(task)
          })
          setTimeout(() => {
            
            commit('loadFirebase', false);
          }, 2000);
        })
        commit('setTasks', tasks)
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
    commit('loadFirebase', true);
    db.collection(state.usuario.email).add({
        name: nameTask
    })
    .then(doc => {
        router.push({name: 'Index'})
        commit('loadFirebase', false);
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
            commit('setError', error.code)
          })
          .catch(error => {
            console.log(error);
            commit('setError', error.code);
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
            commit('setError', error.code);
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
    },
    arrayFiltered(state){
      let arrFiltered = [];
      for(let task of state.tasks){
        let taskName = task.name.toLowerCase();
        if (taskName.indexOf(state.texto) >= 0) {
          arrFiltered.push(task);
        }
      }
      return arrFiltered;
    }
  },
  modules: {
  }
})
