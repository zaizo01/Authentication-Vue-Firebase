<template>
  <div class="container col-6 pt-5">
      <h1>Login</h1>
      <form @submit.prevent="loginUser({email: email, password: password})" class="col-8">

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input 
            type="text"
            placeholder="Email..."
            v-model="email"
            class="form-control" id="exampleInputEmail1">
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input 
            type="password"
            placeholder="Password..."
            v-model="password"
            class="form-control" id="exampleInputPassword1">
      </div>
      
        <button type="submit" class="btn btn-primary mt-3">Login</button>
    </form>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['loginUser'])
    },
    computed: {
        ...mapState(['error'])
    },
}
</script>
