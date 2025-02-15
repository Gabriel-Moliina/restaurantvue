<template lang="html">
  <Toast />
  <section class="src-components-restaurant-view">
    <NavBar />
    <div class="contaier-fluid mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <DataRestaurant />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="js">
import { Toast } from 'primevue';
import { useStore } from 'vuex';
import DataRestaurant from '@/components/restaurant/DataTableRestaurant.vue';
import NavBar from '@/components/navbar/NavBar.vue';

const store = useStore();

if(!store.state.user.id){
  const user = JSON.parse(localStorage.getItem('userInfo'));
  store.commit('setUser', {id: user.id, name: user.name})
}

</script>

<style>
.src-components-restaurant-view {
  height: 100vh;
  background-color: #f2f0ef;
}
</style>
