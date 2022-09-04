<template>
  <v-text-field
    v-model="newTaskTitle"
    class="pa-3"
    outlined
    @keyup.enter="addTask"
    hide-details
    clearable
    placeholder="Add Task"
  >
    <template v-slot:append>
      <v-icon :disabled="invAddTask" @click="addTask"> mdi-plus</v-icon>
    </template></v-text-field
  >
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: '',
    };
  },
  methods: {
    addTask() {
      if (!this.invAddTask) {
        this.$store.dispatch('addTask', this.newTaskTitle);
        this.newTaskTitle = '';
      }
    },
  },
  computed: {
    invAddTask() {
      return !this.newTaskTitle;
    },
  },
};
</script>
