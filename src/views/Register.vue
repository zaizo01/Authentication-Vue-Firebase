<template>
    <div class="container col-6 pt-5">
        <h1>Register</h1>
        <form @submit.prevent="createUser({email: $v.email.$model, password: $v.passOne.$model})" class="col-8">
            <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <small class="text-danger d-block" v-if="!$v.email.required">Required</small>
            <small class="text-danger d-block" v-if="!$v.email.email">Email Incorrect</small>
            <input 
                type="text"
                placeholder="Email..."
                v-model="$v.email.$model"
                class="form-control" id="exampleInputEmail1">
            </div>

            <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
             <small class="text-danger d-block" v-if="!$v.passOne.required">Required</small>
             <small class="text-danger d-block" v-if="!$v.passOne.minLength">Min 6 characteres</small>
            <input 
            type="password" 
            placeholder="Password..."
            v-model="$v.passOne.$model"
            class="form-control" id="exampleInputPassword1">
            </div>

            <div>
            <label for="exampleInputPassword1" class="form-label">Repeat Password</label>
             <small class="text-danger d-block" v-if="!$v.passTwo.sameAsPassword">Passwords must be identical</small>
            <input 
            type="password" 
            placeholder="Repeat password..."
            v-model="$v.passTwo.$model"
            class="form-control" id="exampleInputPassword1">
            </div>

            <button type="submit" :disabled="$v.$invalid" class="btn btn-primary mt-3">Register</button>
        </form>
            <p v-if="error === 'auth/email-already-in-use'" class="alert alert-danger mt-3">Email already in use</p>
    </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
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
    validations: {
        email: {
            required,
            email
        },
        passOne: {
            required,
            minLength: minLength(6)
        },
        passTwo: {
            sameAsPassword: sameAs('passOne')
        }
    }
    
}
</script>

<style>

</style>