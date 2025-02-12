<template lang="html">
  <Toast />
  <section class="src-components-home-view">
    <nav class="navbar navbar-expand-lg bg-body-tertiary fs-5">
      <div class="container-fluid">
        <span class="navbar-brand fs-3" href="#">{{ $store.state.restaurant.name }}</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li @click="getRestaurants" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Restaurantes
              </a>
              <ul class="dropdown-menu">
                <li v-on:mouseover="console.log(item.id)" v-for="item in restaurants"><a class="dropdown-item" @click="setRestaurant(item.id)">{{
                  item.name }}</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li @click="visibleDialogRestaurantCreate = true">
                  <a class="dropdown-item text-center" href="#">
                    <i class="pi pi-plus"></i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <router-link to="/login"><button class="btn btn-outline-danger">Sair</button></router-link>
          </form>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </section>


  <DialogCreateRestaurant 
    v-model:visible="visibleDialogRestaurantCreate"
    @close-dialog="closeDialog"
    />
</template>

<script setup lang="js">

import { useRestaurantService } from '@/services/RestaurantService';
import { Toast } from 'primevue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import DialogCreateRestaurant from './dialog-create-restaurant/DialogCreateRestaurant.vue';

const restaurants = ref([]);
const router = useRouter();
const store = useStore();
const restaurantService = useRestaurantService();
const visibleDialogRestaurantCreate = ref(false);

const setRestaurant = (id) => {
  store.commit('storeNameRestaurant', restaurants.value.find(x => x.id == id).name)
  router.push({ name: 'restaurant', params: { id } })
}

const getRestaurants = () => {
  restaurantService.Get().then(response => {
    restaurants.value = response.data.data
  })
}

const closeDialog = () => {
  visibleDialogRestaurantCreate.value = false;
}

</script>

<style>
.src-components-home-view {
  height: 100vh;
  background-color: #f2f0ef;
}
</style>
