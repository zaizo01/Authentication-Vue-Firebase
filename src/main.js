import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'

Vue.config.productionTip = false

auth.onAuthStateChanged(user => {
  if (user) {
    console.log(user);
    const detectUser = {
      email: user.email,
      uid: user.uid
    }
    store.dispatch('detectUser', detectUser);
  } else {
    console.log(user);
    store.dispatch('detectUser', user);
  }
  
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

})
