<template>
    <div class="login-container">
      <h2>Авторизация</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Логин</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button class="submit-button"type="submit">Войти</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      handleSubmit() {
        console.log('Username:', this.username);
        console.log('Password:', this.password);
      },
    },
  };
  </script>
  
<style scoped>

  </style>