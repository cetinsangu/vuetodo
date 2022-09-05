<template>
  <div class="about pa-6 justify-center d-flex flex-column align-center mt-3">
    <h1>About {{ $store.state.appTitle }}</h1>
    <p class="mt-2">
      I made this app for educational purposes. Not for anything else.
    </p>
    <a
      class="link-s text-h4"
      href="https://github.com/cetinsangu"
      target="_blank"
      >My Github</a
    >
  </div>
</template>

<style lang="sass" scoped>
.link-s
  text-decoration: none
</style>
