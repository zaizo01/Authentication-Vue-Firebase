<template>
  <div class="container col-6 pt-5">
      <h1>Login</h1>
      <form @submit.prevent="loginUser({email: $v.email.$model, password: $v.password.$model})" class="col-8">

      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <small class="text-danger d-block" v-if="!$v.email.required">Required</small>
          <small class="text-danger d-block" v-if="!$v.email.email">Invalid Email</small>
          <input 
            type="text"
            placeholder="Email..."
            v-model="$v.email.$model"
            class="form-control" id="exampleInputEmail1">
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
         <small class="text-danger d-block" v-if="!$v.password.required">Required</small>
         <small class="text-danger d-block" v-if="!$v.password.minLength">Min 6 characters</small>
        <input 
            type="password"
            placeholder="Password..."
            v-model="$v.password.$model"
            class="form-control" id="exampleInputPassword1">
      </div>
      
        <button type="submit" class="btn btn-primary mt-3" :disabled="$v.$invalid">Login</button>
    </form>
    <p v-if="error === 'auth/user-not-found'" class="alert alert-danger mt-3">User incorrect</p>
    <p v-if="error === 'auth/wrong-password'" class="alert alert-danger mt-3">Password incorrect</p>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
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
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        }
    }
}
</script>
