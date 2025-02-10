<template lang="html">

  <section class="src-pages-login-view">
    <div class="row justify-content-md-center mb-3">
      <input type="text" class="form-control input-login" placeholder="Email" aria-label="Username" v-model="userName">
    </div>
    <div class="row justify-content-md-center mb-3">
      <input type="password" class="form-control input-login" placeholder="Senha" aria-label="Senha" v-model="password">
    </div>
    <div class="row justify-content-md-center mb-3">
      <button v-on:click="login" type="submit" class="btn btn-success btn-login">Login</button>
    </div>
    <div class="row justify-content-md-center">
      <RouterLink to="/login/create"><button
          class="btn btn-success btn-login">Cadastrar</button></RouterLink>
    </div>
  </section>

</template>

<script lang="js">

import UserApi from '@/api/UserApi';
import { RouterLink } from 'vue-router';

export default {
  name: 'src-views-login',
  props: [],
  mounted() {

  },
  data() {
    return {
      userName: 'molina@molina.com',
      password: 'Molina123'
    }
  },
  methods: {
    login() {
      UserApi.Login(this.userName, this.password)
        .then(response => {
          console.log(response)
          sessionStorage.setItem("token", response.data.data.token);
          this.$router.push('/home')
        }).catch(reseponse => {

        })
    }
  },
  computed: {

  }
}


</script>

<style>

</style>
