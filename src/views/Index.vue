<template>
  <div class="pt-4">
    <h1 class="text-center">Welcome {{ usuario.email }}</h1>

    <form @submit.prevent="searcher(texto)">
      <input type="text" class="form-control my-5" placeholder="Search..." v-model="texto" v-on:keyup="searcher(texto)">
    </form>
    <div v-if="load" class="mx-2 my-5">
      <p>Cargando...</p>
      <half-circle-spinner
      :animation-duration="1000"
      :size="30"
      :color="'#0984e3'"
      />
    </div>
    <router-link to='/add'>
            <button class="btn btn-primary mb-3">Agregar</button>
    </router-link>
   
      <ul class="list-group" v-if="!load">
        <li v-for="task of arrayFiltered" :key="task.id" class="list-group-item">
          {{task.id}} - {{task.name}}
          <router-link :to="{name: 'Edit', params: {id: task.id}}" class="float-end ms-2">
            <button class="btn btn-warning">Edit</button>
          </router-link>
           <button @click="deleteTask(task.id)" class="btn btn-danger float-end">Eliminar</button>
        </li>
      </ul>
  </div>
</template>

<script>
import {HalfCircleSpinner} from 'epic-spinners'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Index',
  data() {
    return {
      texto: ''
    }
  },
  computed: {
    ...mapState(['usuario','tasks', 'load']),
    ...mapGetters(['arrayFiltered'])
  },
  methods: {
    ...mapActions(['getTasks','deleteTask','searcher'])
  },
  created() {
    this.getTasks();
  }, components: {
      HalfCircleSpinner
    }
}
</script>

<style>

</style>