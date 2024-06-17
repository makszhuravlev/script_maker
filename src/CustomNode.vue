<script setup>
import { Handle, Position } from '@vue-flow/core'
import { ref } from 'vue'

const counter = ref(0)
</script>

<template>
  <div class="custom-node">
    <div>{{ data.label }}</div>
    <Handle id="a" type="source" :position="Position.Top" />  
    <Handle id="b" type="source" :position="Position.Bottom" />  
  </div>
  
</template>

<script>
export default {
  name: 'CustomNode',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>

</style>
