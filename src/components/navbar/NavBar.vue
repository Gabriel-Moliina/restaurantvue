<template>
  <div class="card">
    <Menubar :model="itensNavBar" style="z-index: 2;">
      <template #end>
        <Button @click="logOut" label="Sair" severity="danger" />
      </template>
    </Menubar>
  </div>
  <DialogSaveRestaurant :restaurant-id="restaurantId" v-model:visible="visibleDialogSaveRestaurant"
    @close-dialog="closeDialogSaveRestaurant" />

  <DialogDeleteRestaurant :restaurant-id="restaurantId" v-model:visible="visibleDialogDeleteRestaurant"
    @close-dialog="closeDialogDeleteRestaurant" />
</template>

<script setup lang="js">

import DialogSaveRestaurant from '../dialog-create-restaurant/DialogSaveRestaurant.vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useRestaurantService } from '@/services/api/RestaurantService';
import { computed, onMounted, ref } from 'vue'
import { useAuthenticationService } from '@/services/authentication/AuthenticationService';
import { Menubar, Button } from 'primevue';
import DialogDeleteRestaurant from '../dialog-delete-restaurant/DialogDeleteRestaurant.vue';

const route = useRoute();
const visibleDialogSaveRestaurant = ref(false);
const visibleDialogDeleteRestaurant = ref(false);
const store = useStore();
const restaurantId = ref(0);
const restaurants = ref([]);
const router = useRouter();
const restaurantService = useRestaurantService();
const authenticationService = useAuthenticationService();

const itensNavBar = computed(() => {
  const baseItens = [{
    label: store.state.restaurant.name,
    command() {
      if (store.state.restaurant.id)
        router.push({ name: 'restaurant', params: { id: store.state.restaurant.id } })
    },
    style: {
      fontSize: '28px',
      'min-width': '250px'
    }
  },
  {
    label: 'Restaurantes',
    icon: 'pi pi-list',
    style: {
      fontSize: '17px'
    },
    items: restaurants.value.map(x => ({
      label: x.name,
      items: [
        {
          label: 'Selecionar',
          icon: 'pi pi-angle-right',
          command() {
            setRestaurant(x.id)
          },
        },
        {
          label: 'Editar',
          icon: 'pi pi-pencil',
          command() {
            openDialogSave(x.id)
          },
        },
        {
          label: 'Excluir',
          icon: 'pi pi-times',
          command() {
            openDialogDelete(x.id)
          }
        }
      ]
    }))
  }]

  baseItens[1].items.push({
    separator: true
  }, {
    label: 'Adicionar',
    icon: 'pi pi-plus',
    command() {
      openDialogSave(0)
    }
  }
  )
  return baseItens;
})

const setRestaurant = (id) => {
  if(!restaurants.value.some(x => x.id == id)) return;
  
  const restaurant = { id, name: restaurants.value.find(x => x.id == id).name };
  
  store.commit('setRestaurant', restaurant)
  localStorage.setItem('restaurant', JSON.stringify(restaurant))

  router.push({ name: 'restaurant', params: { id } })
}

const getRestaurants = () => {
  restaurantService.GetByUserId()
    .then(response => {
      restaurants.value = response.data.data;
      setRestaurant(route.params.id);
    }).catch(err => { });
}

const openDialogSave = (id) => {
  restaurantId.value = id;
  visibleDialogSaveRestaurant.value = true;
}

const closeDialogSaveRestaurant = () => {
  getRestaurants();
  visibleDialogSaveRestaurant.value = false;
}

const openDialogDelete = (id) => {
  restaurantId.value = id;
  visibleDialogDeleteRestaurant.value = true;
}

const closeDialogDeleteRestaurant = () => {
  getRestaurants();
  visibleDialogDeleteRestaurant.value = false;
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