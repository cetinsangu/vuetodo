<template>
  <v-list flat>
    <draggable v-model="tasks" handle=".handle">
      <Task v-for="task in tasks" :key="task.id" :task="task" />
    </draggable>
  </v-list>
</template>

<script>
import draggable from 'vuedraggable';
import Task from '@/components/Todo/Task.vue';
export default {
  computed: {
    tasks: {
      get() {
        return this.$store.getters.filteredTasks;
      },
      set(value) {
        this.$store.dispatch('updateTasks', value);
      },
    },
  },
  components: { Task, draggable },
};
</script>

<style></style>
