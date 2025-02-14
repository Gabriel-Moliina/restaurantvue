<template lang="html">
  <Toast />
  <section class="src-pages-login-base-view d-flex align-items-center justify-content-center">
    <div class="box-login border border-1 rounded-5 align-content-center">
      <div class="container-fluid align-content-center">
        <router-view></router-view>
      </div>
    </div>
  </section>

</template>

<script setup lang="js">
import { Toast } from 'primevue';


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
.btn-login {
  width: 150px;
}
</style>
