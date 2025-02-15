<template lang="html">
  <section class="src-pages-login-create-view">
    <form @submit.prevent="register">
      <div class="row justify-content-md-center mb-4">
        <span class="fs-3 mb-3">Cadastrar</span>
        <div class="col-md-7 mb-4">
          <FloatLabel>
            <InputText id="email" type="email" v-model="userData.email" fluid />
            <label for="email">Email</label>
          </FloatLabel>
        </div>
        <div class="col-md-7 mb-4">
          <FloatLabel>
            <InputText id="password" type="password" v-model="userData.password" fluid />
            <label for="password">Senha</label>
          </FloatLabel>
        </div>
        <div class="col-md-7 mb-4">
          <FloatLabel>
            <InputText id="confirmPassword" type="password" v-model="userData.confirmPassword" fluid />
            <label for="confirmPassword">Confirmar Senha</label>
          </FloatLabel>
        </div>
      </div>
      <div class="row justify-content-md-center mb-3">
        <Button type="submit" class="btn-login" label="Confirmar"></Button>
      </div>
      <div class="row justify-content-md-center">
        <Button @click="$router.push('/login')" class="btn-login" label="Voltar"></Button>
      </div>
    </form>
  </section>
</template>

<script setup lang="js">
import { useUserService } from '@/services/api/UserService';
import { ref } from 'vue';
import { FloatLabel, InputText, Button } from 'primevue';
import { useToastService } from '@/shared/ToastService';
import { useRouter } from 'vue-router';

const { showToast } = useToastService();
const router = useRouter();
const userService = useUserService();

const userData = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const register = () => {
  const user = {
    email: userData.value.email,
    password: userData.value.password,
    confirmPassword: userData.value.confirmPassword
  }
  userService.Create(user)
    .then(_ => {
      showToast('success', 'Sucesso', 'Usuário cadastrado!')
      router.push({ name: 'login' })
    }).catch(err => { });
}


</script>

<style></style>
