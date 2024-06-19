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
html{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #000000;
    background-size: cover;
    background-position: center;
}
.wrapper {
     width: 420px;
     background: transparent;
     color:#ffffff;
     border-radius: 10px;
     padding: 30px 40px;
}
.wrapper h1 {
    font-size: 36px;
    text-align: center;
}
.wrapper .input-box {
    position: relative;
    width: 98%;
    height: 50px;
    margin: 30px 0;
}
.input-box input {
    width: 86%;
    height: 32%;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, .2);
    border-radius: 40px;
    font-size: 16px;
    color: #ffffff;
    padding: 20px 45px 20px 20px;
}
.input-box input::placeholder {
    color: #ffffff;
}
.input-box i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
}
.wrapper .btn {
    width: 100%;
    height: 45px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 16px;
    color: #333;
    font-weight: 600;
}
.wrapper .register-link {
    font-size: 14.5px;
    text-align: center;
    margin: 20px 0 15px;
}
.register-link p a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
}
.register-link p a:hover {
    text-decoration: underline;
}

  </style>