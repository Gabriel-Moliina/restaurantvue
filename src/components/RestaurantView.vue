<template lang="html">
  <div class="contaier-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <DataRestaurant />
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
import DataRestaurant from './DataRestaurant.vue';

export default {
  name: 'src-components-restaurant-view',
  props: [],
  components: {
    DataRestaurant
  },
  mounted() {
  },
  data() {
    return {
      tables: [],
    }
  },
  methods: {

  },
  computed: {

  }
}


</script>

<style></style>
