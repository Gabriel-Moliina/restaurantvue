<template lang="html">

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
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Restaurantes
              </a>
              <ul class="dropdown-menu">
                <li v-for="item in restaurants"><a class="dropdown-item"
                    v-on:click="setRestaurant(item.id)">{{ item.name }}</a></li>
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
import RestaurantService from '@/services/RestaurantService';


export default {
  name: 'src-components-home-view',
  props: [],
  mounted() {
    RestaurantService.Get().then(response => {
      this.restaurants = response.data.data
    })
  },
  data() {
    return {
      restaurants: []

    }
  },
  methods: {
    setRestaurant(id){
      this.$router.push('/home/restaurant/' + id)
      this.$store.commit('storeNameRestaurant', this.restaurants.find(x => x.id == id).name)
    }
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
