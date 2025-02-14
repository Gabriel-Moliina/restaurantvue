<template lang="html">
  <Toast />
  <section class="src-components-home-view">
    <NavBar />
    <router-view></router-view>
  </section>
</template>

<script setup lang="js">

import { Toast } from 'primevue';
import NavBar from '@/components/navbar/NavBar.vue';
import { useStore } from 'vuex';

const store = useStore();
if(!store.state.user.id){
  const user = JSON.parse(localStorage.getItem('userInfo'));
  store.commit('setUser', {id: user.id, name: user.name})
}
</script>

<style>
.src-components-home-view {
  height: 100vh;
  background-color: #f2f0ef;
}
</style>
