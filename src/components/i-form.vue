<template>
  <div class="i-form-container">
    <slot></slot>
    <IInput></IInput>
    <IInput></IInput>
  </div>
</template>

<script>
import IInput from './i-input.vue'

import EventEmitter from '../mixins/EventEmitter.js'
import searchComponent from '../mixins/searchComponent.js'

export default {
  name: 'i-form',
  mixins: [EventEmitter, searchComponent],
  components: {
    IInput
  },
  data () {
    return {
      fields: []
    }
  },
  created () {
    this.$on('on-form-item-add', ctx => {
      this.fields.push(ctx)
    })
  },
  mounted () {
    this.broadcast('i-input', 'on-form-message', this)
    console.log('i-form: ', this)
    console.log('findComponentDownWard: ', this.findComponentDownWard('i-input'))
    console.log('findComponentsDownWard: ', this.findComponentsDownWard('i-input'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
