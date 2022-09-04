<template>
  <div class="home">
    <ListTasks v-if="$store.state.tasks.length" />
    <NoTasks v-else />
    <FinishSortingButton v-if="$store.state.sort" />
  </div>
</template>
<script>
import AddTaskInput from '@/components/Todo/AddTaskInput.vue';
import ListTasks from '@/components/Todo/ListTasks.vue';
import NoTasks from '@/components/Todo/NoTasks.vue';
import FinishSortingButton from '@/components/Todo/FinishSortingButton.vue';
export default {
  name: 'Home',

  components: {
    AddTaskInput,
    ListTasks,
    NoTasks,
    FinishSortingButton,
  },
};
</script>
