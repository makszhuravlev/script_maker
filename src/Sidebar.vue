<script setup>
import useDragAndDrop from './useDnD.js'
import { ref } from 'vue'

const inputValue = ref('')
const { onDragStart } = useDragAndDrop()
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>
    
    <div class="nodes">
      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default')">Фраза клиента</div>
      <div class="custom-node" :draggable="true" @dragstart="onDragStart($event, 'custom')">Фраза менеджера</div>
    </div>
  </aside>
</template>
