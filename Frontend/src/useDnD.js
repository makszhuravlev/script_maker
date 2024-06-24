import { useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'
import { useRoute } from "vue-router";
import axios from 'axios';

let id = 0
const message = ref('')


function getId() {
  return id++
}
const state = {
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
}
const ip = '88.84.211.248';
const port = '5000';

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  const route = useRoute();
  const IdScript = route.params.id;
  console.log(IdScript)
  axios.get('http://' + ip + ':' + port + '/getall') .then(response => { 
    for (var key in response.data) {
     if(response.data[key].id == IdScript){
      for (var item in JSON.parse(response.data[key].json).nodes)
       console.log(JSON.parse(response.data[key].json).nodes[item].id)
       id = JSON.parse(response.data[key].json).nodes[item].id 
     }
    }
   })
  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event, type) {
    console.log(event)
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedType.value = type
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }
  function onDragOver(event) {
    event.preventDefault()

    if (draggedType.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  function onDragLeave() {
    isDragOver.value = false
  }

  function onDragEnd() {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  function onDrop(event) {
    
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })

    const nodeId = getId()
    console.log(draggedType.value)

    if(draggedType.value === 'default'){
      message.value = "Фраза клиента"
    }
    else{
      message.value = "Фраза менеджера"
    }
    
    const newNode = {
      id: nodeId,
      type: draggedType.value,
      position,
      data: { label:  message.value , description: "", dynamicFields: ""},
    }
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 },
      }))

      off()
    })

    addNodes(newNode)
  }

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}
