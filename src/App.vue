<template>
  <v-app id="inspire">
    <template>
      <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">
        <v-img
          src="todoheaderimg.jpg"
          height="180"
          class="pa-5 pt-7"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        >
          <v-avatar size="70" class="mb-2">
            <img src="broyles.jpeg" alt="avatar" />
          </v-avatar>
          <div class="white--text text-subtitle-1 font-weight-bold">
            Çetin Sanğu
          </div>
          <div class="white--text text-subtitle-2">littledevone36</div>
        </v-img>

        <v-list dense nav>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>

    <v-app-bar
      app
      color="primary"
      dark
      src="todoheaderimg.jpg"
      :height="$route.path === '/' ? '240' : '180'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-container class="pa-3" fluid>
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <SearchBar />
        </v-row>
        <v-row>
          <div class="ml-4 text-h4">{{ $store.state.appTitle }}</div>
        </v-row>
        <v-row><LiveDateHeader /></v-row>

        <v-row v-if="$route.path === '/'">
          <AddTaskInput />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <SnackBar />
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from '@/components/Global/SnackBar.vue';
import SearchBar from '@/components/Tools/Search.vue';
import LiveDateHeader from '@/components/Tools/LiveDateHeader.vue';
import AddTaskInput from '@/components/Todo/AddTaskInput.vue';

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
    ],
    right: null,
  }),
  components: {
    SnackBar,
    SearchBar,
    LiveDateHeader,
    AddTaskInput,
  },
  mounted() {
    this.$store.dispatch('getTasks');
  },
};
</script>
