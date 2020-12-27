<template>
  <div class="">
      <h1>Edit Task</h1>
      <form @submit.prevent="editTask(task)" class="col-6">
          <input type="text" class="form-control mb-2" v-model="task.name">
          <button type="submit" class="btn btn-warning">Edit</button>
      </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'Edit',
    data() {
        return {
            id: this.$route.params.id
        }
    },
    created() {
        this.getTask(this.id);
    },
    methods: {
        ...mapActions(['getTask', 'editTask'])
    },
    computed: {
        ...mapState(['task'])
    },
}
</script>

<style>

</style>