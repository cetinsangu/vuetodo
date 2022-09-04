<template>
  <v-text-field
    class="expanding-search mt-1"
    :class="{ off: searchOff && !$store.state.search }"
    @input="$store.commit('setSearch', $event)"
    @focus="searchOff = false"
    @blur="searchOff = true"
    :value="$store.state.search"
    placeholder="Search"
    :disabled="$store.state.sort"
    filled
    dense
    clearable
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchOff: true,
    };
  },
};
</script>

<style lang="sass">
.expanding-search
    transition: max-width 0.5s
    .v-input__slot
        cursor: pointer !important
        &:before, &:after
            border-color: transparent !important
    &.off
        max-width: 45px
        .v-input__slot
            background: transparent !important
</style>
