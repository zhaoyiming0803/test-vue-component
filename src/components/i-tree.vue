<template>
  <div class="i-tree-container">
    <div class="i-node-name" :style="{ 'margin-left': nodeData.level * 30 + 'px' }">
      <IInput :value="nodeData.name" @change="onChangeNodeName"></IInput>
    </div>
    <div v-if="nodeData.children">
      <i-tree v-for="(item, index) in nodeData.children" :key="index" :nodeData="item"></i-tree>
    </div>
  </div>
</template>

<script>
import IInput from './i-input.vue'
export default {
  name: 'i-tree',
  components: {
    IInput
  },
  props: {
    nodeData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    onChangeNodeName (value) {
      this.nodeData.name = value
    }
  }
}
</script>
