<template>
  <v-btn
    @click="$store.commit('toggleSorting')"
    color="primary"
    class="button-done"
  >
    Done
  </v-btn>
</template>

<style lang="sass">
.button-done
    position: fixed
    bottom: 20px
    left: 50%
    transform: translateX(-50%)
</style>
