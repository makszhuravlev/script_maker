<script setup>
import useDragAndDrop from './useDnD.js'
import { ref } from 'vue'

const inputValue = ref('')
const { onDragStart } = useDragAndDrop()
</script>

<template>
  <aside>
    <div class="description">Элементы:</div>
    
    <div class="nodes">
      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default')">Фраза клиента</div>
      <div class="custom-node" :draggable="true" @dragstart="onDragStart($event, 'custom')">Фраза менеджера</div>
    </div>
  </aside>
</template>

<style scoped>
.vue-flow__node-default{
  padding: 10px;
  border-radius: 3px;
  width: 90%;
  font-size: 12px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  color: var(--vf-node-text);
  background-color: var(--vf-node-bg);
  border-color: var(--vf-node-color);
}
.custom-node {
  padding: 10px;
  border-radius: 300px;
  width: 90%;
  font-size: 12px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  color: var(--vf-node-text);
  background-color: var(--vf-node-bg);
  border-color: var(--vf-node-color);
}
</style>