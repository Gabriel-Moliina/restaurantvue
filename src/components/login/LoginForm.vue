<template lang="html">

  <section class="src-pages-login-view">
    <form @submit.prevent="login">
      <div class="row justify-content-md-center mb-4">
        <span class="fs-3 mb-3">Login</span>
        <div class="col-md-7 mb-4">
          <FloatLabel>
            <InputText id="email" type="email" v-model="userName" fluid />
            <label for="email">Email</label>
          </FloatLabel>
        </div>
        <div class="col-md-7 mb-4">
          <FloatLabel>
            <InputText id="password" type="password" v-model="password" fluid />
            <label for="password">Senha</label>
          </FloatLabel>
        </div>
        <div class="row justify-content-md-center mb-3">
          <Button type="submit" label="Login" class="btn-login"></Button>
        </div>
        <div class="row justify-content-md-center">
          <Button @click="$router.push({ name: 'loginCreate' })" class="btn-login" label="Cadastrar"></Button>
        </div>
      </div>
    </form>
  </section>

</template>

<script setup lang="js">

import { useAuthenticationService } from '@/services/authentication/AuthenticationService';
import { InputText, Button, FloatLabel } from 'primevue';
import { ref } from 'vue';

const userName = ref('')
const password = ref('')
const authenticationService = useAuthenticationService();

const login = () => {
  authenticationService.Login(userName.value, password.value);
}


</script>