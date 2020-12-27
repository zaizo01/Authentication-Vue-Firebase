<template>
    <div>
        <h1>Agregar</h1>
        <form @submit.prevent="addTask(name)" class="col-6">
            <input type="text" class="form-control mb-2" v-model="name">
            <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Add',
    data() {
        return {
            name: ''
        }
    },
    methods:{
        ...mapActions(['addTask'])
    }
}
</script>
