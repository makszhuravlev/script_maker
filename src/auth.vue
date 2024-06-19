<template>
    <div class="all">

      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
        <h2>Авторизация</h2>
          <label for="username">Логин</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div class="form-gr
        oup">
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
html{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.all {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #199aec;
  background-size: cover;
  background-position: center;
}




.registration-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border: 2px solid #000000;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.registration-form:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

h2 {
  color: #ffffff;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus {
  border-color: #000000;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.25);
}

.submit-button {
  width: 110%;
  padding: 15px;
  background: linear-gradient(135deg, #000000, #000000);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background: linear-gradient(135deg, #ffffff, #ffffff);
  color: #000000;
  transform: translateY(-2px);
}


  </style>