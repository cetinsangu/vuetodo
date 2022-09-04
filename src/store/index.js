import Vue from 'vue';
import Vuex from 'vuex';
import Localbase from 'localbase';

let db = new Localbase('db');
db.config.debug = false;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: null,
    appTitle: process.env.VUE_APP_TITLE,
    tasks: [
      // {
      //   id: 1,
      //   title: 'Watch John Smilga React les. 141',
      //   done: false,
      //   dueDate: '2020-10-16',
      // },
      // {
      //   id: 2,
      //   title: 'Read at least 30 pages',
      //   done: false,
      //   dueDate: '2020-10-20',
      // },
      // {
      //   id: 3,
      //   title: 'Make a todo app :d',
      //   done: false,
      //   dueDate: null,
      // },
    ],
    snackbar: {
      show: false,
      text: '',
    },
    sort: false,
  },
  getters: {
    filteredTasks(state) {
      if (!state.search) {
        return state.tasks;
      }
      return state.tasks.filter((task) =>
        task.title.toLowerCase().includes(state.search.toLowerCase())
      );
    },
  },
  mutations: {
    setSearch(state, value) {
      state.search = value;
    },
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateDueDate(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    toggleSorting(state) {
      state.sort = !state.sort;
    },
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      db.collection('tasks')
        .add(newTask)
        .then(() => {
          commit('addTask', newTask);
          commit('showSnackbar', 'Task Added!');
        });
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];
      db.collection('tasks')
        .doc({ id })
        .update({ done: !task.done })
        .then(() => {
          commit('doneTask', id);
        });
    },
    deleteTask({ commit }, id) {
      db.collection('tasks')
        .doc({ id })
        .delete()
        .then(() => {
          commit('deleteTask', id);
          commit('showSnackbar', 'Task Deleted');
        });
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks')
        .doc({ id: payload.id })
        .update({ title: payload.title })
        .then(() => {
          commit('updateTaskTitle', payload);
          commit('showSnackbar', 'Task updated!');
        });
    },
    updateDueDate({ commit }, payload) {
      db.collection('tasks')
        .doc({ id: payload.id })
        .update({ dueDate: payload.dueDate })
        .then(() => {
          commit('updateDueDate', payload);
          commit('showSnackbar', 'Due Dates updated!');
        });
    },
    updateTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks);
      commit('updateTasks', tasks);
    },
    getTasks({ commit }) {
      db.collection('tasks')
        .get()
        .then((tasks) => {
          commit('updateTasks', tasks);
        });
    },
  },
  modules: {},
});
