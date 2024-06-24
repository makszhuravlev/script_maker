<template>
  <div id="app">
    <div class="container">
      <div class="sidebar">
        <div class="component">Скрипты</div>
        <div class="script-list">
          <button v-for="(script, index) in scripts" :key="script" @click="setActiveScript(index)">{{ script.name }}</button>
        </div>
      </div>
      <div class="contentt">
        <div class="header">
          <h1>{{ activeScript.name }}</h1>
          <h1>{{ activeScript.purpose }}</h1>
        </div>
        <div class="main">
          <div class="manager-phrase">{{ currentNode ? currentNode.data.label : '' }}</div>
          <div class="client-responses">
            <button v-for="(option, index) in clientOptions" :key="index" @click="selectOption(option)">{{ option.data.label }}</button>
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
import axios from 'axios';
import {useRouter,useRoute } from 'vue-router'
import { ref } from 'vue'
export default {
  data() {
    return {
      scripts: [],
      activeScriptIndex: 0, 
      nodes: {},
      edges: [],
      currentNode: null,
      graphData: {
        nodes: [],
        links: [],
      },
    };
  },
  created() {
    axios.get('http://88.84.211.248:5000/getall') .then(response => { 
      this.scripts = response.data
    })
    this.loadDialogData();
  },
  computed: {
    activeScript() {
      
      console.log(this.scripts)
      return this.scripts[this.activeScriptIndex];
    },
    clientOptions() {
      if (!this.currentNode) return [];
      return this.edges
        .filter(edge => edge.source === this.currentNode.id)
        .map(edge => this.nodes[edge.target])
        .filter(node => node.type === 'default');
    },
  },
  methods: {
    setActiveScript(index) {
      const router = useRouter()
      const route = useRoute()
      router.push({ path: '/reader/'+this.scripts[index].id })
      this.activeScriptIndex = index;
      this.loadDialogData()
    },
    
    loadDialogData() {
      const route = useRoute();
      const IdScript = route.params.id;
      const data = ref([])
      axios.get('http://88.84.211.248:5000/getall') .then(response => { 
        for (var key in response.data) {
          if(response.data[key].id == IdScript){
            data.value = JSON.parse(response.data[key].json)
          }
        }


      // Инициализация узлов и рёбер
      this.nodes = data.value.nodes.reduce((acc, node) => {
        acc[node.id] = { ...node, edges: [] };
        return acc;
      }, {});

      this.edges = data.value.edges;

      data.value.edges.forEach(edge => {
        if (this.nodes[edge.source]) {
          this.nodes[edge.source].edges.push(edge);
        }
      });

      this.graphData.nodes = data.value.nodes.map(node => ({
        id: node.id,
        data: node.data,
        type: node.type,
      }));

      this.graphData.links = data.value.edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        label: edge.label,
      }));
      const nodesWithIncomingEdges = new Set(this.edges.map(edge => edge.target));
      const initialNode = this.graphData.nodes.find(node => !nodesWithIncomingEdges.has(node.id));

      this.currentNode = initialNode ? this.nodes[initialNode.id] : null;
        })
    },
    selectOption(option) {
      const nextManagerNode = this.edges
        .filter(edge => edge.source === option.id)
        .map(edge => this.nodes[edge.target])
        .find(node => node.type === 'custom');

      if (nextManagerNode) {
        this.currentNode = nextManagerNode;
      } else {
        this.currentNode = null;
      }

      // Отладочные сообщения
      console.log("Selected Option:", option);
      console.log("Next Manager Node:", nextManagerNode);
      console.log("Current Node:", this.currentNode);
    },
  },
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

.contentt {
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


</style>


<script>
</script>

<style scoped>
.dialog {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.button-container {
  margin: 5px 0;
}

.graph {
  margin-top: 20px;
}

.node {
  margin: 10px 0;
}

.link {
  margin-left: 20px;
  font-size: 0.9em;
  color: gray;
}
</style>
