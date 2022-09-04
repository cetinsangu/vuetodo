<template>
  <v-dialog persistent :value="true" max-width="290">
    <v-card>
      <v-card-title class="text-h5">Edit Task</v-card-title>
      <v-card-text
        >Edit the title of the task:
        <v-text-field v-model="taskTitle" @keyup.enter="saveTask" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="$emit('close')">
          Cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="saveTask"
          :disabled="invTaskTitle"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      taskTitle: null,
    };
  },
  computed: {
    invTaskTitle() {
      return !this.taskTitle || this.taskTitle === this.task.title;
    },
  },
  mounted() {
    this.taskTitle = this.task.title;
  },
  methods: {
    saveTask() {
      if (!this.invTaskTitle) {
        let payload = {
          id: this.task.id,
          title: this.taskTitle,
        };
        this.$store.dispatch('updateTaskTitle', payload);
        this.$emit('close');
      }
    },
  },
};
</script>

<style></style>
