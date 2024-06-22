import { useVueFlow } from '@vue-flow/core'
import { ref, watch } from 'vue'
import { useRoute } from "vue-router";
import axios from 'axios';

let id = 0
const message = ref('')
/**
 * @returns {string} - A unique id.
 */
function getId() {
  return id++
}

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 * @type {{draggedType: Ref<string|null>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state = {
  /**
   * The type of the node being dragged.
   */
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
}

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  const route = useRoute();
  const IdScript = route.params.id;
  console.log(IdScript)
  axios.get('http://88.84.211.248:5000/getall') .then(response => { 
    for (var key in response.data) {
     //console.log(key, IdScript, response.data[key].id)
     if(response.data[key].id == IdScript){
      for (var item in JSON.parse(response.data[key].json).nodes)
       console.log(JSON.parse(response.data[key].json).nodes[item].id)
       id = JSON.parse(response.data[key].json).nodes[item].id + 1
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

  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
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

  /**
   * Handles the drop event.
   * @param {DragEvent} event
   */
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
    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
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