<template>
  <div id="app">
   <MenuBar/>
  <router-view></router-view>
  </div>
  
</template>

<script>

import MenuBar from './components/menubar'
import Welcome from '../Views/Dashboard.vue'



export default {
  name: 'App',
  components: {
    MenuBar,
  }
}
</script>

<style lang="scss" scoped>
#app{

}
</style>
