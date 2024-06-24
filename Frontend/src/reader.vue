<template>
  <div id="app" class="container">
    <div class="dialog">
      <div v-if="currentNode" class="card mt-5">
        <div class="card-header">
          <h4 class="text-primary">Менеджер: {{ currentNode.data.label }}</h4>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li v-for="(option, index) in clientOptions" :key="option.id" class="list-group-item">
              <button @click="selectOption(option)" class="btn btn-primary btn-block">
                {{ index + 1 }}. {{ option.data.label }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="alert alert-success mt-5">
        <h4>Диалог завершен</h4>
      </div>
    </div>
    <div class="graph mt-5">
      <h4>Граф Диалога</h4>
      <div v-for="node in graphData.nodes" :key="node.id" class="node">
        <strong>{{ node.data.label }}</strong>
        <div v-for="link in graphData.links.filter(link => link.source === node.id)" :key="link.target" class="link">
          <span v-if="nodes[link.target]">{{ nodes[link.target].data.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    clientOptions() {
      if (!this.currentNode) return [];
      return this.edges
        .filter(edge => edge.source === this.currentNode.id)
        .map(edge => this.nodes[edge.target])
        .filter(node => node.type === 'default');
    },
  },
  methods: {
    loadDialogData() {
      const data = {"nodes":[{"id":"2","type":"default","position":{"x":266.5,"y":143.8},"data":{"label":"Пошел в попу","description":""}},{"id":"3","type":"default","position":{"x":645.5,"y":143.8},"data":{"label":"Здравствуйте","description":""}},{"id":"4","type":"custom","position":{"x":397.5,"y":263.8},"data":{"label":"Ну ты и лох","description":""}},{"id":"5","type":"default","position":{"x":225.5,"y":365.8},"data":{"label":"Ланта лучший сервис","description":""}},{"id":"6","type":"default","position":{"x":656.5,"y":369.8},"data":{"label":"Ланта самый лучший сервис","description":""}},{"id":"7","type":"custom","position":{"x":530.5,"y":451.8},"data":{"label":"До свидания","description":""}},{"id":"8","type":"custom","position":{"x":449.203125,"y":23.799999999999997},"data":{"label":"Фраза менеджера","description":"","dynamicFields":""}}],"edges":[{"id":"vueflow__edge-3-4a","type":"default","source":"3","target":"4","sourceHandle":null,"targetHandle":"a","data":{},"label":"","sourceX":770.5,"sourceY":182.8,"targetX":533.5,"targetY":259.8},{"id":"vueflow__edge-2-4a","type":"default","source":"2","target":"4","sourceHandle":null,"targetHandle":"a","data":{},"label":"","sourceX":391.5,"sourceY":182.8,"targetX":533.5,"targetY":259.8},{"id":"vueflow__edge-4b-5","type":"default","source":"4","target":"5","sourceHandle":"b","targetHandle":null,"data":{},"label":"","sourceX":533.5,"sourceY":303.8,"targetX":350.5,"targetY":362.8},{"id":"vueflow__edge-4b-6","type":"default","source":"4","target":"6","sourceHandle":"b","targetHandle":null,"data":{},"label":"","sourceX":533.5,"sourceY":303.8,"targetX":781.5,"targetY":366.8},{"id":"vueflow__edge-5-7a","type":"default","source":"5","target":"7","sourceHandle":null,"targetHandle":"a","data":{},"label":"","sourceX":350.5,"sourceY":404.8,"targetX":666.5,"targetY":447.8},{"id":"vueflow__edge-6-7a","type":"default","source":"6","target":"7","sourceHandle":null,"targetHandle":"a","data":{},"label":"","sourceX":781.5,"sourceY":408.8,"targetX":666.5,"targetY":447.8},{"id":"vueflow__edge-8b-2","type":"default","source":"8","target":"2","sourceHandle":"b","targetHandle":null,"data":{},"label":"","sourceX":585.203125,"sourceY":63.8,"targetX":391.5,"targetY":140.8},{"id":"vueflow__edge-8b-3","type":"default","source":"8","target":"3","sourceHandle":"b","targetHandle":null,"data":{},"label":"","sourceX":585.203125,"sourceY":63.8,"targetX":770.5,"targetY":140.8}],"position":[0,11.200000000000001],"zoom":1,"viewport":{"x":0,"y":11.200000000000001,"zoom":1}};

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
