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

const ip = '83.217.215.171';
const port = '5000';

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state
  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()
  const route = useRoute();
  const IdScript = route.params.id;

  // Встраивание функции initializeNodeIdFromServer
  axios.get(`http://${ip}:${port}/getall`).then(response => {
    const data = response.data; // Локальная переменная
    for (const key in data) {
      if (data[key].id == IdScript) {
        const nodes = JSON.parse(data[key].json).nodes; // Локальная переменная
        for (const item in nodes) {
          id = nodes[item].id
        }
      }
    }
  });

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event, type) {
    const dataTransfer = event.dataTransfer; //Локальная переменная
    if (dataTransfer) {
      dataTransfer.setData('application/vueflow', type)
      dataTransfer.effectAllowed = 'move'
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
  //----------------------
  function onDrop(event) {
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })

    const nodeId = getId()

    // Встраивание функции getMessageForDraggedType
    const messageValue = draggedType.value === 'default' ? "Фраза клиента" : "Фраза менеджера"

    // Встраивание функции createNode
    const newNode = {
      id: nodeId,
      type: draggedType.value,
      position,
      data: { label: messageValue, description: "", dynamicFields: "" },
    }

    // Встраивание функции addNodeWithInitialization
    const { off } = onNodesInitialized(() => {
      const position = { // Локальная переменная
        x: newNode.position.x - newNode.dimensions.width / 2,
        y: newNode.position.y - newNode.dimensions.height / 2,
      };
      updateNode(nodeId, (node) => ({
        position,
      }));
      off();
    });
    addNodes(newNode);
  }
  //----------------------

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
