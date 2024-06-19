<script setup>
import { ref } from 'vue'
const da = ref(["продажи","sadasdasdas",3,34343])
const name = ref("Вася  Пупуин")
    function getname(){
     
      //скрипт полусения имени из бд
    }
    function exit() {
      alert('Выход');
    }
    function runScript(i) {
      
      alert('Запуск скрипта ' + i);
    }
    function create(i) {
      
      alert('создание скрипта');
    }

</script>



<template>
  <div id="app">
    <div class="header">
      <h1>{{ name }}</h1>
      <div class="button-container">
        <button class="create-button" @click="create">Новый скрипт</button>
        <button class="logout-button" @click="exit">Выход</button>
      </div>
    </div>
    <div class="content">
      <div class="button-list">
        <button class="script-button" v-for="(item, index) in da" @click="runScript(item)">Скрипт {{ item }}</button>
      </div>
    </div>
  </div>
</template> 



<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}
body, html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: #D9D9D9;
  height: 100%;
  width: 100%;
  overflow: hidden; 
}


#app {
  
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.header {
  background-color: #199aec;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}

.header h1 {
  margin: 0;
  font-size: 36px;
}

.button-container {
  display: flex;
  gap: 10px; 
}

.logout-button {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
}

.create-button {
  background-color: #7fdb55c3;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
}

.content {
  display: flex;
  justify-content: flex-start; 
  align-items: flex-start;
  position: absolute;
  top: 80px; 
  left: 0; 
  box-sizing: border-box;
  padding: 80px 20px 20px 20px; 
}

.button-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
}

.script-button {
  background-color: #199aec;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
  width: 200px; 
  text-align: center;
}


</style>
