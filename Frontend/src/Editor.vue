<script setup>
import axios from 'axios';
import { ref } from 'vue'
import {Panel, VueFlow, useVueFlow} from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import { useRoute } from "vue-router";
import DropzoneBackground from './DropzoneBackground.vue'
import Sidebar from './Sidebar.vue'
import useDragAndDrop from './useDnD.js'
import CustomNode from './CustomNode.vue'
import Icon from './Icon.vue'
import {useRouter } from 'vue-router'

const flowKey = 'vue-flow--save-restore'
const { onConnect, addEdges, onNodeClick, updateNode, toObject, fromObject} = useVueFlow()
const router = useRouter()

const route = useRoute();
const IdScript = route.params.id;

console.log(IdScript)

const data = ref([])


const message = ref('')
const description = ref('')
const dynamicFields = ref('')
const typeNode = ref()
const id = ref(0)

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref<Node>([])
const edges = ref([])
const ip = '88.84.211.248';
const port = '5000';

axios.get('http://' + ip + ':' + port + '/getall') .then(response => { 
 for (var key in response.data) {
  if(response.data[key].id == IdScript){
  
    fromObject(JSON.parse(response.data[key].json))
  }
 }
})
onConnect(addEdges)

onNodeClick((event) => {
  message.value = event.node.data.label
  id.value = event.node.id
  description.value = event.node.data.description
  dynamicFields.value = event.node.data.dynamicFields
  if(event.node.type === 'custom'){
    typeNode.value = true
  }
  else{
    typeNode.value = false
  }
})

function handleUpdate() {
  updateNode(id.value, { data: { label: message.value, description: description.value , dynamicFields: dynamicFields.value}})
}


function onSave() {
  localStorage.setItem(flowKey, JSON.stringify(toObject()))
  console.log(JSON.stringify(toObject()))
        axios.post("http://" + ip + ':' + port + "/update",
          {
            'id': IdScript,
            'json': JSON.stringify(toObject())
          }
        );

}
function exit(){
  router.push({ path: '/main' })
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
        <p v-show="typeNode">Реплика менеджера</p>
        <p v-show="!typeNode">Реплика клиента</p>
        <label for="label"><textarea id="label"  v-model="message" @input="handleUpdate" class="block block-title" placeholder="Название:"></textarea></label>
        <label for="description"><textarea id="description"  v-model="description" @input="handleUpdate" class="block block-content" placeholder="Описание:"></textarea></label>
        <label v-show="typeNode" for="dynamic"><textarea id="dynamicFields"  v-model="dynamicFields" @input="handleUpdate" class="block block-dynamic-fields" placeholder="Динамические поля:"></textarea></label>
        <div class="buttons">
          <button title="save graph" @click="onSave">
            <Icon name="save" />
          </button>
          <button title="exit" @click="exit">
            <Icon name="exit" />
          </button>
        </div>
      </Panel>
      <template #node-custom="nodeProps">
        <CustomNode v-bind="nodeProps" />
      </template>
    </VueFlow>

    
  </div>
</template>
<style scoped>

</style>
