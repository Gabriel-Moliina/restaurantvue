<template lang="html">
  <Toast />
  <section class="src-components-home-view">
    <nav class="navbar navbar-expand-lg bg-body-tertiary fs-5">
      <div class="container-fluid">
        <div class="navbar-brand">
          <span class="fs-3 p-2">{{ $store.state.restaurant.name }}</span>
          <i @click="openDialogCreate($route.params.id)" v-if="$store.state.restaurant.id != 0" class="pi pi-pencil" style="font-size: 14px; color: dimgrey;"></i>
        </div>
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
                <li v-for="item in restaurants"><a class="dropdown-item" @click="setRestaurant(item.id)">{{
                  item.name }}</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li @click="openDialogCreate(0)">
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


  <DialogSaveRestaurant 
    :restaurant-id="restaurantId"
    v-model:visible="visibleDialogSaveRestaurant" 
    @close-dialog="visibleDialogSaveRestaurant = false;" 
  />
</template>

<script setup lang="js">

import { useRestaurantService } from '@/services/RestaurantService';
import { Toast } from 'primevue';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import DialogSaveRestaurant from './dialog-create-restaurant/DialogSaveRestaurant.vue';

const restaurants = ref([]);
const router = useRouter();
const route = useRoute();
const store = useStore();
const restaurantService = useRestaurantService();
const visibleDialogSaveRestaurant = ref(false);

const restaurantId = ref(route.params.id);

const setRestaurant = (id) => {
  const restaurant = restaurants.value.find(x => x.id == id);
  store.commit('setStore', { id: restaurant.id, name: restaurant.name })
  router.push({ name: 'restaurant', params: { id } })
}

const getRestaurants = () => {
  restaurantService.Get().then(response => {
    restaurants.value = response.data.data
  }).catch(err => {
    showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
  });
}

const openDialogCreate = (id) => {
  restaurantId.value = id;
  visibleDialogSaveRestaurant.value = true;
}

</script>

<style>
.src-components-home-view {
  height: 100vh;
  background-color: #f2f0ef;
}
</style>
