<template>
  <div class="pt-4">
    <h1>Welcome {{ usuario.email }}</h1>
    <router-link to='/add'>
            <button class="btn btn-primary mb-3">Agregar</button>
    </router-link>
      <ul class="list-group">
        <li v-for="task in tasks" :key="task.id" class="list-group-item">
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
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Index',
  computed: {
    ...mapState(['usuario','tasks'])
  },
  methods: {
    ...mapActions(['getTasks','deleteTask'])
  },
  created() {
    this.getTasks();
  },
}
</script>

<style>

</style>