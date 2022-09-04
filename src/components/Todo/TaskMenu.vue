<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" color="primary">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <DeleteDialog
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    />
    <EditDialog
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit = false"
    />
    <DueDatesDialog
      v-if="dialogs.dueDate"
      :task="task"
      @close="dialogs.dueDate = false"
    />
  </div>
</template>
<script>
import DeleteDialog from '@/components/Todo/Dialogs/DeleteDialog.vue';
import EditDialog from '@/components/Todo/Dialogs/EditDialog.vue';
import DueDatesDialog from '@/components/Todo/Dialogs/DueDatesDialog.vue';

export default {
  props: ['task'],
  data: () => ({
    items: [
      {
        title: 'Edit',
        icon: 'mdi-pencil',
        click() {
          this.dialogs.edit = true;
        },
      },
      {
        title: 'Due Date',
        icon: 'mdi-calendar',
        click() {
          this.dialogs.dueDate = true;
        },
      },
      {
        title: 'Delete',
        icon: 'mdi-delete',
        click() {
          this.dialogs.delete = true;
        },
      },
      {
        title: 'Sort',
        icon: 'mdi-drag-horizontal-variant',
        click() {
          if (!this.$store.state.search) {
            this.$store.commit('toggleSorting');
          } else {
            this.$store.commit(
              'showSnackbar',
              "Please don't try to sort while searching"
            );
          }
        },
      },
    ],
    dialogs: {
      delete: false,
      edit: false,
      dueDate: false,
    },
  }),
  methods: {
    handleClick(i) {
      this.items[i].click.call(this);
    },
  },
  components: {
    DeleteDialog,
    EditDialog,
    DueDatesDialog,
  },
};
</script>

<style></style>
