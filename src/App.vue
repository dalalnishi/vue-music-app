<template>
  <div id="app">
    <Header />
    <router-view></router-view>    
  </div>
</template>

<script>
import Header from './components/Header/Header';

export default {
  name: 'App',
  components: {
    Header
  },
}
</script>
<style scoped>
  #app {
    background: #efeff6;
    /* height: 100vh; */
    overflow: auto;
  }
</style>