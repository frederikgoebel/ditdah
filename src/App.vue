<template>
<MorseWrapper />
</template>

<script>
import MorseWrapper from './components/MorseWrapper.vue'

export default {
  name: 'app',
  components: {
    MorseWrapper
  }
}
</script>

<style>
body,
html {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
