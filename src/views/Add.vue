<template>
    <div>
        <h1>Agregar</h1>
        <form @submit.prevent="addTask(name)" class="col-6">
            <small class="text-danger" v-if="!$v.name.required">Required</small>
            <small class="text-danger" v-if="!$v.name.minLength">Minimum 5 characters</small>
            <input type="text" class="form-control mb-2" v-model="$v.name.$model">
            <button type="submit" class="btn btn-primary" :disabled="$v.$invalid || load">Agregar</button>
        </form>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Add',
    data() {
        return {
            name: ''
        }
    },
    computed: {
        ...mapState(['load'])
    },
    methods:{
        ...mapActions(['addTask'])
    },
    validations: {
        name: {
            required,
            minLength: minLength(5)
        }
    }
}
</script>
