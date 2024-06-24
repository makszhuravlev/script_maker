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
          <h1>Цель скрипта</h1>
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
export default {
  data() {
    return {
      scripts: [
        { 
          name: "Скрипт 1",
          managerPhrase: "Фраза менеджера 1",
          clientResponses: ["Ответ клиента 1.1", "Ответ клиента 1.2", "Ответ клиента 1.3"]
        },
        // Add more scripts if needed
      ],
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
    this.loadDialogData();
  },
  computed: {
    activeScript() {
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
      this.activeScriptIndex = index;
      this.loadDialogData();  // Reload dialog data when a new script is selected
    },
    
    loadDialogData() {
      const data = {
        "nodes": [
          {"id":"2","type":"default","position":{"x":266.5,"y":143.8},"data":{"label":"Пошел в попу","description":""}},
          {"id":"3","type":"default","position":{"x":645.5,"y":143.8},"data":{"label":"Здравствуйте","description":""}},
          {"id":"4","type":"custom","position":{"x":397.5,"y":263.8},"data":{"label":"Ну ты и лох","description":""}},
          {"id":"5","type":"default","position":{"x":225.5,"y":365.8},"data":{"label":"Ланта лучший сервис","description":""}},
          {"id":"6","type":"default","position":{"x":656.5,"y":369.8},"data":{"label":"Ланта самый лучший сервис","description":""}},
          {"id":"7","type":"custom","position":{"x":530.5,"y":451.8},"data":{"label":"До свидания","description":""}},
          {"id":"8","type":"custom","position":{"x":449.203125,"y":23.799999999999997},"data":{"label":"Фраза менеджера","description":"","dynamicFields":""}}
        ],
        "edges": [
          {"id":"vueflow__edge-3-4a","type":"default","source":"3","target":"4","sourceHandle":null,"targetHandle":"a","data":{},"label":"","sourceX":770.5,"sourceY":182.8,"targetX":533.5,"targetY":259.8},
          {"id":"vueflow__edge-2-4a","type":"default","source":"2","target":"4","sourceHandle":null,"targetHandle":"a","data":{},"label":"","sourceX":391.5,"sourceY":182.8,"targetX":533.5,"targetY":259.8},
          {"id":"vueflow__edge-4b-5","type":"default","source":"4","target":"5","sourceHandle":"b","targetHandle":null,"data":{},"label":"","sourceX":533.5,"sourceY":303.8,"targetX":350.5,"targetY":362.8},
          {"id":"vueflow__edge-4b-6","type":"default","source":"4","target":"6","sourceHandle":"b","targetHandle":null,"data":{},"label":"","sourceX":533.5,"sourceY":303.8,"targetX":781.5,"targetY":366.8},
          {"id":"vueflow__edge-5-7a","type":"default","source":"5","target":"7","sourceHandle":null,"targetHandle":"a","data":{},"label":"","sourceX":350.5,"sourceY":404.8,"targetX":666.5,"targetY":447.8},
          {"id":"vueflow__edge-6-7a","type":"default","source":"6","target":"7","sourceHandle":null,"targetHandle":"a","data":{},"label":"","sourceX":781.5,"sourceY":408.8,"targetX":666.5,"targetY":447.8},
          {"id":"vueflow__edge-8b-2","type":"default","source":"8","target":"2","sourceHandle":"b","targetHandle":null,"data":{},"label":"","sourceX":585.203125,"sourceY":63.8,"targetX":391.5,"targetY":140.8},
          {"id":"vueflow__edge-8b-3","type":"default","source":"8","target":"3","sourceHandle":"b","targetHandle":null,"data":{},"label":"","sourceX":585.203125,"sourceY":63.8,"targetX":770.5,"targetY":140.8}
        ],
        "position":[0,11.200000000000001],
        "zoom":1,
        "viewport":{"x":0,"y":11.200000000000001,"zoom":1}
      };

      // Инициализация узлов и рёбер
      this.nodes = data.nodes.reduce((acc, node) => {
        acc[node.id] = { ...node, edges: [] };
        return acc;
      }, {});

      this.edges = data.edges;

      data.edges.forEach(edge => {
        if (this.nodes[edge.source]) {
          this.nodes[edge.source].edges.push(edge);
        }
      });

      this.graphData.nodes = data.nodes.map(node => ({
        id: node.id,
        data: node.data,
        type: node.type,
      }));

      this.graphData.links = data.edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        label: edge.label,
      }));

      // Определение начального узла (узел без входящих рёбер)
      const nodesWithIncomingEdges = new Set(this.edges.map(edge => edge.target));
      const initialNode = this.graphData.nodes.find(node => !nodesWithIncomingEdges.has(node.id));

      this.currentNode = initialNode ? this.nodes[initialNode.id] : null;

      // Отладочные сообщения
      console.log("Nodes:", this.nodes);
      console.log("Edges:", this.edges);
      console.log("Graph Data:", this.graphData);
      console.log("Current Node:", this.currentNode);
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
