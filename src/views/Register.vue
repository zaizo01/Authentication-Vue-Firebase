<template>
    <div class="container col-6 pt-5">
        <h1>Register</h1>
        <form @submit.prevent="createUser({email: email, password: passOne})" class="col-8">
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
            v-model="passOne"
            class="form-control" id="exampleInputPassword1">
            </div>

            <div>
            <label for="exampleInputPassword1" class="form-label">Repeat Password</label>
            <input 
            type="passsword" 
            placeholder="Repeat password..."
            v-model="passTwo"
            class="form-control" id="exampleInputPassword1">
            </div>

            <button type="submit" :disabled="!desactive" class="btn btn-primary mt-3">Register</button>
        </form>
            <p>{{ error }}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            passOne: '',
            passTwo: ''
        }
    },
    created() {
        
    },
    methods: {
        ...mapActions(['createUser'])
    },
    computed: {
        ...mapState(['error']),
        desactive(){
            return this.passOne === this.passTwo && this.passOne !== '' && this.passOne.length >= 6;
        }
    },
    
}
</script>

<style>

</style>