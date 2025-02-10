<template lang="html">

  <section class="src-pages-login-base-view d-flex align-items-center justify-content-center">
    <div class="box-login border border-1 rounded-5 align-content-center">
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </div>
  </section>

</template>

<script lang="js">

export default {
  name: 'src-pages-login-base-view',
  props: [],
  mounted() {

  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  }
}


</script>

<style>
.src-pages-login-base-view {
  width: 100vw;
  height: 100vh;
  background-color: #fffcf4;
}

.box-login {
  width: 40vw;
  height: 60vh;
  background-color: white;
}
.input-login {
  width: 50%;
}

.btn-login {
  width: 150px;
}
</style>
