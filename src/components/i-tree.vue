<template>
  <div class="i-tree-container">
    <div class="i-node-name" :style="{ 'margin-left': nodeData.level * 30 + 'px' }">{{ nodeData.name }}</div>
    <div v-if="nodeData.children">
      <i-tree v-for="(item, index) in nodeData.children" :key="index" :nodeData="item"></i-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'i-tree',
  props: {
    nodeData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
