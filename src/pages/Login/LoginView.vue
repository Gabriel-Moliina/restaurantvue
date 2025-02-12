<template lang="html">

  <section class="src-pages-login-view">
    <div class="row justify-content-md-center mb-4">
      <div class="col-md-12">
        <FloatLabel>
          <InputText id="email" type="email" v-model="userName" />
          <label for="email">Email</label>
        </FloatLabel>
      </div>
    </div>
    <div class="row justify-content-md-center mb-4">
      <FloatLabel>
        <InputText id="password" type="password" v-model="password" />
        <label for="password">Senha</label>
      </FloatLabel>
    </div>
    <div class="row justify-content-md-center mb-3">
      <Button @click="login" label="Login" class="btn-login"></Button>
    </div>
    <div class="row justify-content-md-center">
      <Button @click="$router.push({name: 'loginCreate'})" class="btn-login" label="Cadastrar"></Button>
    </div>
  </section>

</template>

<script setup lang="js">

import UserService, { useUserService } from '@/services/UserService';
import { InputText, Button, FloatLabel } from 'primevue';
import { ref } from 'vue';
import { useToastService } from '@/shared/ToastService';
import { useRouter } from 'vue-router';

const userService = useUserService();
const router = useRouter();
const userName = ref('')
const password = ref('')
const { showToast } = useToastService();

const login = () => {
  userService.Login(userName.value, password.value)
    .then(response => {
      localStorage.setItem("token", response.data.data.token);
      router.push({ name: 'home' })
    }).catch(err => {
      showToast('error', "Algo deu errado", err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
    });
}


</script>