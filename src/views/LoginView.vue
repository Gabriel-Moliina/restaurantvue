<template lang="html">

  <section class="src-views-login d-flex align-items-center justify-content-center">
    <div class="d-flex align-items-center justify-content-center box-login border border-1 rounded-5">
      <div class="container">
        <div class="row justify-content-md-center mb-3">
          <input type="text" class="form-control input-login" placeholder="Email" aria-label="Username" v-model="userName">
        </div>
        <div class="row justify-content-md-center mb-3">
          <input type="text" class="form-control input-login" placeholder="Senha" aria-label="Senha" v-model="password">
        </div>
        <div class="row justify-content-md-center">
          <button v-on:click="login" id="btn-login" type="submit" class="btn btn-success">Success</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

import axios from 'axios';

export default {
  name: 'src-views-login',
  props: [],
  mounted() {
    
  },
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    login(){
      axios
        .post("http://localhost:5142/api/User/Login", {Email: 'molina@molina.com', Password: 'Molina123'})
        .then(response => {
          sessionStorage.setItem("token", response.data.data.token);
        }).catch(reseponse =>{
          
        })
    }
  },
  computed: {

  }
}


</script>

<style>
.src-views-login {
  width: 100vw;
  height: 100vh;
  background-color: #fffcf4;
}

.box-login {
  width: 30%;
  height: 50%;
  background-color: white;
}

.input-login {
  width: 50%;
}

#btn-login{
  width: 150px;
}
</style>
