<template>
    <div id="app">
      <div class="container">
        <div class="sidebar">
          <div class="component">Скрипты</div>
          <div class="script-list">
            <button v-for="(script, index) in scripts" :key="script" @click="setActiveScript(index)">{{ script.name }}</button>
          </div>
        </div>
        <div class="content">
          <div class="header">
            <h1>{{ activeScript.name }}</h1>
            <h1>Цель скрипта</h1>
          </div>
          <div class="main">
            <div class="manager-phrase">{{ activeScript.managerPhrase }}</div>
            <div class="client-responses">
              <button v-for="(response, index) in activeScript.clientResponses" :key="index">{{ response }}</button>
            </div>
            <div class="actions">
              <button class="end-conversation">Разговор окончен</button>
              <button class="no-answer">Нет нужного ответа</button>
              <button class="next-block">Перейти к следующему блоку</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
    data() {
      return {
        scripts: [
          { 
            name: "Скрипт 1",
            managerPhrase: "Фраза менеджера 1",
            clientResponses: ["Ответ клиента 1.1", "Ответ клиента 1.2", "Ответ клиента 1.3"]
          },
          { 
            name: "Скрипт 2",
            managerPhrase: "Фраза менеджера 2",
            clientResponses: ["Ответ клиента 2.1", "Ответ клиента 2.2", "Ответ клиента 2.3"]
          },
          { 
            name: "Скрипт 3",
            managerPhrase: "Фраза менеджера 3",
            clientResponses: ["Ответ клиента 3.1", "Ответ клиента 3.2", "Ответ клиента 3.3"]
          },
          { 
            name: "Скрипт 4",
            managerPhrase: "Фраза менеджера 4",
            clientResponses: ["Ответ клиента 4.1", "Ответ клиента 4.2", "Ответ клиента 4.3"]
          },
          { 
            name: "Скрипт 5",
            managerPhrase: "Фраза менеджера 5",
            clientResponses: ["Ответ клиента 5.1", "Ответ клиента 5.2", "Ответ клиента 5.3"]
          },
          { 
            name: "Скрипт 6",
            managerPhrase: "Фраза менеджера 6",
            clientResponses: [ "Ответ клиента 6.2", "Ответ клиента 6.3"]
          },
          { 
            name: "Скрипт 7",
            managerPhrase: "Фраза менеджера 7",
            clientResponses: ["Ответ клиента 7.1", "Ответ клиента 7.2", "Ответ клиента 7.3"]
          },
          { 
            name: "Скрипт 8",
            managerPhrase: "Фраза менеджера 8",
            clientResponses: ["Ответ клиента 8.1", "Ответ клиента 8.2", "Ответ клиента 8.3"]
          }
        ],
        activeScriptIndex: 0
      };
    },
    computed: {
      activeScript() {
        return this.scripts[this.activeScriptIndex];
      }
    },
    methods: {
      setActiveScript(index) {
        this.activeScriptIndex = index;
      }
    }
  };
  </script>
  <style>
  body, html, #app {
    margin: 0;
    font-family: Arial, sans-serif;
    height: 100%;
  }
  
  .container {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 20%;
    background-color: #199aec;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  
  .component {
    margin-bottom: 20px;
  }
  
  .script-list {
    width: 100%;
  }
  
  .script-list button {
    width: 100%;
    padding: 10px;
    border: 2px solid black;
    margin-bottom: 5px;

    border-radius: 10px;
    background-color: #5e5e5e;
    color: white;
    cursor: pointer;
  }
  
  .script-list button:hover {
    background-color: #199aec;
  }
  
  .content {
    width: 80%;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
  }
  
  .main {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  
  .manager-phrase {
    color: #3e3e3e;
    padding: 20px;
    flex: 1 0 100%;
    margin-bottom: 20px;
  }
  
  .client-responses {
    display: flex;
    gap: 20px;
    flex: 1 0 100%;
    margin-bottom: 20px;
  }
  
  .client-responses button {
    border: 2px solid black;
    border-radius:10px; 
    flex: 1;
    padding: 20px;
    background-color: #ccc;
    cursor: pointer;
  }
  
  .actions {
    display: flex;
    gap: 20px;
    flex: 1 0 100%;
    margin-bottom: 20px;
  }
  
  .actions .end-conversation,
  .actions .no-answer {
    border-radius:15px; 
    height: 100px;
    width: 100px;
    cursor: pointer;
    background-color: #e57373;
    color: white;
  }
  
  .actions .next-block {
    border-radius:15px; 
    background-color: #7ca37c;
    color: white;
    cursor: pointer;
    margin-left: auto;
  }
  
  .method-block {
    background-color: #8473c1;
    flex: 1 0 100%;
    padding: 20px;
  }
  </style>
  