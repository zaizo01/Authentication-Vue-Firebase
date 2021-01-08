<template>
  <div class="">
      <h1>Edit Task</h1>
      <small class="text-danger" v-if="!$v.task.name.required">Required</small>
      <form @submit.prevent="editTask(task)" class="col-6">
          <input type="text" class="form-control mb-2" v-model="$v.task.name.$model">
          <button type="submit" class="btn btn-warning" :disabled="$v.task.name.$invalid">Edit</button>
      </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
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
    validations: {
        task: {
            name: {
                required
            }
        }
    }
}
</script>

<style>

</style>