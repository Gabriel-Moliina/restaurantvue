<template>
  <div class="card">
    <Menubar :model="itensNavBar" />
  </div>
  <!-- <nav class="navbar navbar-expand-lg bg-body-tertiary fs-5">
    <div class="container-fluid">
      <div class="navbar-brand">
        <span class="fs-3 p-2">{{ $store.state.restaurant.name }}</span>
        <i @click="openDialogCreate($route.params.id)" v-if="$store.state.restaurant.id != 0" class="pi pi-pencil"
          style="font-size: 14px; color: dimgrey;"></i>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
          <button @click="logOut" class="btn btn-outline-danger">Sair</button>
        </form>
      </div>
    </div>
  </nav> -->

  <DialogSaveRestaurant :restaurant-id="restaurantId" v-model:visible="visibleDialogSaveRestaurant"
    @close-dialog="closeDialogSaveRestaurant" />
</template>

<script setup lang="js">

import DialogSaveRestaurant from '../dialog-create-restaurant/DialogSaveRestaurant.vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useRestaurantService } from '@/services/api/RestaurantService';
import { onMounted, ref } from 'vue'
import { useToastService } from '@/shared/ToastService';
import { useAuthenticationService } from '@/services/authentication/AuthenticationService';
import { Menubar } from 'primevue';

const route = useRoute();
const visibleDialogSaveRestaurant = ref(false);
const restaurantId = ref(route.params.id);
const restaurants = ref([]);
const router = useRouter();
const store = useStore();
const restaurantService = useRestaurantService();
const authenticationService = useAuthenticationService();
const { showToast } = useToastService();

const itensNavBar = ref([
  {
    label: 'Home',
    style:{
      fontSize: '32px'
    }
  },
  {
    label: 'Restaurantes',
    icon: 'pi pi-star'
  }
])

const setRestaurant = (id) => {
  const restaurant = { id, name: restaurants.value.find(x => x.id == id).name };

  store.commit('setRestaurant', restaurant)
  localStorage.setItem('restaurant', JSON.stringify(restaurant))

  router.push({ name: 'restaurant', params: { id } })
}

const getRestaurants = () => {
  restaurantService.GetByUserId(store.state.user.id).then(response => {
    restaurants.value = response.data.data
  }).catch(err => {
    showToast('error', 'Algo deu errado', err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
  });
}

const openDialogCreate = (id) => {
  restaurantId.value = id;
  visibleDialogSaveRestaurant.value = true;
}

const closeDialogSaveRestaurant = () => {
  getRestaurants();
  visibleDialogSaveRestaurant = false;
}

const logOut = () => {
  authenticationService.LogOut();
}

onMounted(() => {
  getRestaurants();


  const restaurant = JSON.parse(localStorage.getItem('restaurant'));
  if (restaurant)
    store.commit('setRestaurant', { id: restaurant.id, name: restaurant.name })
})

</script>

<style scoped></style>