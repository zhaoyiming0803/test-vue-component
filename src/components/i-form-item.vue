<template>
  <div class="i-form-item-container">
    <slot></slot>
  </div>
</template>

<script>
import EventEmitter from '../mixins//EventEmitter.js'

export default {
  name: 'i-form-item',
  mixins: [EventEmitter],
  mounted () {
    this.dispatch('i-form', 'on-form-item-add', this)
  }
}
</script>
