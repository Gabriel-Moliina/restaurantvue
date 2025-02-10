<template lang="html">

  <section class="src-components-home-view">
    <nav class="navbar navbar-expand-lg bg-body-tertiary fs-5">
      <div class="container-fluid">
        <a class="navbar-brand fs-3" href="#">{{ this.restaurantName }}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Restaurantes
              </a>
              <ul class="dropdown-menu">
                <li v-for="item in restaurants"><a class="dropdown-item" :href="'/home/restaurant/' + item.id"
                    v-on:click="restaurantName = item.name">{{ item.name }}</a></li>
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

</template>

<script lang="js">
import RestaurantApi from '@/api/RestaurantApi';


export default {
  name: 'src-components-home-view',
  props: [],
  mounted() {
    RestaurantApi.Get().then(response => {
      this.restaurants = response.data.data
    })
  },
  data() {
    return {
      restaurantName: 'Selecione um restaurante',
      restaurants: []

    }
  },
  methods: {

  },
  computed: {

  }
}


</script>

<style>
.src-components-home-view{
  height: 100vh;
  background-color: #f2f0ef;
}
</style>
