<template lang="html">
  <section class="src-pages-login-create-view">
    <div class="row justify-content-md-center mb-4">
      <FloatLabel>
        <InputText id="email" type="email" v-model="userData.userName" />
        <label for="email">Email</label>
      </FloatLabel>
    </div>
    <div class="row justify-content-md-center mb-4">
      <FloatLabel>
        <InputText id="password" type="password" v-model="userData.password" />
        <label for="password">Senha</label>
      </FloatLabel>
    </div>
    <div class="row justify-content-md-center mb-4">
      <FloatLabel>
        <InputText id="confirmPassword" type="password" v-model="userData.confirmPassword" />
        <label for="confirmPassword">Confirmar Senha</label>
      </FloatLabel>
    </div>
    <div class="row justify-content-md-center mb-3">
      <Button @click="register()" class="btn-login" label="Confirmar"></Button>
    </div>
    <div class="row justify-content-md-center">
      <Button @click="$router.push('/login')" class="btn-login" label="Voltar"></Button>
    </div>
  </section>

</template>

<script setup lang="js">
import { useUserService } from '@/services/UserService';
import { ref } from 'vue';
import { FloatLabel, InputText, Button } from 'primevue';
import { useToastService } from '@/shared/ToastService';
import { useRouter } from 'vue-router';

const { showToast } = useToastService();
const router = useRouter();
const userService = useUserService();

const userData = ref({
  userName: '',
  password: '',
  confirmPassword: ''
})

const register = () => {
  userService.Create(userData.value.userName, userData.value.password, userData.value.confirmPassword)
    .then(response => {
      router.push({ name: 'login' })
    }).catch(err => {
      showToast('error', "Algo deu errado", err?.response?.data?.messages?.map(x => x.message).join('\n') ?? err)
    });
}


</script>

<style></style>
