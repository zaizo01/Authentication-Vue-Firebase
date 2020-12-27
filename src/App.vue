<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand ms-3" href="#">Auth</a>
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div>
              <router-link to="/" v-if="existUser" class="ms-2 btn btn-primary">Index</router-link> 
              <router-link to="/register" v-if="!existUser" class="ms-4 btn btn-primary">Register</router-link> 
              <router-link to="/login" v-if="!existUser" class="ms-3 btn btn-primary">Login</router-link> 
              <button type="submit" @click="signOut" v-if="existUser" class="btn btn-primary ms-3">Sign Out</button>
            </div>
          </div>
        </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['signOut'])
  },
  computed: {
    ...mapGetters(['existUser'])
  },
}
</script>
