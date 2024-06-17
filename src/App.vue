<script setup>
import { ref } from 'vue'
import {Panel, VueFlow, useVueFlow} from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './Sidebar.vue'
import useDragAndDrop from './useDnD.js'
import CustomNode from './CustomNode.vue'

import Icon from './Icon.vue'

const flowKey = 'vue-flow--save-restore'
const { onConnect, addEdges, onNodeClick, updateNode, toObject, fromObject} = useVueFlow()

const message = ref('')
const description = ref('')
const id = ref(0)

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref<Node>([])
const edges = ref([])
onConnect(addEdges)

onNodeClick((event) => {
  message.value = event.node.data.label
  id.value = event.node.id
  description.value = event.node.data.description
  console.log(event.node.data)
})

function handleUpdate() {
  updateNode(id.value, { data: { label: message.value, description: description.value }})
}


function onSave() {
  localStorage.setItem(flowKey, JSON.stringify(toObject()))
  console.log(JSON.stringify(toObject()))
}

function onRestore() {
  const flow = JSON.parse(localStorage.getItem(flowKey))

  if (flow) {
    fromObject(flow)
  }
}
</script>

<template>
  
  <div class="dnd-flow" @drop="onDrop">
    
    <Sidebar />
    <VueFlow v-model:nodes="nodes" :nodes="nodes" :edges="edges"  @dragover="onDragOver" @dragleave="onDragLeave">
      <MiniMap />
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      >

        <p v-if="isDragOver">Drop here</p>
        
      </DropzoneBackground>
      
      <Panel position="top-right">  
        <label for="label">Название:<textarea id="label"  v-model="message" @input="handleUpdate" ></textarea></label>
        <label for="description">Описание:<textarea id="description"  v-model="description" @input="handleUpdate" ></textarea></label>
        <div class="buttons">
          <button title="save graph" @click="onSave">
            <Icon name="save" />
          </button>
          <button title="restore graph" @click="onRestore">
            <Icon name="restore" />
          </button>
        </div>
      </Panel>
      <template #node-custom="nodeProps">
        <CustomNode v-bind="nodeProps" />
      </template>
    </VueFlow>

    
  </div>
</template>
